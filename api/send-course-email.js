import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, course, packageSelection, totalPrice, status, reference } = req.body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  let subject = '';
  let html = '';

  // Use your verified domain
  const fromAddress = 'bookings@equinology.me';

  if (status === 'pending') {
    subject = "Course Booking Received - Payment Pending - BeHorseSavvy";
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Course Booking Acknowledgement</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #b91c1c; font-size: 1.3rem; margin-bottom: 12px;">Thank you, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">We've received your course booking request. <b>Your enrollment is now reserved pending payment.</b> Please follow the payment instructions provided. Our team will check your payment and you will receive an email update once it is verified.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Course:</td><td style="padding: 8px 0;">${course}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Package:</td><td style="padding: 8px 0;">${packageSelection}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Total:</td><td style="padding: 8px 0; font-weight: bold;">£${totalPrice}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 6px; color: #075985;">
            <b>What happens next:</b><br>
            • Complete your payment as soon as possible to secure your enrollment.<br>
            • We will verify your payment and send you course access details.<br>
            • If payment is not received in time, your enrollment may be released.<br>
            • Use reference <b>${reference}</b> for all payment communications.
          </div>
          <div style="margin: 18px 0 0 0; padding: 16px; background: #f3f4f6; border-left: 4px solid #b91c1c; border-radius: 6px; color: #1a202c;">
            <b>Payment Instructions:</b><br>
            Please transfer £${totalPrice} using the bank details provided during checkout.<br>
            <span style="font-size: 0.98rem; color: #666;">Make sure to include your reference number: <b>${reference}</b></span>
          </div>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'confirmed') {
    subject = 'Course Access Confirmed - Welcome to BeHorseSavvy!';
    html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 2.2rem; font-weight: 800; color: #b91c1c; letter-spacing: 1.5px;">BeHorseSavvy</span>
          <div style="font-size: 1.1rem; color: #374151; margin-top: 4px;">Course Access Confirmed</div>
        </div>
        <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 28px 24px 20px 24px;">
          <h2 style="color: #16a34a; font-size: 1.3rem; margin-bottom: 12px;">Welcome, ${name.split(' ')[0]}!</h2>
          <p style="font-size: 1.08rem; color: #222; margin-bottom: 18px;">Congratulations! Your payment has been received and your course enrollment is now <b>fully confirmed</b>. Welcome to <b>BeHorseSavvy</b> – we're excited to support your equestrian journey!</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Course:</td><td style="padding: 8px 0;">${course}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Package:</td><td style="padding: 8px 0;">${packageSelection}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Total Paid:</td><td style="padding: 8px 0; font-weight: bold; color: #16a34a;">£${totalPrice}</td></tr>
            <tr><td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">Reference:</td><td style="padding: 8px 0; font-weight: bold; color: #b91c1c;">${reference}</td></tr>
          </table>
          <div style="margin: 18px 0 12px 0; padding: 16px; background: #dcfce7; border-left: 4px solid #22c55e; border-radius: 6px; color: #166534;">
            <b>Your course access:</b><br>
            • You now have full access to all course materials<br>
            • Course materials are available for the duration specified in your package<br>
            • Complete modules at your own pace<br>
            • Certificates will be issued upon successful completion
          </div>
          <div style="margin: 18px 0 0 0; padding: 16px; background: #f3f4f6; border-left: 4px solid #b91c1c; border-radius: 6px; color: #1a202c;">
            <b>Getting Started:</b><br>
            • Access your course materials through your student portal<br>
            • If you need login details, contact us at <a href="mailto:Penelopepleasant@gmail.com" style="color: #b91c1c; text-decoration: underline;">Penelopepleasant@gmail.com</a><br>
            • For technical support or course questions, we're here to help!<br>
            <span style="font-size: 0.98rem; color: #666;">Keep this email as your enrollment confirmation.</span>
          </div>
        </div>
        <div style="text-align: center; color: #aaa; font-size: 0.95rem; margin-top: 32px;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
      </div>
    `;
  } else if (status === 'declined') {
    subject = 'Course Booking Declined - BeHorseSavvy';
    html = `
      <div style="font-family:Arial,sans-serif; color:#222;">
        <h2 style="color:#b91c1c;">Hi ${name},</h2>
        <p>Unfortunately, your course booking has been declined:</p>
        <table style="margin:16px 0; font-size:1.05em;">
          <tr><td><b>Course:</b></td><td>${course}</td></tr>
          <tr><td><b>Package:</b></td><td>${packageSelection}</td></tr>
          <tr><td><b>Total:</b></td><td>£${totalPrice}</td></tr>
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
      from: fromAddress,
      to: email,
      subject,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending course email:', err);
    res.status(500).json({ error: err.message });
  }
} 