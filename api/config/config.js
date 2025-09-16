import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),

    // Database Configuration
    DB_HOST: Joi.string().required().description("Database host"),
    DB_USER: Joi.string().required().description("Database user"),
    DB_PASSWORD: Joi.string()
      .allow("")
      .required()
      .description("Database password"),
    DB_NAME: Joi.string().required().description("Database name"),
    DB_DIALECT: Joi.string()
      .default("postgres")
      .description("Database dialect"),

    JWT_SECRET: Joi.string()
      .required()
      .description("JWT secret key for signing tokens"),
    JWT_EXPIRES_IN: Joi.string()
      .default("1d")
      .description("JWT expiration time"),

    AES_SECRET_KEY: Joi.string()
      .length(32)
      .required()
      .description("32-character AES secret for data encryption"),
  })
  .unknown(); // Allows other environment variables not defined in the schema

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    name: envVars.DB_NAME,
    dialect: envVars.DB_DIALECT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  encryption: {
    secretKey: envVars.AES_SECRET_KEY,
  },
};

export default config;
