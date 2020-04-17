module.exports.createFriend = function (database, Sequelize) {
  database.define('Friend', {
    objectId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    friendId: {
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
      type: Sequelize.BIGINT,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  });
}