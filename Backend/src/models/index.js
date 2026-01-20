import { sequelize } from "../config/db.js";
import User from "./User.js";
import Staff from "./Staff.js";
import Service from "./Service.js";
import Appointment from "./Appointment.js";
import Payment from "./Payment.js";
import Review from "./Review.js";

/* ===============================
   Model Associations
================================ */

// User → Appointments
User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

// Staff → Appointments
Staff.hasMany(Appointment, { foreignKey: "staffId" });
Appointment.belongsTo(Staff, { foreignKey: "staffId" });

// Service → Appointments
Service.hasMany(Appointment, { foreignKey: "serviceId" });
Appointment.belongsTo(Service, { foreignKey: "serviceId" });

// Appointment → Payment
Appointment.hasOne(Payment, { foreignKey: "appointmentId" });
Payment.belongsTo(Appointment, { foreignKey: "appointmentId" });

// User → Reviews
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

// Staff → Reviews
Staff.hasMany(Review, { foreignKey: "staffId" });
Review.belongsTo(Staff, { foreignKey: "staffId" });

// Service → Reviews
Service.hasMany(Review, { foreignKey: "serviceId" });
Review.belongsTo(Service, { foreignKey: "serviceId" });

export const models = {
  sequelize,
  User,
  Staff,
  Service,
  Appointment,
  Payment,
  Review,
};
