import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, clinic, date, time, status, reference } = req.body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  let subject = '';
  let html = '';

  // Use your verified domain
  const fromAddress = 'bookings@equinology.me';

  if (status === 'submitted') {
    subject = 'We've Received Your Booking Request – BeHorseSavvy';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Clinic Booking Acknowledgement</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #b91c1c; font-size: 1.3rem; margin-bottom: 12px;">Thank you, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We've received your booking request for the clinic below. Our team will review your request and send you payment instructions if a place is available. <b>Your booking is not yet confirmed.</b></p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Clinic:</td><td style="padding: 8px 0;">${clinic}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Date:</td><td style="padding: 8px 0;">${date}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Time:</td><td style="padding: 8px 0;">${time}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e42; border-radius: 6px; color: #92400e;">
            <b>What happens next?</b><br>
            • We'll check availability and email you payment instructions if a place is available.<br>
            • Your booking is only confirmed once payment is received and verified.<br>
            • You'll receive further updates by email.
          </div>
          <p style="font-size: 1.01rem; color: #444; margin-top: 18px;">If you have any questions, reply to this email or contact us at <a href="mailto:Penelopepleasant@gmail.com" style="color: #b91c1c; text-decoration: underline;">Penelopepleasant@gmail.com</a>.</p>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'deposit') {
    subject = 'Deposit Received – Next Steps for Your BeHorseSavvy Booking';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Deposit Payment Received</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #b91c1c; font-size: 1.3rem; margin-bottom: 12px;">Thank you, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We have received your deposit for the following clinic. Your place is now <b>provisionally reserved</b> pending full payment.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Clinic:</td><td style="padding: 8px 0;">${clinic}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Date:</td><td style="padding: 8px 0;">${date}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Time:</td><td style="padding: 8px 0;">${time}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 6px; color: #075985;">
            <b>Next steps:</b><br>
            • Please ensure the remaining balance is paid by the due date (we will email you details if not already provided).<br>
            • Your booking will be fully confirmed once the full amount is received.<br>
            • If you have any questions, reply to this email or contact us.
          </div>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'confirmed') {
    subject = 'Full Payment Received – Your BeHorseSavvy Booking is Confirmed!';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Booking Fully Confirmed</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #16a34a; font-size: 1.3rem; margin-bottom: 12px;">Congratulations, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We have received your <b>full payment</b> for the clinic below. Your booking is now <b>fully confirmed</b> and we look forward to welcoming you!</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Clinic:</td><td style="padding: 8px 0;">${clinic}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Date:</td><td style="padding: 8px 0;">${date}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Time:</td><td style="padding: 8px 0;">${time}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #dcfce7; border-left: 4px solid #22c55e; border-radius: 6px; color: #166534;">
            <b>What to expect next:</b><br>
            • You will receive a final confirmation email with any additional details or instructions.<br>
            • Please arrive 15 minutes before your scheduled clinic time.<br>
            • If you have any questions, reply to this email or contact us.
          </div>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
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