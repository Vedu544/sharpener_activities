import Staff from "../models/Staff.js";
import Service from "../models/Service.js";

// Create staff
export const createStaff = async (data) => {
  return await Staff.create(data);
};

// Get all staff
export const getAllStaff = async () => {
  return await Staff.findAll({
    include: Service, // optional: shows assigned services
  });
};

// Assign services to staff
export const assignServicesToStaff = async (staffId, serviceIds) => {
  const staff = await Staff.findOne({ where: { id: staffId } });
  if (!staff) {
    throw new Error("Staff not found");
  }

  const services = await Service.findAll({
    where: { id: serviceIds },
  });

  if (!services.length) {
    throw new Error("Services not found");
  }

  // Sequelize magic method (auto-created by belongsToMany)
  await staff.setServices(services);

  return await Staff.findOne({
    where: { id: staffId },
    include: Service,
  });
};
