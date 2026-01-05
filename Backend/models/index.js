// src/models/index.js
import sequelize from "../config/db.js";

import User from "./user.model.js";
import Expense from "./expense.model.js";
import ForgotPasswordRequest from "./forgotPasswordRequest.model.js";

/* =========================
   Model Associations
========================= */

// User ↔ Expense
User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsTo(User, {
  foreignKey: "userId",
});

// User ↔ Forgot Password Requests
User.hasMany(ForgotPasswordRequest, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
ForgotPasswordRequest.belongsTo(User, {
  foreignKey: "userId",
});

export {
  sequelize,
  User,
  Expense,
  ForgotPasswordRequest,
};
