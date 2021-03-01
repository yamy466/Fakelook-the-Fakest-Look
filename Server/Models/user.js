module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      // Model attributes are defined here
      id: {
        type: type.SMALLINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      firstName: {
        type: type.STRING,
        allowNull: false,
      },

      lastName: {
        type: type.STRING,
        allowNull: false,
      },

      email: {
        type: type.STRING,
        allowNull: false,
      },

      createDate: {
        type: type.TIME,
      },

      modifiedOn: {
        type: type.TIME,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );
};
