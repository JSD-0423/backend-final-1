/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_TEST_URL,
  DATABASE_URL,
  PORT,
  NODE_ENV,
  SECRET_KEY,
  ORIGIN,
  PASSWORD_PATTERN,
} = process.env;
const config = {
  database: {
    uri: NODE_ENV === "production" ? `${DATABASE_URL}` : `${DATABASE_TEST_URL}`,
  },
  password: {
    pattern: PASSWORD_PATTERN ? PASSWORD_PATTERN : "",
  },
  port: PORT ? PORT : 4000,
  nodeEnv: NODE_ENV ? NODE_ENV : "development",
  jwt: {
    secretKey: SECRET_KEY ? SECRET_KEY : "",
  },
  client: {
    origin: ORIGIN ? ORIGIN : "http://localhost:3000",
  },
  ssl:
    NODE_ENV === "production"
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
};

export default config;
