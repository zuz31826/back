export default ({ env }) => {
	const client = env("DATABASE_CLIENT", "sqlite");
	if (client === "sqlite") {
		return {
			connection: {
				client: "sqlite",
				connection: {
					filename: env("DATABASE_FILENAME", ".tmp/data.db"),
				},
				useNullAsDefault: true,
			},
		};
	} else {
		return {
			connection: {
				client: "postgres",
				connection: {
					connectionString: env("DATABASE_URL"),
					ssl: env.bool("DATABASE_SSL", true)
						? { rejectUnauthorized: false }
						: false,
				},
				pool: {
					min: env.int("DATABASE_POOL_MIN", 2),
					max: env.int("DATABASE_POOL_MAX", 10),
				},
				acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
			},
		};
	}
};
