import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { sequelize } from "./config/db.js";

const PORT = process.env.PORT || 8000;

await sequelize.sync({ alter: true });
console.log("✅ Models synced");

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
})();
