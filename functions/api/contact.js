/**
 * Cloudflare Pages Function — Contact Form Handler
 * Accepts POST from contact form and manpower quote form
 * Sends email via MailChannels API (free for Cloudflare)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

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

    // Rate limiting check (basic IP-based)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    let emailSubject, emailBody;

    if (type === 'manpower') {
      // Manpower quote form
      const name = formData.get('mq_name') || '';
      const email = formData.get('mq_email') || '';
      const workers = formData.get('mq_employees') || '';
      const duration = formData.get('mq_permanent') === 'on' ? 'Permanent' : (formData.get('mq_duration') || '') + ' months';
      const professions = formData.getAll('mq_profession').join(', ') || 'Not specified';
      const food = formData.get('mq_food') === 'on' ? 'Yes' : 'No';
      const accommodation = formData.get('mq_accommodation') === 'on' ? 'Yes' : 'No';
      const transport = formData.get('mq_transport') === 'on' ? 'Yes' : 'No';
      const budget = formData.get('mq_budget') || '';
      const nationality = formData.get('mq_nationality') || 'Not specified';
      const startDate = formData.get('mq_start_date') || 'Not specified';

      if (!name || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Name and email are required' }), {
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
      // Contact form
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const service = formData.get('service') || 'Not specified';
      const message = formData.get('message') || '';

      if (!name || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Name and email are required' }), {
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

    // Send email via MailChannels
    const emailResult = await sendEmail({
      to: env.CONTACT_EMAIL || 'info@mscarabia.com',
      from: env.FROM_EMAIL || 'noreply@mscarabia.com',
      subject: emailSubject,
      body: emailBody,
      replyTo: formData.get('email') || formData.get('mq_email') || '',
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

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Send email via MailChannels API
 */
async function sendEmail({ to, from, subject, body, replyTo }) {
  try {
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            ...(replyTo ? { reply_to: { email: replyTo } } : {}),
          },
        ],
        from: { email: from, name: 'MSC Arabia Website' },
        subject: subject,
        content: [
          {
            type: 'text/plain',
            value: body,
          },
        ],
      }),
    });

    if (response.ok || response.status === 202) {
      return { success: true };
    } else {
      const text = await response.text();
      return { success: false, error: `MailChannels ${response.status}: ${text}` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
