import bcrypt from "bcryptjs";
import { models as db } from "./src/models/index.js"

async function seedAdmin() {
  const hashed = await bcrypt.hash("Admin123!", 10);

  const [admin, created] = await db.User.findOrCreate({
    where: { email: "admin@example.com" },
    defaults: {
      name: "Admin",
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log(admin.get());
}

seedAdmin();
