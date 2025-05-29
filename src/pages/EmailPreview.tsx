import React from 'react';

const mockData = {
  email: 'rider@example.com',
  name: 'Alexandra Smith',
  clinic: 'Dressage Masterclass',
  date: 'Saturday, July 20, 2024',
  time: '10:00 AM - 1:00 PM',
  reference: 'BHS-123456',
};

function getEmailHtml(status: 'submitted' | 'deposit' | 'confirmed') {
  const { name, clinic, date, time, reference } = mockData;
  // Stripe-inspired minimal palette
  const brandRed = '#b91c1c';
  const borderColor = '#e5e7eb';
  const textColor = '#222';
  const mutedText = '#6b7280';
  const cardShadow = '0 2px 12px rgba(0,0,0,0.04)';
  const logo = `<span style="font-weight:900;font-size:1.7rem;letter-spacing:1px;color:${brandRed};">BeHorseSavvy</span>`;

  const cardStyle = `background:#fff;border-radius:12px;box-shadow:${cardShadow};border:1px solid ${borderColor};max-width:520px;margin:0 auto;overflow:hidden;`;
  const sectionStyle = 'padding:32px 32px 24px 32px;';
  const divider = `<div style="height:1px;background:${borderColor};margin:24px 0 20px 0;"></div>`;
  const tableStyle = 'width:100%;border-collapse:collapse;margin-bottom:18px;';
  const thStyle = `padding:7px 0;color:${brandRed};font-weight:600;text-align:left;width:120px;`;
  const tdStyle = 'padding:7px 0;color:#222;';

  if (status === 'submitted') {
    return `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;padding:40px 0;min-height:100vh;">
        <div style="${cardStyle}">
          <div style="padding:28px 0 0 0;text-align:center;">${logo}</div>
          <div style="${sectionStyle}">
            <h2 style="color:${brandRed};font-size:1.25rem;margin-bottom:10px;font-weight:700;">Booking Request Received</h2>
            <p style="font-size:1.08rem;color:${textColor};margin-bottom:18px;line-height:1.6;">Thank you, <b>${name.split(' ')[0]}</b>. We've received your booking request for the clinic below. <b>Your spot is reserved pending payment.</b> Please follow the payment instructions provided. Our team will check your payment and you will receive an email update once it is verified.</p>
            ${divider}
            <table style="${tableStyle}">
              <tr><th style="${thStyle}">Clinic</th><td style="${tdStyle}">${clinic}</td></tr>
              <tr><th style="${thStyle}">Date</th><td style="${tdStyle}">${date}</td></tr>
              <tr><th style="${thStyle}">Time</th><td style="${tdStyle}">${time}</td></tr>
              <tr><th style="${thStyle}">Reference</th><td style="${tdStyle}font-weight:bold;color:${brandRed};">${reference}</td></tr>
            </table>
            <div style="margin:18px 0 0 0;">
              <b>What happens next?</b>
              <ul style="margin:8px 0 0 18px;padding:0;font-size:1.01rem;color:${textColor};">
                <li>Complete your payment as soon as possible to secure your place.</li>
                <li>We will check your payment and send you an email update.</li>
                <li>If payment is not received in time, your spot may be released.</li>
              </ul>
            </div>
            <p style="font-size:0.99rem;color:${mutedText};margin-top:22px;">Questions? <a href="mailto:Penelopepleasant@gmail.com" style="color:${brandRed};text-decoration:underline;font-weight:500;">Penelopepleasant@gmail.com</a></p>
          </div>
          <div style="padding:18px 0;text-align:center;color:${mutedText};font-size:0.98rem;border-top:1px solid ${borderColor};background:#fafbfc;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
        </div>
      </div>
    `;
  } else if (status === 'deposit') {
    return `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;padding:40px 0;min-height:100vh;">
        <div style="${cardStyle}">
          <div style="padding:28px 0 0 0;text-align:center;">${logo}</div>
          <div style="${sectionStyle}">
            <h2 style="color:${brandRed};font-size:1.25rem;margin-bottom:10px;font-weight:700;">Deposit Received</h2>
            <p style="font-size:1.08rem;color:${textColor};margin-bottom:18px;line-height:1.6;">Thank you, <b>${name.split(' ')[0]}</b>. We have received your deposit for the following clinic. Your place is now <b>provisionally reserved</b> pending full payment.</p>
            ${divider}
            <table style="${tableStyle}">
              <tr><th style="${thStyle}">Clinic</th><td style="${tdStyle}">${clinic}</td></tr>
              <tr><th style="${thStyle}">Date</th><td style="${tdStyle}">${date}</td></tr>
              <tr><th style="${thStyle}">Time</th><td style="${tdStyle}">${time}</td></tr>
              <tr><th style="${thStyle}">Reference</th><td style="${tdStyle}font-weight:bold;color:${brandRed};">${reference}</td></tr>
            </table>
            <div style="margin:18px 0 0 0;">
              <b>Next steps</b>
              <ul style="margin:8px 0 0 18px;padding:0;font-size:1.01rem;color:${textColor};">
                <li>Pay the remaining balance by the due date (we will email you details if not already provided).</li>
                <li>Your booking will be fully confirmed once the full amount is received.</li>
                <li>If you have any questions, contact us.</li>
              </ul>
            </div>
          </div>
          <div style="padding:18px 0;text-align:center;color:${mutedText};font-size:0.98rem;border-top:1px solid ${borderColor};background:#fafbfc;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
        </div>
      </div>
    `;
  } else if (status === 'confirmed') {
    return `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;padding:40px 0;min-height:100vh;">
        <div style="${cardStyle}">
          <div style="padding:28px 0 0 0;text-align:center;">${logo}</div>
          <div style="${sectionStyle}">
            <h2 style="color:${brandRed};font-size:1.25rem;margin-bottom:10px;font-weight:700;">Booking Fully Confirmed</h2>
            <p style="font-size:1.08rem;color:${textColor};margin-bottom:18px;line-height:1.6;">Congratulations, <b>${name.split(' ')[0]}</b>! Your booking for the clinic below is now fully confirmed. Thank you for choosing BeHorseSavvy – we look forward to welcoming you and your horse!</p>
            ${divider}
            <table style="${tableStyle}">
              <tr><th style="${thStyle}">Clinic</th><td style="${tdStyle}">${clinic}</td></tr>
              <tr><th style="${thStyle}">Date</th><td style="${tdStyle}">${date}</td></tr>
              <tr><th style="${thStyle}">Time</th><td style="${tdStyle}">${time}</td></tr>
              <tr><th style="${thStyle}">Reference</th><td style="${tdStyle}font-weight:bold;color:${brandRed};">${reference}</td></tr>
            </table>
            <div style="margin:18px 0 0 0;">
              <b>What to expect</b>
              <ul style="margin:8px 0 0 18px;padding:0;font-size:1.01rem;color:${textColor};">
                <li>Please arrive 15 minutes before your scheduled clinic time.</li>
                <li>Bring appropriate riding gear and safety equipment.</li>
                <li>Questions? <a href="mailto:Penelopepleasant@gmail.com" style="color:${brandRed};text-decoration:underline;font-weight:500;">Penelopepleasant@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div style="padding:18px 0;text-align:center;color:${mutedText};font-size:0.98rem;border-top:1px solid ${borderColor};background:#fafbfc;">&copy; ${new Date().getFullYear()} BeHorseSavvy</div>
        </div>
      </div>
    `;
  }
  return '';
}

const EmailPreview = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#b91c1c', marginBottom: 32 }}>BeHorseSavvy Email Previews</h1>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 350, maxWidth: 600 }}>
          <h2 style={{ color: '#b91c1c', fontSize: 22, marginBottom: 12 }}>Booking Request Received</h2>
          <div dangerouslySetInnerHTML={{ __html: getEmailHtml('submitted') }} />
        </div>
        <div style={{ flex: 1, minWidth: 350, maxWidth: 600 }}>
          <h2 style={{ color: '#b91c1c', fontSize: 22, marginBottom: 12 }}>Deposit Received</h2>
          <div dangerouslySetInnerHTML={{ __html: getEmailHtml('deposit') }} />
        </div>
        <div style={{ flex: 1, minWidth: 350, maxWidth: 600 }}>
          <h2 style={{ color: '#b91c1c', fontSize: 22, marginBottom: 12 }}>Full Payment Received</h2>
          <div dangerouslySetInnerHTML={{ __html: getEmailHtml('confirmed') }} />
        </div>
      </div>
    </div>
  );
};

export default EmailPreview; 