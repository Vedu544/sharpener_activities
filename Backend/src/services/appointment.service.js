import Appointment from "../models/Appointment.js";

/**
 * Book an appointment
 */
export const bookAppointment = async (userId, data) => {
  const { serviceId, staffId, appointmentDate, appointmentTime, serviceName } = data;

  // You can add checks here if staff/service exists or available
  const appointment = await Appointment.create({
    userId,
    serviceName,
    serviceId,
    staffId,
    appointmentDate,
    appointmentTime,
  });

  return appointment;
};

/**
 * Reschedule appointment
 */
export const rescheduleAppointment = async (appointmentId, data) => {
  console.log(data, "data");
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) throw new Error("Appointment not found");

  appointment.appointmentDate = data.appointmentDate;
  appointment.appointmentTime = data.appointmentTime;

  await appointment.save();
  return appointment;
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (appointmentId) => {
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) throw new Error("Appointment not found");

  await appointment.destroy();
  return appointment;
};

/**
 * Get appointments for a user
 */
export const getUserAppointments = async (userId) => {
  return await Appointment.findAll({ where: { userId } });
};
