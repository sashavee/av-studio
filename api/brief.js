// Request form on the main page → a plain-text email to hello@avstudio.agency via Zoho SMTP.
// The Zoho app password lives only in the Vercel env var ZOHO_SMTP_PASS.
const nodemailer = require('nodemailer');

const USER = 'hello@avstudio.agency';
const clip = (v, n) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const origin = req.headers.origin || '';
  if (origin && !/^https:\/\/(www\.)?avstudio\.agency$|^http:\/\/localhost(:\d+)?$/.test(origin)) return res.status(403).json({ ok: false });

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (b.website) return res.status(200).json({ ok: true });   // honeypot: bots fill every field
  const f = { need: clip(b.need, 120), name: clip(b.name, 80), phone: clip(b.phone, 30), biz: clip(b.biz, 200), link: clip(b.link, 200), lang: clip(b.lang, 2) };
  if (!f.name || (f.phone.match(/\d/g) || []).length < 6) return res.status(400).json({ ok: false });
  if (!process.env.ZOHO_SMTP_PASS) return res.status(500).json({ ok: false });

  const text = [
    `Имя: ${f.name}`,
    `Телефон: ${f.phone}`,
    `Нужно: ${f.need || '—'}`,
    `Бизнес: ${f.biz || '—'}`,
    `Сайт / Instagram: ${f.link || '—'}`,
    `Язык сайта: ${f.lang || '—'}`,
  ].join('\n');

  try {
    const smtp = nodemailer.createTransport({ host: 'smtp.zoho.eu', port: 465, secure: true, auth: { user: USER, pass: process.env.ZOHO_SMTP_PASS } });
    await smtp.sendMail({ from: `AV Studio сайт <${USER}>`, to: USER, subject: `Заявка с сайта: ${f.name}`, text: text + '\n' });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('brief mail failed', e && e.message);
    res.status(502).json({ ok: false });
  }
};
