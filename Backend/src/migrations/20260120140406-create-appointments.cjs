"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      appointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      appointmentTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("BOOKED", "CONFIRMED", "CANCELLED", "COMPLETED"),
        defaultValue: "BOOKED",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      staffId: {
        type: Sequelize.UUID,
        references: {
          model: "Staff",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      serviceId: {
        type: Sequelize.UUID,
        references: {
          model: "Services",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Appointments");
  },
};
