module.exports.createBlocked = function (database, Sequelize) {
  database.define('Blocked', {
    objectId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    blockerId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    blockedId: {
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
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
}