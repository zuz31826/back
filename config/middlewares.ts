export default [
	"strapi::logger",
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			origin: [
				"http://localhost:5173",
				"https://front-ten-opal-91.vercel.app",
				"https://www.wruszka.com",
				"https://wruszka.com",
			],
			methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
			headers: ["Content-Type", "Authorization", "Origin", "Accept"],
			credentials: true,
		},
	},
	"strapi::poweredBy",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
