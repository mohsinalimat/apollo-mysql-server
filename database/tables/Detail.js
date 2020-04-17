module.exports.createDetail = function (database, Sequelize) {
  database.define('Detail', {
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
    typing: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    lastRead: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    mutedUntil: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    isArchived: {
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

