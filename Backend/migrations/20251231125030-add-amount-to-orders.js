export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Orders", "amount", {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0, // safe for existing rows
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Orders", "amount");
}
