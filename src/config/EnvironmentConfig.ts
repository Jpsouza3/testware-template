import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env = process.env.ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${env}`);

if (!fs.existsSync(envPath)) {
  throw new Error(
    `Environment file not found: ${envPath}\n` +
    `Make sure the file ".env.${env}" exists in the project root.`
  );
}

const result = dotenv.config({ path: envPath, quiet: true });

if (result.error) {
  throw result.error;
}

export const config = {
  baseUrl: process.env.BASE_URL!,
  testUserEmail: process.env.TEST_USER_EMAIL!,
  testUserPassword: process.env.TEST_USER_PASSWORD!,
};