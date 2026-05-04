"use server";

import nodemailer from "nodemailer";
import { Resend } from "resend";
import { redirect } from "next/navigation";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !EMAIL_REGEX.test(email) || !message) {
    redirect("/contact?status=error");
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    redirect("/contact?status=error");
  }

  const subject = `[Portfolio] ${projectType || "New enquiry"} from ${name}`;
  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Project type:</strong> ${projectType}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
  `;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to,
      subject,
      html,
      replyTo: email,
    });
    redirect("/contact?status=sent");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to,
    replyTo: email,
    subject,
    html,
    text: `${name} (${email})\nProject type: ${projectType}\n\n${message}`,
  });

  redirect("/contact?status=sent");
}
