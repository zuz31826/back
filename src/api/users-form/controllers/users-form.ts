const { createCoreController } = require("@strapi/strapi").factories;
const brevo = require("@getbrevo/brevo");

module.exports = createCoreController("api::users-form.users-form", () => ({
	async create(ctx) {
		try {
			const response = await super.create(ctx);
			const formData = ctx.request.body.data;

			const client = new brevo.TransactionalEmailsApi();
			client.setApiKey(
				brevo.TransactionalEmailsApiApiKeys.apiKey,
				process.env.BREVO_API_KEY
			);

			const emailData = {
				sender: { name: "Booking", email: process.env.FROM_EMAIL },
				to: [{ email: process.env.TO_EMAIL, name: "Admin" }],
				subject: "🖋️ New tattoo booking request",
				htmlContent: `
    <h3>New booking request</h3>
    <p><b>Name:</b> ${formData.name}</p>
    <p><b>Instagram:</b> ${formData.instagram}</p>
    <p><b>Email:</b> ${formData.email}</p>
    <p><b>Size:</b> ${formData.size}</p>
    <p><b>Vision:</b> ${formData.vision}</p>
    <p><b>Date:</b> ${formData.date}</p>
    <p><b>Place:</b> ${formData.place}</p>
  `,
			};

			await client.sendTransacEmail(emailData);

			return response;
		} catch (error) {
			console.error("💥 Ошибка отправки email через Brevo API:", error);
			ctx.throw(500, "Email sending failed");
		}
	},
}));
