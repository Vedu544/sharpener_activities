import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // ✅ ADDED
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
    defaultValue: "PENDING",
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

export default Order;
