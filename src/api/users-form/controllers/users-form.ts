const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
	"api::users-form.users-form",
	({ strapi }) => ({
		async create(ctx) {
			try {
				const response = await super.create(ctx);
				const formData = ctx.request.body.data;
				const sendTo = process.env.EMAIL_RECIPIENT;

				await strapi
					.plugin("email")
					.service("email")
					.send({
						to: sendTo,
						from: "no-reply@yourdomain.com",
						subject: "🖋️ New tattoo booking request",
						html: `
          <h3>New booking request</h3>
          <p><b>Name:</b> ${formData.name}</p>
          <p><b>Instagram:</b> ${formData.instagram}</p>
          <p><b>Email:</b> ${formData.email}</p>
          <p><b>Size:</b> ${formData.size}</p>
          <p><b>Vision:</b> ${formData.vision}</p>
          <p><b>Date:</b> ${formData.date}</p>
          <p><b>Place:</b> ${formData.place}</p>
        `,
					});

				return response;
			} catch (error) {
				console.error("Error sending email:", error);
				ctx.throw(500, "Email sending failed");
			}
		},
	})
);
