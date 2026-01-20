"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("PENDING", "SUCCESS", "FAILED"),
        defaultValue: "PENDING",
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      appointmentId: {
        type: Sequelize.UUID,
        references: {
          model: "Appointments",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Payments");
  },
};
