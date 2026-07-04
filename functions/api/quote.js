/**
 * Cloudflare Pages Function — Manpower Quote Lead Capture
 * POST /api/quote — captures calculator email + params, sends via Resend
 * Additive; does not touch existing /api/contact endpoint
 */

const ALLOWED_ORIGIN = 'https://mscarabia.com';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n]/g, ' ').trim().substring(0, 200);
}

function isValidEmail(str) {
  return typeof str === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) && str.length <= 120;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Origin check
  const origin = request.headers.get('Origin');
  if (origin !== ALLOWED_ORIGIN) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }

  try {
    const body = await request.json();
    const { email, workers, duration, profession, total } = body;

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const w = Math.max(1, Math.min(10000, parseInt(workers, 10) || 1));
    const prof = sanitize(profession);
    const dur = sanitize(duration);
    const tot = sanitize(total);

    // Send via Resend (same provider as /api/contact)
    const RESEND_API_KEY = env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'MSC Arabia Calculator <noreply@mscarabia.com>',
        to: [env.LEAD_INBOX || 'info@mscarabia.com'],
        reply_to: email,
        subject: `Quote Request — ${w} ${prof || 'workers'} × ${tot}`,
        text: [
          `New manpower quote request from the website calculator.`,
          ``,
          `Email: ${email}`,
          `Workers: ${w}`,
          `Profession: ${prof || 'Not specified'}`,
          `Duration: ${dur || 'Not specified'}`,
          `Estimated monthly total: ${tot}`,
          ``,
          `This lead was captured from the calculator on mscarabia.com.`,
        ].join('\n'),
      }),
    });

    if (!sendRes.ok) {
      const status = sendRes.status;
      console.error('Quote email failed:', status);
      return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}
