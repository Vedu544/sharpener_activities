import "dotenv/config";   // ✅ MUST be first
import express from "express";
import cors from "cors";
import cricketerRoutes from "./routes/cricketer.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", cricketerRoutes);

app.get("/test", (req, res) => {
  res.send("API is working ✅");
});

app.listen(process.env.PORT, () => {
  console.log("PORT =", process.env.PORT);
  console.log("DB_USER =", process.env.DB_USER);
  console.log("✅ Server running on port " + process.env.PORT);
});
