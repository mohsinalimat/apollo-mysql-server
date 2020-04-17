module.exports.createPerson = function (database, Sequelize) {
  database.define('Person', {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pictureAt: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Available'
    },
    keepMedia: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    networkPhoto: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    networkVideo: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    networkAudio: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wallpaper: {
      type: Sequelize.STRING,
      allowNull: false
    },
    loginMethod: {
      type: Sequelize.STRING,
      allowNull: false
    },
    oneSignalId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastActive: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    lastTerminate: {
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