export default [
	"strapi::logger",
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			origin: [
				"http://localhost:5173",
				"http://10.42.169.204:5173",
				"http://10.179.105.240:5174",
				"http://10.179.105.240:5173",
				"https://front-ten-opal-91.vercel.app",
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
