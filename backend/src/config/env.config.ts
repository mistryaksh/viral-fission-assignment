import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const validate = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGO_DB: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  R2_BUCKET: z.string(),
  R2_ENDPOINT: z.string(),
  R2_PUBLIC_URL: z.string(),
});

export const config = validate.parse(process.env, {
  error: (err) => {
    console.error("missing env variable", err.path);
    process.exit(1);
  },
});
