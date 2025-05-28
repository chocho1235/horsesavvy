import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, clinic, date, time, status, reference } = req.body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  let subject = '';
  let html = '';

  // You can customize the 'from' address below. To use your own domain, verify it in Resend and replace the address.
  const fromAddress = 'onboarding@resend.dev'; // e.g., 'bookings@yourdomain.com' after domain verification

  if (status === 'deposit') {
    subject = 'Deposit Received – Your Booking is Pending';
    html = `
      <div style="font-family:Arial,sans-serif; color:#222;">
        <h2 style="color:#b91c1c;">Hi ${name},</h2>
        <p>We have received your <b>deposit</b> for the following clinic:</p>
        <table style="margin:16px 0; font-size:1.05em;">
          <tr><td><b>Clinic:</b></td><td>${clinic}</td></tr>
          <tr><td><b>Date:</b></td><td>${date}</td></tr>
          <tr><td><b>Time:</b></td><td>${time}</td></tr>
          <tr><td><b>Reference:</b></td><td style="color:#b91c1c; font-weight:bold;">${reference}</td></tr>
        </table>
        <p style="color:#b91c1c;">Your booking is now pending final payment.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="font-size:0.95em; color:#888;">If you have any questions, reply to this email or contact us at <a href="mailto:Penelopepleasant@gmail.com">Penelopepleasant@gmail.com</a>.</p>
        <p style="font-size:0.9em; color:#aaa;">BeHorseSavvy</p>
      </div>
    `;
  } else if (status === 'confirmed') {
    subject = '🎉 Booking Confirmed – Full Payment Received';
    html = `
      <div style="font-family:Arial,sans-serif; color:#222;">
        <h2 style="color:#16a34a;">Congratulations, ${name}!</h2>
        <p>Your <b>full payment</b> for the following clinic has been received and your booking is now fully confirmed:</p>
        <table style="margin:16px 0; font-size:1.05em;">
          <tr><td><b>Clinic:</b></td><td>${clinic}</td></tr>
          <tr><td><b>Date:</b></td><td>${date}</td></tr>
          <tr><td><b>Time:</b></td><td>${time}</td></tr>
          <tr><td><b>Reference:</b></td><td style="color:#b91c1c; font-weight:bold;">${reference}</td></tr>
        </table>
        <p style="color:#16a34a;">We look forward to seeing you!</p>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="font-size:0.95em; color:#888;">For questions, reply to this email or contact us at <a href="mailto:Penelopepleasant@gmail.com">Penelopepleasant@gmail.com</a>.</p>
        <p style="font-size:0.9em; color:#aaa;">BeHorseSavvy</p>
      </div>
    `;
  } else if (status === 'declined') {
    subject = 'Booking Declined';
    html = `
      <div style="font-family:Arial,sans-serif; color:#222;">
        <h2 style="color:#b91c1c;">Hi ${name},</h2>
        <p>Unfortunately, your booking for the following clinic has been declined:</p>
        <table style="margin:16px 0; font-size:1.05em;">
          <tr><td><b>Clinic:</b></td><td>${clinic}</td></tr>
          <tr><td><b>Date:</b></td><td>${date}</td></tr>
          <tr><td><b>Time:</b></td><td>${time}</td></tr>
          <tr><td><b>Reference:</b></td><td style="color:#b91c1c; font-weight:bold;">${reference}</td></tr>
        </table>
        <p style="color:#b91c1c;">Please contact us if you have questions or would like to discuss alternative options.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="font-size:0.95em; color:#888;">Reply to this email or contact us at <a href="mailto:Penelopepleasant@gmail.com">Penelopepleasant@gmail.com</a>.</p>
        <p style="font-size:0.9em; color:#aaa;">BeHorseSavvy</p>
      </div>
    `;
  } else {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    await resend.emails.send({
      from: fromAddress, // Customize this after verifying your domain in Resend
      to: email,
      subject,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 