import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "./.env") });

export const PORT = process.env.PORT || 8080;
