import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "staff",
    timestamps: true,
  }
);

export default Staff;
