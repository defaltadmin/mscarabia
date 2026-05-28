/**
 * Cloudflare Pages Function — Contact Form Handler
 * Accepts POST from contact form and manpower quote form
 * Sends email via MailChannels API (free for Cloudflare)
 */

const ALLOWED_ORIGIN = 'https://mscarabia.com';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n]/g, ' ').trim().substring(0, 2000);
}

function isValidEmail(str) {
  if (typeof str !== 'string' || !str) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestPost(context) {
  const { request, env } = context;

  // Check origin
  const origin = request.headers.get('Origin');
  if (origin && origin !== ALLOWED_ORIGIN) {
    return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const formData = await request.formData();
    const type = formData.get('type') || 'contact';

    // Honeypot check
    const honeypot = formData.get('website');
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Basic rate limiting via KV (if available)
    if (env.RATE_LIMIT_KV) {
      const key = `rl:${clientIP}`;
      const count = await env.RATE_LIMIT_KV.get(key);
      if (count && parseInt(count) >= 5) {
        return new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      await env.RATE_LIMIT_KV.put(key, String((parseInt(count) || 0) + 1), { expirationTtl: 3600 });
    }

    let emailSubject, emailBody;

    if (type === 'manpower') {
      const name = sanitize(formData.get('mq_name'));
      const email = sanitize(formData.get('mq_email'));
      const workers = sanitize(formData.get('mq_employees'));
      const duration = formData.get('mq_permanent') === 'on' ? 'Permanent' : sanitize(formData.get('mq_duration')) + ' months';
      const professions = formData.getAll('mq_profession').map(sanitize).join(', ') || 'Not specified';
      const food = formData.get('mq_food') === 'on' ? 'Yes' : 'No';
      const accommodation = formData.get('mq_accommodation') === 'on' ? 'Yes' : 'No';
      const transport = formData.get('mq_transport') === 'on' ? 'Yes' : 'No';
      const budget = sanitize(formData.get('mq_budget'));
      const nationality = sanitize(formData.get('mq_nationality')) || 'Not specified';
      const startDate = sanitize(formData.get('mq_start_date')) || 'Not specified';

      if (!name || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Name and email are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      emailSubject = `Manpower Quote Request - ${workers} workers from ${name}`;
      emailBody = [
        `=== MANPOWER QUOTE REQUEST ===`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Number of Workers: ${workers}`,
        `Contract Duration: ${duration}`,
        `Professions: ${professions}`,
        `Food Included: ${food}`,
        `Accommodation Included: ${accommodation}`,
        `Transport Included: ${transport}`,
        `Budget per Person/Month: SAR ${budget}`,
        `Preferred Nationality: ${nationality}`,
        `Desired Start Date: ${startDate}`,
        ``,
        `---`,
        `Submitted via mscarabia.com`,
        `IP: ${clientIP}`,
        `Time: ${new Date().toISOString()}`,
      ].join('\n');
    } else {
      const name = sanitize(formData.get('name'));
      const email = sanitize(formData.get('email'));
      const service = sanitize(formData.get('service')) || 'Not specified';
      const message = sanitize(formData.get('message'));

      if (!name || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Name and email are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      emailSubject = `Contact from ${name} - ${service}`;
      emailBody = [
        `=== CONTACT FORM SUBMISSION ===`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Service Interest: ${service}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Submitted via mscarabia.com`,
        `IP: ${clientIP}`,
        `Time: ${new Date().toISOString()}`,
      ].join('\n');
    }

    const emailResult = await sendEmail({
      to: env.CONTACT_EMAIL || 'info@mscarabia.com',
      from: env.FROM_EMAIL || 'noreply@mscarabia.com',
      subject: emailSubject,
      body: emailBody,
      replyTo: sanitize(formData.get('email') || formData.get('mq_email')),
    });

    if (emailResult.success) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      throw new Error(emailResult.error || 'Failed to send email');
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

async function sendEmail({ to, from, subject, body, replyTo }) {
  try {
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }], ...(replyTo ? { reply_to: { email: replyTo } } : {}) }],
        from: { email: from, name: 'MSC Arabia Website' },
        subject: subject,
        content: [{ type: 'text/plain', value: body }],
      }),
    });
    if (response.ok || response.status === 202) return { success: true };
    const text = await response.text();
    return { success: false, error: `MailChannels ${response.status}: ${text}` };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
