module.exports.createSingle = function (database, Sequelize) {
  database.define('Single', {
    objectId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chatId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullname1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    initials1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pictureAt1: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    userId2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullname2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    initials2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pictureAt2: {
      type: Sequelize.BIGINT,
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
