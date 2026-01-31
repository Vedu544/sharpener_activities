import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Unknown Service", // ← Add default
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "BOOKED",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED"
      ),
      defaultValue: "BOOKED",
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  }
);

export default Appointment;
