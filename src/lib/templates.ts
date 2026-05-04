export interface EmailTemplate {
  id: string;
  title: string;
  category: string;
  html: string;
}

const LOGO_URL = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg";

export const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    title: 'Welcome Email',
    category: 'Onboarding',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #1F1C17; padding: 30px; text-align: center; color: #CCB94D; }
    .logo { width: 60px; height: 60px; border-radius: 6%; margin-bottom: 15px; }
    .content { padding: 40px; color: #333333; line-height: 1.6; }
    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999999; }
    .button { display: inline-block; padding: 12px 24px; background-color: #CCB94D; color: #1F1C17; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="SMIC360" class="logo">
      <h1>Welcome to SMIC360 Ltd</h1>
    </div>
    <div class="content">
      <h2>Hello there!</h2>
      <p>We're thrilled to have you join SMIC360 Ltd. You're now part of an exclusive group dedicated to excellence in communication.</p>
      <p>Explore your dashboard to see what we've prepared for you.</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      &copy; 2024 SMIC360 Ltd. All rights reserved.
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'product-update',
    title: 'Product Update',
    category: 'Product',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 0; background: #fafafa; }
    .card { max-width: 550px; margin: 20px auto; background: white; border: 1px solid #eee; }
    .header-img { background: #1F1C17; height: 120px; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .logo { width: 80px; height: 80px; border-radius: 6%; border: 2px solid #CCB94D; }
    .body-text { padding: 30px; }
    .tag { background: #E87E46; color: white; padding: 4px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header-img">
      <img src="${LOGO_URL}" alt="SMIC360" class="logo">
    </div>
    <div class="body-text">
      <span class="tag">NEW UPDATE</span>
      <h1 style="margin-top: 15px;">SMIC360 Ltd Version 2.0</h1>
      <p>We've completely redesigned the interface to bring you a more fluid and intuitive experience. Check out the new dark mode features and enhanced collaboration tools.</p>
      <p>Our team at SMIC360 Ltd has worked tirelessly to improve performance across the board.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 14px; color: #666;">View the full release notes on our blog.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'invoice',
    title: 'Invoice Receipt',
    category: 'Billing',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; font-size: 16px; line-height: 24px; font-family: 'Helvetica', 'Arial', sans-serif; color: #555; }
    .invoice-box table { width: 100%; line-height: inherit; text-align: left; }
    .invoice-box table td { padding: 5px; vertical-align: top; }
    .invoice-box table tr.top table td { padding-bottom: 20px; }
    .logo { width: 50px; height: 50px; border-radius: 6%; vertical-align: middle; margin-right: 10px; }
    .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; }
    .invoice-box table tr.item td { border-bottom: 1px solid #eee; }
    .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }
  </style>
</head>
<body>
  <div class="invoice-box">
    <table cellpadding="0" cellspacing="0">
      <tr class="top">
        <td colspan="2">
          <table>
            <tr>
              <td class="title" style="font-size: 35px; color: #1F1C17; font-weight: bold;">
                <img src="${LOGO_URL}" alt="Logo" class="logo">
                SMIC360
              </td>
              <td style="text-align: right;">Invoice #: 123<br>Created: May 20, 2024</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr class="heading">
        <td>Item</td>
        <td>Price</td>
      </tr>
      <tr class="item">
        <td>Premium Monthly Subscription</td>
        <td>$49.00</td>
      </tr>
      <tr class="total">
        <td></td>
        <td>Total: $49.00</td>
      </tr>
    </table>
    <div style="margin-top: 40px; text-align: center; color: #999; font-size: 12px;">
      SMIC360 Ltd, Professional Solutions
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'password-reset',
    title: 'Password Reset',
    category: 'Security',
    html: `<!DOCTYPE html>
<html>
<body style="background: #f0f0f0; padding: 50px; font-family: Arial, sans-serif;">
  <div style="background: #fff; padding: 30px; max-width: 400px; margin: auto; border-radius: 10px; text-align: center;">
    <img src="${LOGO_URL}" alt="SMIC360" style="width: 60px; height: 60px; border-radius: 6%; margin-bottom: 20px;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p style="color: #666;">We received a request to reset your SMIC360 Ltd password. If you didn't make this request, just ignore this email.</p>
    <a href="#" style="background: #E87E46; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Reset Password</a>
    <p style="font-size: 12px; color: #aaa; margin-top: 30px;">Button not working? Copy this link: https://smic360.app/reset/token123</p>
  </div>
</body>
</html>`
  },
  {
    id: 'newsletter',
    title: 'Weekly Newsletter',
    category: 'Marketing',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    .news-card { border: 1px solid #ddd; padding: 20px; font-family: Georgia, serif; }
    .header { font-size: 32px; border-bottom: 3px double #333; padding-bottom: 10px; text-align: center; }
    .logo { width: 40px; height: 40px; border-radius: 6%; vertical-align: middle; margin-bottom: 10px; }
    .article { margin: 20px 0; }
    .article-title { font-weight: bold; font-size: 20px; }
  </style>
</head>
<body>
  <div class="news-card">
    <div class="header">
      <img src="${LOGO_URL}" alt="SMIC360" class="logo"><br>
      SMIC360 INSIGHTS
    </div>
    <div class="article">
      <div class="article-title">Why Minimalist Design is the Future</div>
      <p>Experts at SMIC360 Ltd suggest that reducing visual clutter is key to increasing user engagement in 2024...</p>
    </div>
    <div class="article">
      <div class="article-title">The Art of the Email Subject Line</div>
      <p>How a few words can determine the success of your entire campaign...</p>
    </div>
    <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; color: #777; font-size: 11px;">
      &copy; 2024 SMIC360 Ltd. All rights reserved.
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'the-palm',
    title: 'The Palm 🌴',
    category: 'Real Estate',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>The Palm 🌴 — Your Private Sanctuary in Accra is Waiting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
  <style>
    /* ── RESET ─────────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; }
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #050505; }
    .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

    /* ── OUTER WRAPPER — Adinkra textile bg ─────────────────────── */
    .outer {
      background-color: #050505;
      background-image: url('https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_600/Adinkra-Symbols-and-Meaning_bnfhdd.png');
      background-repeat: repeat;
      background-size: 520px auto;
      background-attachment: fixed;
      padding: 40px 16px 60px;
    }

    /* ── EMAIL CARD ──────────────────────────────────────────────── */
    .card {
      width: 100%;
      max-width: 800px !important;
      margin: 0 auto;
      background-color: #0C0C0C;
      border: 1px solid rgba(201,150,58,0.18);
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(201,150,58,0.06),
        0 40px 120px rgba(0,0,0,0.9),
        0 0 60px rgba(201,150,58,0.04);
    }

    /* ── FONTS ───────────────────────────────────────────────────── */
    .f-serif  { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; }
    .f-sans   { font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif; }

    /* ── TOP TICKER ──────────────────────────────────────────────── */
    .ticker {
      background: linear-gradient(90deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      background-color: #C9963A; /* Fallback for Outlook */
      padding: 9px 32px;
      text-align: center;
    }
    .ticker p {
      margin: 0;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #080808;
    }

    /* ── HERO ────────────────────────────────────────────────────── */
    .hero-wrap { position: relative; overflow: hidden; }
    .hero-img  { width: 100%; max-height: 560px; object-fit: cover; display: block; }
    .hero-scrim {
      background: linear-gradient(
        180deg,
        rgba(8,8,8,0.05) 0%,
        rgba(8,8,8,0.35) 40%,
        rgba(8,8,8,0.82) 75%,
        rgba(8,8,8,1.00) 100%
      );
      padding: 40px 48px 52px;
      text-align: center;
      position: relative;
    }

    .pre-headline {
      display: inline-block;
      border: 1px solid rgba(201,150,58,0.45);
      background: rgba(201,150,58,0.06);
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9963A;
      padding: 7px 20px;
      margin-bottom: 22px;
    }

    .hero-h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 58px;
      font-weight: 300;
      line-height: 1.06;
      color: #F5F0E8;
      margin: 0 0 10px;
      letter-spacing: -0.5px;
    }
    .hero-h1 em {
      font-style: italic;
      color: #C9963A;
      background: linear-gradient(135deg, #C9963A 0%, #F5E6C8 50%, #C9963A 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-sub {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.75;
      color: rgba(245,240,232,0.65);
      margin: 0 auto 30px;
      max-width: 520px;
    }

    .btn-gold {
      display: inline-block;
      background: linear-gradient(135deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      background-size: 200% auto;
      color: #080808;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      padding: 15px 44px;
      text-decoration: none;
      border: none;
    }

    .btn-ghost {
      display: inline-block;
      background: transparent;
      color: #C9963A;
      border: 1px solid rgba(201,150,58,0.45);
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 13px 36px;
      text-decoration: none;
    }

    /* ── SECTION SHELL ───────────────────────────────────────────── */
    .sec        { padding: 52px 48px; }
    .sec-alt    { padding: 52px 48px; background: #0f0f0f; }
    .sec-dark   { padding: 52px 48px; background: #111111; }
    .sec-border { border-top: 1px solid rgba(201,150,58,0.10); }

    /* ── LABEL / DIVIDER ─────────────────────────────────────────── */
    .label {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9963A;
      margin: 0 0 10px;
    }
    .divider-gold {
      width: 44px;
      height: 1px;
      background: linear-gradient(90deg, #C9963A, rgba(201,150,58,0.15));
      margin: 0 0 22px;
    }
    .divider-center {
      margin: 0 auto 22px;
      background: linear-gradient(90deg, rgba(201,150,58,0.15), #C9963A, rgba(201,150,58,0.15));
    }

    /* ── HEADINGS ────────────────────────────────────────────────── */
    .h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 40px;
      font-weight: 300;
      line-height: 1.12;
      color: #F5F0E8;
      margin: 0 0 18px;
    }
    .h2 em { font-style: italic; color: #C9963A; }

    .h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24px;
      font-weight: 400;
      color: #F5F0E8;
      margin: 0 0 10px;
      line-height: 1.25;
    }

    /* ── BODY TEXT ───────────────────────────────────────────────── */
    .body {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.82;
      color: #888888;
      margin: 0 0 16px;
    }
    .body strong { color: #F5F0E8; font-weight: 500; }
    .body a { color: #C9963A; text-decoration: none; }

    /* ── STAT STRIP ──────────────────────────────────────────────── */
    .stat-box {
      text-align: center;
      border: 1px solid rgba(201,150,58,0.14);
      background: rgba(201,150,58,0.03);
      padding: 22px 10px;
    }
    .stat-n {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 38px;
      font-weight: 300;
      color: #C9963A;
      margin: 0 0 4px;
      line-height: 1;
    }
    .stat-l {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #555555;
      margin: 0;
    }

    /* ── PROPERTY CARD ───────────────────────────────────────────── */
    .prop-card {
      border: 1px solid rgba(201,150,58,0.14);
      overflow: hidden;
      background: #111111;
    }
    .prop-img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      display: block;
    }
    .prop-body { padding: 24px 26px; }
    .prop-badge {
      display: inline-block;
      background: #C9963A;
      color: #080808;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      padding: 5px 14px;
      margin-bottom: 12px;
    }
    .prop-price {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 28px;
      font-weight: 300;
      color: #F5F0E8;
    }
    .prop-price span {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 12px;
      font-weight: 300;
      color: #555555;
    }

    /* ── AMENITY CHIPS ───────────────────────────────────────────── */
    .chip {
      display: inline-block;
      border: 1px solid rgba(201,150,58,0.22);
      background: rgba(201,150,58,0.04);
      color: #888888;
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 11px;
      padding: 6px 14px;
      margin: 0 5px 8px 0;
    }

    /* ── QUOTE BLOCK ─────────────────────────────────────────────── */
    .quote {
      border-left: 2px solid #C9963A;
      padding: 18px 24px;
      background: rgba(201,150,58,0.04);
      margin: 20px 0;
    }
    .quote-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-style: italic;
      font-weight: 300;
      line-height: 1.65;
      color: #F5F0E8;
      margin: 0 0 10px;
    }
    .quote-attr {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 11px;
      color: #C9963A;
      font-weight: 500;
      letter-spacing: 0.1em;
      margin: 0;
    }

    /* ── GALLERY GRID ────────────────────────────────────────────── */
    .gal-img {
      width: 100%;
      display: block;
      object-fit: cover;
    }

    /* ── EXPERIENCE CARD ─────────────────────────────────────────── */
    .exp-card {
      border-top: 1px solid rgba(201,150,58,0.12);
      padding: 28px 0;
    }
    .exp-num {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 52px;
      font-weight: 300;
      color: rgba(201,150,58,0.12);
      line-height: 1;
      float: left;
      margin-right: 16px;
      margin-top: -8px;
    }

    /* ── SITE CARDS ──────────────────────────────────────────────── */
    .site-card {
      overflow: hidden;
      border: 1px solid rgba(201,150,58,0.12);
      background: #111111;
    }
    .site-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }
    .site-body { padding: 18px 20px 20px; }
    .site-tag {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #C9963A;
      margin: 0 0 6px;
    }
    .site-name {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 18px;
      font-weight: 400;
      color: #F5F0E8;
      margin: 0 0 8px;
    }
    .site-desc {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.7;
      color: #666666;
      margin: 0;
    }

    /* ── CTA STRIP ───────────────────────────────────────────────── */
    .cta-strip {
      background:
        linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.80) 100%),
        url('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775296671/5_yc05lt.jpg') center/cover no-repeat;
      padding: 60px 48px;
      text-align: center;
      border-top: 1px solid rgba(201,150,58,0.15);
      border-bottom: 1px solid rgba(201,150,58,0.15);
    }

    /* ── BLOG CARD ───────────────────────────────────────────────── */
    .blog-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
      border-bottom: 1px solid rgba(201,150,58,0.1);
    }
    .blog-body { padding: 18px 20px 22px; background: #111111; border: 1px solid rgba(201,150,58,0.1); border-top: 0; }
    .blog-cat {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #C9963A;
      margin: 0 0 8px;
    }
    .blog-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 17px;
      font-weight: 400;
      color: #F5F0E8;
      line-height: 1.35;
      margin: 0 0 10px;
    }
    .blog-excerpt {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.7;
      color: #555555;
      margin: 0 0 14px;
    }
    .blog-link {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #C9963A;
      text-decoration: none;
    }

    /* ── FOOTER ──────────────────────────────────────────────────── */
    .footer { background: #080808; padding: 44px 48px; text-align: center; border-top: 1px solid rgba(201,150,58,0.12); }
    .footer-logo {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 32px;
      font-weight: 300;
      color: #C9963A;
      margin: 0 0 2px;
    }
    .footer-sub {
      font-family: 'DM Sans', Arial, sans-serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #555555;
      margin: 0 0 28px;
    }

    /* ── SEPARATOR ───────────────────────────────────────────────── */
    .hr { height: 1px; background: rgba(201,150,58,0.10); margin: 0; }

    /* ── RESPONSIVE ──────────────────────────────────────────────── */
    @media only screen and (max-width: 640px) {
      .outer { padding: 0 !important; }
      .sec, .sec-alt, .sec-dark, .cta-strip { padding: 36px 24px !important; }
      .hero-scrim { padding: 0 24px 40px !important; margin-top: -160px !important; }
      .hero-h1 { font-size: 36px !important; }
      .h2 { font-size: 30px !important; }
      .col-half { display: block !important; width: 100% !important; padding: 0 !important; margin-bottom: 16px !important; }
      .col-third { display: block !important; width: 100% !important; padding: 0 !important; margin-bottom: 16px !important; }
      .stat-n { font-size: 28px !important; }
      .prop-img, .apt-img { height: 200px !important; }
    }

  </style>
</head>
<body>

<table width="100%" border="0" cellpadding="0" cellspacing="0" class="outer">
  <tr>
    <td align="center">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" class="card" style="max-width:800px;">
        <tr>
          <td>

<!-- ══════════════════════════════════════════════════
     TICKER
══════════════════════════════════════════════════ -->
<div class="ticker">
  <p>Milehigh5280 &nbsp;✦&nbsp; Ayi Mensah, Accra &nbsp;✦&nbsp; Est. 2021 &nbsp;✦&nbsp; Your Private Sanctuary in Ghana</p>
</div>

<!-- ══════════════════════════════════════════════════
     HERO
══════════════════════════════════════════════════ -->
<div class="hero-wrap">
  <img
    class="hero-img"
    src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/ERR_jjr2hx.jpg"
    alt="Milehigh5280 — Ayi Mensah, Accra"
    width="800" border="0" style="width:100%; max-width:800px; height:auto;"
  />
  <div class="hero-scrim">
    <div class="pre-headline">April 2026 &nbsp;·&nbsp; Accra, Ghana</div>
    <h1 class="hero-h1" style="margin:0;">There is a place in Accra where the world <em>slows down</em></h1>
    <p class="hero-sub">
      A private luxury apartment in the lush hills of Ayi Mensah —<br>
      where you sleep well, live well, and feel genuinely at home.
    </p>
    <a href="https://milehigh5280airbnb.com/properties/the-palm-ayi-mensah" class="btn-gold" style="margin-right:12px;">Reserve Your Stay</a>
    <a href="https://wa.me/17207059849?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20Milehigh5280" class="btn-ghost">WhatsApp Us</a>
  </div>
</div>

<!-- ══════════════════════════════════════════════════
     OPENING PULL QUOTE
══════════════════════════════════════════════════ -->
<div class="sec" style="text-align:center;padding-bottom:44px;padding-top:44px;">
  <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-style:italic;font-weight:300;color:#F5F0E8;line-height:1.55;margin:0 auto 18px;max-width:580px;">
    "The kind of apartment you stop calling a rental<br>and start calling <span style="color:#C9963A;">home</span>."
  </p>
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#555555;margin:0;">
    Diana O. &nbsp;·&nbsp; United Kingdom &nbsp;·&nbsp; 7-night stay
  </p>
</div>

<div class="hr"></div>

<!-- ══════════════════════════════════════════════════
     PROPERTY SHOWCASE
══════════════════════════════════════════════════ -->
<div class="sec-dark sec-border">
  <p class="label">The Apartment</p>
  <div class="divider-gold"></div>
  <h2 class="h2">Milehigh5280 <em>🌴</em></h2>
  <p class="body" style="margin-bottom:28px;max-width:540px;">
    Every room designed for rest. Every detail chosen for comfort. Nestled inside the quiet green hills of Ayi Mensah — 30 minutes from Accra's heart, a world away from its noise.
  </p>

  <!-- Main gallery: hero image -->
  <img
    src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/5_yc05lt.jpg"
    alt="Living Room"
    style="width:100%;height:340px;object-fit:cover;display:block;border:1px solid rgba(201,150,58,0.12);"
  />

  <!-- Sub-gallery: 3 images -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:3px; table-layout: fixed;">
    <tr>
      <td width="33%" style="padding-right:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_300/1_ijqfai.jpg" alt="Master Bedroom" class="gal-img" style="height:180px;object-fit:cover;" />
      </td>
      <td width="34%" style="padding:0 1px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_300/2_xvzt1y.jpg" alt="Second Bedroom" class="gal-img" style="height:180px;object-fit:cover;" />
      </td>
      <td width="33%" style="padding-left:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_300/3_wgur1l.jpg" alt="Dining Area" class="gal-img" style="height:180px;object-fit:cover;" />
      </td>
    </tr>
  </table>

  <!-- Second sub-gallery -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:3px;">
    <tr>
      <td width="50%" style="padding-right:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_400/4_xgzoyo.jpg" alt="Bathroom" class="gal-img" style="height:200px;object-fit:cover;" />
      </td>
      <td width="50%" style="padding-left:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_400/6_ffo1ly.jpg" alt="Lounge" class="gal-img" style="height:200px;object-fit:cover;" />
      </td>
    </tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:3px;">
    <tr>
      <td width="50%" style="padding-right:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_400/7_wv1u9h.jpg" alt="Exterior" class="gal-img" style="height:200px;object-fit:cover;" />
      </td>
      <td width="50%" style="padding-left:2px;">
        <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_400/A_2_kwg4sf.jpg" alt="Interior Detail" class="gal-img" style="height:200px;object-fit:cover;" />
      </td>
    </tr>
  </table>

  <!-- Amenity chips -->
  <div style="margin-top:26px;">
    <span class="chip">📶 Fibre WiFi</span>
    <span class="chip">❄️ Air Con</span>
    <span class="chip">📺 Smart TV</span>
    <span class="chip">🍳 Full Kitchen</span>
    <span class="chip">🚗 Parking</span>
    <span class="chip">⚡ Generator</span>
    <span class="chip">🛡️ 24/7 Security</span>
    <span class="chip">🌿 Garden</span>
    <span class="chip">🔑 Self Check-in</span>
    <span class="chip">💬 Host on Call</span>
  </div>

  <!-- Price + CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;border-top:1px solid rgba(201,150,58,0.14);padding-top:28px;">
    <tr>
      <td style="vertical-align:middle;">
        <p class="prop-price">from $50 <span>/ night &nbsp;·&nbsp; min 1 night</span></p>
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#555555;margin:4px 0 0;letter-spacing:0.1em;">⭐ 4.92 · 38 five-star reviews</p>
      </td>
      <td style="vertical-align:middle;text-align:right;">
        <a href="https://milehigh5280airbnb.com/properties/the-palm-ayi-mensah" class="btn-gold">Book Now</a>
      </td>
    </tr>
  </table>
</div>

<!-- ══════════════════════════════════════════════════
     STAT STRIP
══════════════════════════════════════════════════ -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;border-top:1px solid rgba(201,150,58,0.12);border-bottom:1px solid rgba(201,150,58,0.12);">
  <tr>
    <td class="col-half" width="25%" style="padding:30px 0;border-right:1px solid rgba(201,150,58,0.10);">
      <div class="stat-box" style="border:none;background:none;">
        <p class="stat-n">4.92</p>
        <p class="stat-l">Guest Rating</p>
      </div>
    </td>
    <td class="col-half" width="25%" style="padding:30px 0;border-right:1px solid rgba(201,150,58,0.10);">
      <div class="stat-box" style="border:none;background:none;">
        <p class="stat-n">38+</p>
        <p class="stat-l">5★ Reviews</p>
      </div>
    </td>
    <td class="col-half" width="25%" style="padding:30px 0;border-right:1px solid rgba(201,150,58,0.10);">
      <div class="stat-box" style="border:none;background:none;">
        <p class="stat-n">$50</p>
        <p class="stat-l">from / night</p>
      </div>
    </td>
    <td class="col-half" width="25%" style="padding:30px 0;">
      <div class="stat-box" style="border:none;background:none;">
        <p class="stat-n">24/7</p>
        <p class="stat-l">Host Support</p>
      </div>
    </td>
  </tr>
</table>

<!-- ══════════════════════════════════════════════════
     WHY AYI MENSAH
══════════════════════════════════════════════════ -->
<div class="sec sec-border">
  <p class="label">The Neighbourhood</p>
  <div class="divider-gold"></div>
  <h2 class="h2">Ayi Mensah —<br>the <em>neighbourhood</em><br>that surprises everyone</h2>

  <img
    src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/1_qwgwqd.png"
    alt="Ayi Mensah Hills — Greater Accra"
    style="width:100%;height:300px;object-fit:cover;display:block;border:1px solid rgba(201,150,58,0.12);margin-bottom:28px;"
  />

 
  <p class="body">
    This is where our guests stop thinking about leaving. Where the digital nomad extends their 2-week trip to two months. Where the diaspora visitor finally feels at peace being back on Ghanaian soil.
  </p>

  <div class="quote">
    <p class="quote-text">"Milehigh5280 exceeded every expectation. Immaculate, modern, and so peaceful. I woke up to birds every morning — genuinely didn't want to leave."</p>
    <p class="quote-attr">— Kwame A. &nbsp;·&nbsp; Accra, Ghana &nbsp;·&nbsp; 5-night stay</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════
     GHANA — LANDMARKS & PLACES
══════════════════════════════════════════════════ -->
<div class="sec-alt sec-border">
  <p class="label">Beyond the Apartment</p>
  <div class="divider-gold"></div>
  <h2 class="h2">Ghana is waiting<br>to <em>astonish</em> you</h2>
  <p class="body" style="margin-bottom:36px;max-width:500px;">
    Culture, history, ocean, forest, music. Our guests discover that Ghana consistently delivers more than they expected. Here's some of what awaits.
  </p>

  <!-- Row 1: 3 site cards -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="col-third" width="32%" style="padding-right:8px;vertical-align:top;">
        <div class="site-card">
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775657596/cape_q5bziu.jpg" alt="Cape Coast Castle" class="site-img" />
          <div class="site-body">
            <p class="site-tag">Cape Coast · Heritage</p>
            <p class="site-name">Cape Coast Castle</p>
            <p class="site-desc">UNESCO World Heritage. The Door of No Return. Africa's most emotionally powerful site — and only 2 hours from Ayi Mensah.</p>
          </div>
        </div>
      </td>
      <td class="col-third" width="36%" style="padding:0 4px;vertical-align:top;">
        <div class="site-card">
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775657729/jj_vuxkc9.jpg" alt="Kumasi Market" class="site-img" />
          <div class="site-body">
            <p class="site-tag">Kumasi · Ashanti Region</p>
            <p class="site-name">Kejetia &amp; Manhyia Palace</p>
            <p class="site-desc">West Africa's largest open-air market. The seat of the Asantehene. Kente cloth, raw gold, and royal history in a single city.</p>
          </div>
        </div>
      </td>
      <td class="col-third" width="32%" style="padding-left:8px;vertical-align:top;">
        <div class="site-card">
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775558863/pmn_v6crrg.jpg" alt="Accra" class="site-img" />
          <div class="site-body">
            <p class="site-tag">Accra · Independence</p>
            <p class="site-name">Black Star Gate &amp; Nkrumah Mausoleum</p>
            <p class="site-desc">Stand beneath Africa's proudest symbol of independence. The mausoleum holds artifacts of a continent-changing life.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>

  <!-- Row 2: 2 wider cards -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
    <tr>
      <td class="col-half" width="49%" style="padding-right:5px;vertical-align:top;">
        <div class="site-card">
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775657462/compressedImage_zw2rjj.jpg" alt="Labadi Beach Accra" class="site-img" style="height:160px;" />
          <div class="site-body">
            <p class="site-tag">Greater Accra · Ocean</p>
            <p class="site-name">Labadi &amp; Kokrobite Beaches</p>
            <p class="site-desc">Live highlife on the sand. Ice-cold Club beer. Sunsets over the Atlantic. Ghana's beaches are joyful, loud, and completely alive.</p>
          </div>
        </div>
      </td>
      <td class="col-half" width="49%" style="padding-left:5px;vertical-align:top;">
        <div class="site-card">
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1775656952/afrochella_kloegk.jpg" alt="Ghana Map" class="site-img" style="height:160px;object-fit:contain;background:#0a0a0a;padding:20px;" />
          <div class="site-body">
            <p class="site-tag">All Regions · Events</p>
            <p class="site-name">Chale Wote · PANAFEST · Afrochella</p>
            <p class="site-desc">Ghana's cultural calendar is packed. Street art in James Town. Diaspora homecoming at Cape Coast. Afrobeats in December Accra.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</div>

<!-- ══════════════════════════════════════════════════
     CTA STRIP — MID PAGE
══════════════════════════════════════════════════ -->
<div class="cta-strip" style="background-color: #080808;">
  <!--[if gte mso 9]>
  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px;height:350px;">
    <v:fill type="frame" src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/5_yc05lt.jpg" color="#080808" />
    <v:textbox inset="0,0,0,0">
  <![endif]-->
  <p class="label" style="text-align:center;margin-bottom:10px;">Ready When You Are</p>
  <div class="divider-gold divider-center"></div>
  <h2 class="h2" style="text-align:center;margin-bottom:14px;">
    Tell us your dates.<br>
    <em>We'll do the rest.</em>
  <!--[if gte mso 9]>
    </v:textbox>
  </v:rect>
  <![endif]-->
  </h2>
  <p class="body" style="text-align:center;margin:0 auto 30px;max-width:460px;">
    Reply with your <strong>travel timeline</strong>, <strong>length of stay</strong>, and <strong>budget</strong> — and we'll come back to you within 2 hours with everything set up.
  </p>
  <div style="text-align:center;">
    <a href="https://milehigh5280airbnb.com/booking" class="btn-gold" style="margin-right:10px;">Reserve Online</a>
    <a href="https://wa.me/17207059849?text=Hello%2C%20I%27d%20like%20to%20book%20Milehigh5280" class="btn-ghost">💬 WhatsApp</a>
  </div>
</div>


<!-- ══════════════════════════════════════════════════
     GHANA FULL-WIDTH CULTURAL BANNER
══════════════════════════════════════════════════ -->
<div style="position:relative;overflow:hidden;">
  <img
    src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/POO_s607yy.png"
    alt="Ghana — Milehigh Properties"
    style="width:100%;height:320px;object-fit:cover;display:block;filter:brightness(0.5) saturate(1.1);"
  />
  <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,8,8,0.7) 0%,rgba(8,8,8,0.3) 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:20px;">
    <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:44px;font-weight:300;font-style:italic;color:#F5F0E8;margin:0 0 8px;text-shadow:0 2px 24px rgba(0,0,0,0.6);">Ghana is waiting for you 🇬🇭</p>
    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:#C9963A;margin:0 0 24px;">Milehigh5280 &nbsp;·&nbsp; Ayi Mensah, Accra</p>
    <a href="https://milehigh5280airbnb.com" style="display:inline-block;background:transparent;color:#C9963A;border:1px solid rgba(201,150,58,0.5);font-family:'DM Sans',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;padding:12px 36px;text-decoration:none;">Explore The Property</a>
  </div>
</div>

<!-- ══════════════════════════════════════════════════
     FINAL CTA — DARK
══════════════════════════════════════════════════ -->
<div class="sec" style="text-align:center;background:#080808;border-top:1px solid rgba(201,150,58,0.12);">
  <p class="label" style="text-align:center;margin-bottom:10px;">Get In Touch</p>
  <div class="divider-gold divider-center"></div>
  <h2 class="h2" style="text-align:center;margin-bottom:16px;">
    One message.<br><em>Everything arranged.</em>
  </h2>
  <p class="body" style="text-align:center;margin:0 auto 32px;max-width:420px;">
    Tell us your budget, your dates, and your plans. We take care of everything else — from airport pickup to local orientation. No booking fees. No middlemen.
  </p>
  <div>
    <a href="https://milehigh5280airbnb.com/contact" class="btn-gold" style="margin-right:10px;">Start a Conversation</a>
    <br style="display:none;" />
  </div>
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#333333;margin:20px 0 0;letter-spacing:0.08em;">
    Or WhatsApp directly: <a href="https://wa.me/17207059849" style="color:#C9963A;text-decoration:none;">+1 720 705 9849</a>
  </p>
</div>

<!-- ══════════════════════════════════════════════════
     FOOTER
══════════════════════════════════════════════════ -->
<div class="footer">

  <!-- Logo -->
  <p class="footer-logo">Milehigh5280 🌴</p>
  <p class="footer-sub">Ayi Mensah · Accra · Ghana · Est. 2021</p>

  <!-- Thin gold rule -->
  <div style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#C9963A,transparent);margin:0 auto 24px;"></div>

  <!-- Social -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
    <tr>
      <td style="padding:0 5px;">
        <a href="https://instagram.com/milehigh5280" style="display:block;width:34px;height:34px;border:1px solid rgba(201,150,58,0.22);text-align:center;line-height:34px;font-size:14px;text-decoration:none;color:rgba(245,240,232,0.35);">📷</a>
      </td>
      <td style="padding:0 5px;">
        <a href="https://facebook.com/milehigh5280" style="display:block;width:34px;height:34px;border:1px solid rgba(201,150,58,0.22);text-align:center;line-height:34px;font-size:14px;text-decoration:none;color:rgba(245,240,232,0.35);">f</a>
      </td>
      <td style="padding:0 5px;">
        <a href="https://wa.me/17207059849" style="display:block;width:34px;height:34px;border:1px solid rgba(201,150,58,0.22);text-align:center;line-height:34px;font-size:14px;text-decoration:none;color:rgba(245,240,232,0.35);">💬</a>
      </td>
      <td style="padding:0 5px;">
        <a href="https://milehigh5280airbnb.com" style="display:block;width:34px;height:34px;border:1px solid rgba(201,150,58,0.22);text-align:center;line-height:34px;font-size:14px;text-decoration:none;color:rgba(245,240,232,0.35);">🌐</a>
      </td>
    </tr>
  </table>

  <!-- Contact line -->
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#D3D3D3;line-height:1.9;margin:0 0 16px;">
    📍 Ayi Mensah, Accra, Ghana &nbsp;·&nbsp; ✉ info@milehigh5280airbnb.com &nbsp;·&nbsp; 📞 +1 720 705 9849
  </p>

  <!-- Nav links -->
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#C9963A;margin:0 0 20px;">
    <a href="https://milehigh5280airbnb.com" style="color:#C9963A;text-decoration:none;">Website</a>
    &nbsp;·&nbsp;
    <a href="https://milehigh5280airbnb.com/properties" style="color:#C9963A;text-decoration:none;">Properties</a>
    &nbsp;·&nbsp;
    <a href="https://milehigh5280airbnb.com/ghana-guide" style="color:#C9963A;text-decoration:none;">Ghana Guide</a>
    &nbsp;·&nbsp;
    <a href="https://milehigh5280airbnb.com/news" style="color:#C9963A;text-decoration:none;">Stories</a>
    &nbsp;·&nbsp;
    <a href="https://milehigh5280airbnb.com/contact" style="color:#C9963A;text-decoration:none;">Contact</a>
    &nbsp;·&nbsp;
    <a href="https://milehigh5280airbnb.com/privacy" style="color:#C9963A;text-decoration:none;">Privacy</a>
  </p>

  <!-- Legal -->
  <p style="font-family:'DM Sans',Arial,sans-serif;font-size:10px;color:#2E7D32;margin:0;line-height:1.9;">
    © 2026 Milehigh Properties. All rights reserved.<br>
    You're receiving this because you subscribed or enquired via milehigh5280airbnb.com.<br>
    <a href="#" style="color:#2E7D32;text-decoration:underline;">Unsubscribe</a>
    &nbsp;·&nbsp;
    <a href="#" style="color:#2E7D32;text-decoration:underline;">Update preferences</a>
  </p>
</div>

          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`
  }
];
