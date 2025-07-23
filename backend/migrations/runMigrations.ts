import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

const mongoUrl =
  process.env.DATABASE_URL || "mongodb://localhost:27017/fantasy";

async function runMigrations() {
  await mongoose.connect(mongoUrl);
  const files = fs
    .readdirSync(__dirname)
    .filter((f) => f.endsWith(".ts") && f !== "runMigrations.ts");
  for (const file of files) {
    const migration = await import(path.join(__dirname, file));
    if (typeof migration.default === "function") {
      console.log(`Running migration: ${file}`);
      await migration.default();
    }
  }
  await mongoose.disconnect();
  console.log("All migrations complete.");
}

runMigrations().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
