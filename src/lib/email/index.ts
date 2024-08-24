import "server-only";

import { EmailTemplate } from "@/components/auth/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const mailSender = async (
  mailtext: string,
  mailsubject: string,
  mailto: string
) => {
  const mailOptions = {
    from: `AuthReplier <${process.env.EMAIL_FROM}>`,
    to: mailto,
    subject: mailsubject,
    react: EmailTemplate({ firstName: mailtext }),
  };

  try {
    const { data, error } = await resend.emails.send(mailOptions);

    console.log(data, "data");
    console.log(error, "error");

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error };
  }
};
