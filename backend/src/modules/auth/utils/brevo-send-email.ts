import * as brevo from "@getbrevo/brevo";
import { env } from "../../../lib/env/env-validator";

const sendEmail = async ({ htmlContent, toEmail, toName, subject }: any) => {
	try {
		let apiInstance = new brevo.TransactionalEmailsApi();

		apiInstance.setApiKey(
			brevo.TransactionalEmailsApiApiKeys.apiKey,
			env.BREVO_API_KEY
		);

		let sendSmtpEmail = new brevo.SendSmtpEmail();

		sendSmtpEmail.subject = subject;
		sendSmtpEmail.htmlContent = htmlContent;
		sendSmtpEmail.sender = {
			name: "Dicas Grande Tijuca.",
			email: "grupodicasapp@gmail.com",
		};
		sendSmtpEmail.to = [
			{
				email: toEmail,
				name: toName,
			},
		];
		sendSmtpEmail.replyTo = {
			email: "noreply@dicasgrandetijuca.com.br",
			name: "noreply",
		};

		const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
		return true;
	} catch (error) {
		console.error("Erro ao enviar o e-mail:", error);
	}
};

export { sendEmail };
