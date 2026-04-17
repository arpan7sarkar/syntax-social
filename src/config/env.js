require("dotenv").config();

const normalizeNodeEnv = (value) => {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized === "production") return "production";
  return "development";
};

const NODE_ENV = normalizeNodeEnv(process.env.NODE_ENV);
const isProduction = NODE_ENV === "production";

const frontendUrl = (
  (isProduction ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL_DEV) ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
).replace(/\/+$/, "");

const parsedDevPort = Number(process.env.DEV_PORT);
const parsedRuntimePort = Number(process.env.PORT);
const port = isProduction
  ? (Number.isFinite(parsedRuntimePort) && parsedRuntimePort > 0 ? parsedRuntimePort : 7777)
  : (Number.isFinite(parsedDevPort) && parsedDevPort > 0 ? parsedDevPort : 3001);

if (!process.env.MONGO_URL) {
  throw new Error("Missing required env: MONGO_URL");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Missing required env: JWT_SECRET");
}

module.exports = {
  env: {
    nodeEnv: NODE_ENV,
    isProduction,
    port,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    frontendUrl,
  },
};
