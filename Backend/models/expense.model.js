// src/models/expense.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Expense = sequelize.define(
  "Expense",
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

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
    indexes: [
      { fields: ["userId"] },
      { fields: ["createdAt"] },
    ],
  }
);

export default Expense;
