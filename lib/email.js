import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDownloadEmail({
  to,
  orderId,
  photoTitle,
}) {
  if (!to) return;

  const downloadUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL}/store/download?order_id=` +
    encodeURIComponent(orderId);

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your photo download is ready",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
        <h2>Thank you for your purchase</h2>

        <p>Your photo <strong>${photoTitle}</strong> is ready for download.</p>

        <p style="margin:24px 0">
          <a href="${downloadUrl}"
             style="display:inline-block;padding:12px 20px;
             background:#111;color:#fff;text-decoration:none;
             border-radius:999px;font-weight:bold">
            Download your file
          </a>
        </p>

        <p style="font-size:13px;color:#666">
          If the button doesn’t work, copy and paste this link:<br/>
          <a href="${downloadUrl}">${downloadUrl}</a>
        </p>

        <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>

        <p style="font-size:12px;color:#777">
          © ${new Date().getFullYear()} Jeevan Chandimal<br/>
          This is an automated email. Please keep it for your records.
        </p>
      </div>
    `,
  });
}
