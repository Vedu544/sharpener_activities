import Service from "../models/Service.js";

// Create service
export const createService = async (data) => {
  return await Service.create(data);
};

// Update service
export const updateService = async (id, data) => {
  const [updatedRows, [updatedService]] = await Service.update(data, {
    where: { id },
    returning: true, // returns the updated row
  });

  if (!updatedService) {
    throw new Error("Service not found");
  }

  return updatedService;
};

// Delete service
export const deleteService = async (id) => {
  const deleted = await Service.destroy({ where: { id } });
  if (!deleted) {
    throw new Error("Service not found");
  }
  return { message: "Service deleted successfully" };
};

// Get all services
export const getAllServices = async () => {
  return await Service.findAll(); // <-- Sequelize method
};
