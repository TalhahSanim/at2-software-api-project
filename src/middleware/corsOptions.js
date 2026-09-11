function parseOrigins() {
  try {
    if (process.env.CORS_ORIGIN) {
      return JSON.parse(process.env.CORS_ORIGIN);
    }
  } catch (_) {
    // CORS_ORIGIN was set but was not valid JSON
  }
  return [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ];
}

const corsOptions = {
  origin: parseOrigins(),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  exposedHeaders: ["x-auth-token"],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
