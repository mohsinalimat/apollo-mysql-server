module.exports.createMember = function (database, Sequelize) {
  database.define('Member', {
    objectId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chatId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  })
}