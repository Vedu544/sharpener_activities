import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      defaultValue: "PENDING",
    },
    transactionId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

export default Payment;
