// Load env first so MONGODB_URI etc. are set before app (and connectDB) run
import dotenv from "dotenv";
import "./lib/env";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
