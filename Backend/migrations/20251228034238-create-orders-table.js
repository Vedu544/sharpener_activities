export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Orders', {  // ✅ Capital 'O' to match model
    id: {
      type: Sequelize.UUID,  // ✅ Changed to UUID with UUIDV4
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    orderId: {
      type: Sequelize.STRING,  // ✅ Changed from UUID to STRING
      allowNull: false,
      unique: true  // Keep unique constraint
    },
    userId: {
      type: Sequelize.UUID,  // ✅ Correct - matches your model
      allowNull: false,
      references: {
        model: 'users',  // ✅ Capital 'U' to match Sequelize default
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    paymentId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('PENDING', 'SUCCESS', 'FAILED'),
      defaultValue: 'PENDING',
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Orders');
}