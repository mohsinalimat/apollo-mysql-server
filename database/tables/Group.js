module.exports.createGroup = function (database, Sequelize) {
  database.define('Group', {
    objectId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chatId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ownerId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  });
}
