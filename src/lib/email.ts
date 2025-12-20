// Email utility functions
// In production, replace with your preferred email service (SendGrid, Resend, AWS SES, etc.)

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface AppointmentDetails {
  patientName: string;
  patientEmail: string;
  audiologistName: string;
  appointmentType: string;
  startTime: Date;
  endTime: Date;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // In development, log the email instead of sending
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email would be sent:");
    console.log("  To:", options.to);
    console.log("  Subject:", options.subject);
    console.log("  Content:", options.text || options.html);
    return true;
  }

  // Production: Use your email service
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Veritas Hearing Audiology <appointments@veritashearing.co.nz>',
  //   to: options.to,
  //   subject: options.subject,
  //   html: options.html,
  // });

  // For now, just log
  console.log("📧 Email sent to:", options.to);
  return true;
}

export function formatAppointmentDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatAppointmentTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export async function sendAppointmentConfirmation(
  details: AppointmentDetails
): Promise<boolean> {
  const subject = "Your Appointment Confirmation - Veritas Hearing";
  const formattedDate = formatAppointmentDate(details.startTime);
  const formattedTime = formatAppointmentTime(details.startTime);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #183D2D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #F7F5EF; padding: 30px; border-radius: 0 0 8px 8px; }
        .appointment-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C6A667; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #183D2D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Confirmed</h1>
        </div>
        <div class="content">
          <p>Dear ${details.patientName},</p>
          <p>Your appointment at Veritas Hearing has been confirmed. Here are the details:</p>

          <div class="appointment-box">
            <p><strong>Service:</strong> ${details.appointmentType}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Provider:</strong> ${details.audiologistName}</p>
          </div>

          <p><strong>Location:</strong><br>
          Veritas Hearing<br>
          42a Hillcrest Road<br>
          Hillcrest, Hamilton 3216<br>
          New Zealand</p>

          <p><strong>What to bring:</strong></p>
          <ul>
            <li>Photo ID</li>
            <li>Insurance card (if applicable)</li>
            <li>List of current medications</li>
            <li>Any previous hearing test results</li>
          </ul>

          <p>If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance through our patient portal or by calling 029 0451 0839.</p>

          <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/portal/appointments" class="button">View Appointment</a>
        </div>
        <div class="footer">
          <p>Veritas Hearing<br>
          029 0451 0839 | info@veritashearing.co.nz</p>
          <p>This email was sent to ${details.patientEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Appointment Confirmed - Veritas Hearing

Dear ${details.patientName},

Your appointment has been confirmed:

Service: ${details.appointmentType}
Date: ${formattedDate}
Time: ${formattedTime}
Provider: ${details.audiologistName}

Location:
Veritas Hearing
42a Hillcrest Road
Hillcrest, Hamilton 3216
New Zealand

What to bring:
- Photo ID
- Insurance card (if applicable)
- List of current medications
- Any previous hearing test results

If you need to reschedule or cancel, please do so at least 24 hours in advance.

Veritas Hearing
029 0451 0839 | info@veritashearing.co.nz
  `;

  return sendEmail({
    to: details.patientEmail,
    subject,
    html,
    text,
  });
}

export async function sendAppointmentReminder(
  details: AppointmentDetails
): Promise<boolean> {
  const subject = "Appointment Reminder - Tomorrow at Veritas Hearing";
  const formattedDate = formatAppointmentDate(details.startTime);
  const formattedTime = formatAppointmentTime(details.startTime);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #183D2D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #F7F5EF; padding: 30px; border-radius: 0 0 8px 8px; }
        .appointment-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C6A667; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Reminder</h1>
        </div>
        <div class="content">
          <p>Dear ${details.patientName},</p>
          <p>This is a friendly reminder about your upcoming appointment at Veritas Hearing:</p>

          <div class="appointment-box">
            <p><strong>Service:</strong> ${details.appointmentType}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Provider:</strong> ${details.audiologistName}</p>
          </div>

          <p>Please remember to bring your photo ID and insurance card.</p>
          <p>If you need to reschedule, please contact us as soon as possible at 029 0451 0839.</p>

          <p>We look forward to seeing you!</p>
        </div>
        <div class="footer">
          <p>Veritas Hearing<br>
          029 0451 0839 | info@veritashearing.co.nz</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: details.patientEmail,
    subject,
    html,
  });
}

export async function sendAppointmentCancellation(
  details: AppointmentDetails,
  reason?: string
): Promise<boolean> {
  const subject = "Appointment Cancelled - Veritas Hearing";
  const formattedDate = formatAppointmentDate(details.startTime);
  const formattedTime = formatAppointmentTime(details.startTime);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #F7F5EF; padding: 30px; border-radius: 0 0 8px 8px; }
        .appointment-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #DC2626; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; background: #183D2D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Cancelled</h1>
        </div>
        <div class="content">
          <p>Dear ${details.patientName},</p>
          <p>Your appointment at Veritas Hearing has been cancelled:</p>

          <div class="appointment-box">
            <p><strong>Service:</strong> ${details.appointmentType}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Provider:</strong> ${details.audiologistName}</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
          </div>

          <p>If you'd like to reschedule your appointment, please use our online booking system or call us at 029 0451 0839.</p>

          <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/portal/appointments/new" class="button">Book New Appointment</a>
        </div>
        <div class="footer">
          <p>Veritas Hearing<br>
          029 0451 0839 | info@veritashearing.co.nz</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: details.patientEmail,
    subject,
    html,
  });
}
