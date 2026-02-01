import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "..");

// Load .env first, then "env" (so both .env and env file work)
dotenv.config({ path: path.join(root, ".env") });
dotenv.config({ path: path.join(root, "env"), override: false });
