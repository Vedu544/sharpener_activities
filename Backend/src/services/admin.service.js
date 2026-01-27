import { models as db } from "../models/index.js";
const { User, Appointment, Service, Review } = db;

// Get all users
export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

// Change user role (user ↔ staff ↔ admin)
export const updateUserRole = async (userId, role) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.role = role;
  await user.save();

  return user;
};

// Get all appointments (admin overview)
export const getAllAppointments = async () => {
  return await Appointment.findAll({
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Service, attributes: ["id", "name", "price"] },
    ],
  });
};

// Get all reviews
export const getAllReviews = async () => {
  return await Review.findAll({
    include: [
      { model: User, attributes: ["id", "name"] },
      { model: Service, attributes: ["id", "name"] },
    ],
  });
};

// Dashboard stats
export const getDashboardStats = async () => {
  const users = await User.count();
  const appointments = await Appointment.count();
  const services = await Service.count();
  const reviews = await Review.count();

  return {
    users,
    appointments,
    services,
    reviews,
  };
};
