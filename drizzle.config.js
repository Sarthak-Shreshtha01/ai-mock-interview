import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_InA2HYPf0NyD@ep-autumn-pond-a539jg30-pooler.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require",
  }
})