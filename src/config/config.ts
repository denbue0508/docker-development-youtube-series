import * as dotenv from 'dotenv';
dotenv.config();

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',

  DB_DIALECT: process.env.DB_DIALECT || 'mongo',
  DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/parcelsdb',
  DB_NAME: process.env.DB_NAME || 'parcelsdb',
  DB_PASSWORD: process.env.DB_PASSWORD || 'db-password',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_USER: process.env.DB_USER || 'root',

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SECRET_TOKEN: process.env.ENV_SECRET,
  ENV_GET_KEY: process.env.ENV_GET_KEY,
  FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  SALT_STRING: process.env.SALT_STRING,
  APP_ID: process.env.APP_ID,
  BASE_URL: process.env.BASE_URL,
  GCASH_BASE_URL: process.env.GCASH_BASE_URL,
  GCASH_PAYMENT_URL: process.env.GCASH_PAYMENT_URL,
  GCASH_PAYMENT_INQUIRY_URL: process.env.GCASH_PAYMENT_INQUIRY_URL,
  REFERENCE_PARTNER_ID: process.env.REFERENCE_PARTNER_ID,
  REFERENCE_CLIENT_ID: process.env.REFERENCE_CLIENT_ID,
  REFERENCE_APP_ID: process.env.REFERENCE_APP_ID,
  REFERENCE_PRODUCT_CODE: process.env.REFERENCE_PRODUCT_CODE,
  GCASH_PRIVATE_KEY: process.env.GCASH_PRIVATE_KEY.replace(/\\n/g, '\n'),
  GCASH_REFUND_URL: process.env.GCASH_REFUND_URL,
  GCASH_INQUIRY_REFUND: process.env.GCASH_INQUIRY_REFUND
}