import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, camp, dates, location, status, reference, price } = req.body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  let subject = '';
  let html = '';

  // Use your verified domain
  const fromAddress = 'bookings@equinology.me';

  if (status === 'submitted') {
    subject = "We've Received Your Camp Pleasant 2026 Booking - BeHorseSavvy";
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Camp Pleasant 2026 Booking Acknowledgement</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #b91c1c; font-size: 1.3rem; margin-bottom: 12px;">Thank you, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We've received your booking request for Camp Pleasant 2026. <b>Your spot is now reserved pending payment.</b> Please follow the payment instructions provided. Our team will check your payment and you will receive an email update once it is verified.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Camp:</td><td style="padding: 8px 0;">${camp}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Dates:</td><td style="padding: 8px 0;">${dates}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Location:</td><td style="padding: 8px 0;">${location}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Full Fee:</td><td style="padding: 8px 0; font-weight: bold;">${price}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e42; border-radius: 6px; color: #92400e;">
            <b>💥 Full Fee Payment Required</b><br>
            • Please transfer the full fee of ${price} to secure your place at Camp Pleasant 2026.<br>
            • No partial payments or deposits are accepted for this camp.<br>
            • Use reference: <b>${reference}</b> when making your transfer.<br>
            • We will confirm your booking once full payment is received.<br>
          </div>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 6px; color: #075985;">
            <b>What's Included:</b><br>
            • 3 days of professional BHS coaching<br>
            • Stabling for your horse<br>
            • Haylage provided<br>
            • Access to all facilities<br>
            • An unforgettable equestrian experience<br>
          </div>
          <p style="font-size: 1.01rem; color: #444; margin-top: 18px;">If you have any questions, reply to this email or contact us at <a href="mailto:Penelopepleasant@gmail.com" style="color: #b91c1c; text-decoration: underline;">Penelopepleasant@gmail.com</a>.</p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'confirmed') {
    subject = 'Full Payment Received – Your Camp Pleasant 2026 Place is Confirmed!';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Camp Pleasant 2026 Confirmed</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #16a34a; font-size: 1.3rem; margin-bottom: 12px;">🎉 Congratulations, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We are absolutely delighted to confirm your place at <b>Camp Pleasant 2026</b>! Thank you for choosing BeHorseSavvy – we can't wait to welcome you and your horse for this incredible 3-day equestrian adventure!</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Camp:</td><td style="padding: 8px 0;">${camp}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Dates:</td><td style="padding: 8px 0;">${dates}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Location:</td><td style="padding: 8px 0;">${location}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Full Fee Paid:</td><td style="padding: 8px 0; font-weight: bold; color: #16a34a;">${price} ✓</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #dcfce7; border-left: 4px solid #22c55e; border-radius: 6px; color: #166534;">
            <b>What to expect next:</b><br>
            • We'll send you detailed preparation information closer to the camp dates.<br>
            • Bring appropriate riding gear and safety equipment.<br>
            • Accommodation arrangements should be made separately if needed.<br>
            • Contact us for accommodation recommendations in the area.<br>
            • Arrive ready for an amazing 3-day equestrian experience!<br>
          </div>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 6px; color: #075985;">
            <b>Your Camp Pleasant 2026 Includes:</b><br>
            • 3 days of intensive professional BHS coaching<br>
            • Stabling for your horse with haylage provided<br>
            • Access to all Kelsall Hill Equestrian Centre facilities<br>
            • Expert guidance to enhance your riding skills<br>
            • An unforgettable equestrian adventure<br>
          </div>
          <p style="font-size: 1.01rem; color: #444; margin-top: 18px;">If you have any questions before Camp Pleasant 2026, contact us at <a href="mailto:Penelopepleasant@gmail.com" style="color: #b91c1c; text-decoration: underline;">Penelopepleasant@gmail.com</a>.</p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'declined') {
    subject = 'Camp Pleasant 2026 Booking Update';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Camp Pleasant 2026 Booking Update</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #b91c1c; font-size: 1.3rem; margin-bottom: 12px;">Hi ${name.split(' ')[0]},</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">Unfortunately, we are unable to confirm your booking for Camp Pleasant 2026 at this time:</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Camp:</td><td style="padding: 8px 0;">${camp}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Dates:</td><td style="padding: 8px 0;">${dates}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; color: #991b1b;">
            <b>What happens next:</b><br>
            • If payment was made, we will process a full refund within 5-7 business days.<br>
            • Please contact us if you have any questions about this decision.<br>
            • We'd be happy to discuss alternative clinic options that might suit you.<br>
          </div>
          <p style="font-size: 1.01rem; color: #444; margin-top: 18px;">Please don't hesitate to contact us at <a href="mailto:Penelopepleasant@gmail.com" style="color: #b91c1c; text-decoration: underline;">Penelopepleasant@gmail.com</a> if you have any questions or would like to discuss future opportunities.</p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending camp email:', err);
    res.status(500).json({ error: err.message });
  }
} 