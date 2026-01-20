import cron from "node-cron";
import { sendEmail } from "./email.service.js";
import db from "../models/index.js";

/**
 * Schedule appointment reminder emails
 * Runs every day at 8 AM
 */
export const scheduleAppointmentReminders = () => {
  cron.schedule("0 8 * * *", async () => {
    console.log("Running daily appointment reminder cron...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await db.Appointment.findAll({
      where: {
        appointmentDate: tomorrow.toISOString().split("T")[0],
        status: "BOOKED",
      },
      include: [{ model: db.User, attributes: ["email", "name"] }],
    });

    for (let appt of appointments) {
      const { email, name } = appt.User;
      await sendEmail(
        email,
        "Appointment Reminder",
        `Hi ${name}, this is a reminder for your appointment on ${appt.appointmentDate} at ${appt.appointmentTime}.`
      );
    }
  });
};
