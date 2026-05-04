
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

    /* ── OUTER WRAPPER ─────────────────────────────────────────── */
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
      box-shadow: 0 40px 120px rgba(0,0,0,0.9);
    }

    /* ── FONTS ───────────────────────────────────────────────────── */
    .f-serif  { font-family: 'Cormorant Garamond', Georgia, serif; }
    .f-sans   { font-family: 'DM Sans', Arial, sans-serif; }

    /* ── TOP TICKER ──────────────────────────────────────────────── */
    .ticker {
      background: linear-gradient(90deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      padding: 9px 32px;
      text-align: center;
    }
    .ticker p {
      margin: 0;
      font-family: Arial, sans-serif;
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
      background: linear-gradient(180deg, rgba(8,8,8,0.05) 0%, rgba(8,8,8,1.00) 100%);
      padding: 40px 48px 52px;
      text-align: center;
    }

    .hero-h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 58px;
      font-weight: 300;
      line-height: 1.06;
      color: #F5F0E8;
      margin: 0 0 10px;
    }
    .hero-h1 em { font-style: italic; color: #C9963A; }

    .btn-gold {
      display: inline-block;
      background: linear-gradient(135deg, #C9963A 0%, #E8C06A 50%, #C9963A 100%);
      color: #080808;
      font-family: Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      padding: 15px 44px;
      text-decoration: none;
    }

    /* ── SECTION ───────────────────────────────────────────────── */
    .sec { padding: 52px 48px; }
    .label {
      font-family: Arial, sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9963A;
      margin: 0 0 10px;
    }
    .h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 40px;
      font-weight: 300;
      line-height: 1.12;
      color: #F5F0E8;
      margin: 0 0 18px;
    }
    .body {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.82;
      color: #888888;
      margin: 0 0 16px;
    }
    .footer { background: #080808; padding: 44px 48px; text-align: center; border-top: 1px solid rgba(201,150,58,0.12); }
  </style>
</head>
<body>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="outer">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="card">
          <tr>
            <td>
              <div class="ticker"><p>Milehigh5280 ✦ Ayi Mensah, Accra ✦ Est. 2021</p></div>
              <div class="hero-wrap">
                <img class="hero-img" src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/ERR_jjr2hx.jpg" alt="Hero">
                <div class="hero-scrim">
                  <h1 class="hero-h1">There is a place in Accra where the world <em>slows down</em></h1>
                  <a href="#" class="btn-gold">Reserve Your Stay</a>
                </div>
              </div>
              <div class="sec">
                <p class="label">The Apartment</p>
                <h2 class="h2">Milehigh5280 <em>🌴</em></h2>
                <p class="body">Every room designed for rest. Every detail chosen for comfort. Nestled inside the quiet green hills of Ayi Mensah.</p>
                <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/f_auto,q_auto,w_800/5_yc05lt.jpg" alt="Living Room" style="width:100%; border:1px solid rgba(201,150,58,0.12);">
              </div>
              <div class="footer">
                <p style="color:#C9963A; font-family:serif; font-size:24px;">Milehigh5280 🌴</p>
                <p style="color:#555; font-size:10px; letter-spacing:0.3em; text-transform:uppercase;">Ayi Mensah · Accra · Ghana</p>
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
