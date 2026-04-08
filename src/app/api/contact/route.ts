import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { generateContactEmailHtml, generateContactEmailText } from "@/lib/email/templates";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate field lengths (prevent abuse / oversized payloads)
    if (name.length > 100 || email.length > 254 || (phone && phone.length > 30) || message.length > 5000) {
      return NextResponse.json({ error: "One or more fields exceed maximum length" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Get contact email from settings
    const contactEmailSetting = await prisma.setting.findUnique({
      where: { key: "contactEmail" },
    });

    // Fallback to environment variable if setting not found
    const toEmail = contactEmailSetting?.value || process.env.TO_EMAIL;

    console.log("[EMAIL] Recipient lookup:", {
      fromDatabase: contactEmailSetting?.value || "not set",
      fromEnv: process.env.TO_EMAIL || "not set",
      finalRecipient: toEmail || "NO RECIPIENT CONFIGURED",
    });

    if (!toEmail) {
      console.error("[EMAIL] ❌ No recipient email configured!");
      return NextResponse.json(
        { error: "No contact email configured. Please set contactEmail in admin settings or TO_EMAIL in environment." },
        { status: 500 }
      );
    }

    // Create email transporter
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS ? "[REDACTED]" : undefined,
      },
    };
    
    console.log("[EMAIL] Creating transporter with config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
      toEmail,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection
    console.log("[EMAIL] Verifying SMTP connection...");
    await transporter.verify();
    console.log("[EMAIL] SMTP connection verified successfully");

    // Prepare email content using templates
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veritashearing.co.nz';
    const emailHtml = generateContactEmailHtml({ name, email, phone, service, message }, baseUrl);
    const textContent = generateContactEmailText({ name, email, phone, service, message });

    // Send email
    console.log("[EMAIL] Sending email:", {
      from: process.env.FROM_EMAIL,
      to: toEmail,
      subject: `New Contact Form: ${name}`,
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: toEmail,
      replyTo: email, // Reply goes to the user who submitted the form
      subject: `New Contact Form: ${name}`,
      text: textContent,
      html: emailHtml,
    });

    console.log("[EMAIL] Send result:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      pending: info.pending,
    });

    // Check if email was actually accepted
    if (info.rejected && info.rejected.length > 0) {
      console.error("[EMAIL] Email was rejected by server:", info.rejected);
      return NextResponse.json(
        { error: "Email was rejected", rejected: info.rejected },
        { status: 500 }
      );
    }

    console.log("[EMAIL] ✅ Email sent successfully! Message ID:", info.messageId);
    
    return NextResponse.json(
      { 
        message: "Email sent successfully",
        messageId: info.messageId,
        accepted: info.accepted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[EMAIL] ❌ Email sending failed:", {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        code: (error as NodeJS.ErrnoException).code,
      } : error,
    });
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
