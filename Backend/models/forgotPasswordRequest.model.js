// src/models/forgotPassword.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ForgotPasswordRequest = sequelize.define(
  "ForgotPasswordRequest",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "forgot_password_requests",
    indexes: [
      { fields: ["userId"] },
      { fields: ["isActive"] },
    ],
  }
);

export default ForgotPasswordRequest;
