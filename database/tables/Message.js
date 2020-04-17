module.exports.createMessage = function (database, Sequelize) {
  database.define('Message', {
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
    userFullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userInitials: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userPictureAt: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photoWidth: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    photoHeight: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    videoDuration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    audioDuration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    audioDuration: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    isMediaQueued: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    isMediaFailed: {
      type: Sequelize.BOOLEAN,
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
