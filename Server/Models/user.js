module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      // Model attributes are defined here
      id: {
        type: type.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      username: {
        type: type.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
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
        unique: true,
        primaryKey: true,
      },
      friends: {
        type: type.ARRAY(type.INTEGER),
        allowNull: true,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
      requests: {
        type: type.ARRAY(type.INTEGER),
        allowNull: true,
      },
    },
    {
      tableName: "Users",
      timestamps: false,
      freezeTableName: true,
    }
  );
};
