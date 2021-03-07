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
      groups: {
        type: type.ARRAY(type.BIGINT),
        allowNull: true,
      },
      posts: {
        type: type.ARRAY(type.BIGINT),
        allowNull: true,
      },
      comments: {
        type: type.ARRAY(type.BIGINT),
        allowNull: true,
      },
      likes: {
        type: type.ARRAY(type.BIGINT),
        allowNull: true,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Users",
      timestamps: false,
      freezeTableName: true,
    }
  );
};
