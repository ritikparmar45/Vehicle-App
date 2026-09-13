import dotenv from 'dotenv';

dotenv.config();

/**
 * Validates critical environment variables at application startup.
 * Fails fast with clear error message if required keys are missing.
 */
export const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ CRITICAL: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  return {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER || '',
    EMAIL_PASS: process.env.EMAIL_PASS || '',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };
};

export const env = validateEnv();
