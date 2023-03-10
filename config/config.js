const Joi = require('joi');

// require('dotenv').config();
require('custom-env').env(process.env.NODE_ENV);

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'staging', 'production'])
    .default('development'),
  RUN_LOCAL: Joi.string().optional().default('no'),
  UNIT_TESTING: Joi.string().optional().default('no'),
  HASH_SECRET_KEY: Joi.string().required(),
  PUBLICKEY_RSA: Joi.string().required(),
  PRIVATEKEY_RSA: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  appName: 'Ruby Bank API',
  env: envVars.NODE_ENV,
  port: 3000,
  runLocal: envVars.RUN_LOCAL === 'yes',
  testing: envVars.UNIT_TESTING === 'yes',
  appWelcome: envVars.APP_WELCOME,
  appUrl: envVars.APP_URL,
  hashSecretKey: envVars.HASH_SECRET_KEY,
  privateKey: envVars.PRIVATEKEY_RSA,
  publicKey: envVars.PUBLICKEY_RSA,
  token: {
    key: 'Authorization',
    type: 'Bearer',
  },
  database: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mssql',
  },
  sql: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    port: 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
  sendGmail: {
    user: 'chitrung0895@gmail.com',
    pass: 'Des123456@',
  },
};

module.exports = config;
