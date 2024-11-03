import nodemailer from "nodemailer";
export const sendEmail = async ({ from, to, subject, html }) => {
  try {
    const formEmail = from || process.env.APP_EMAIL;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: formEmail,
      to: to,
      subject: subject,
      html: html,
    });

    return;
  } catch (error) {
    console.log(error);
    return { message: "Email send failed", error: error };
  }
};
