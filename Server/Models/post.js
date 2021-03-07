module.exports = (connection, sequelize) => {
  return connection.define(
    "post",
    {
      // Model attributes are defined here
      id: {
        type: sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text: {
        type: sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: `Point`,
        allowNull: false,
      },
      publisher: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      tags: {
        type: type.ARRAY(type.TEXT),
        allowNull: true,
      },
      taggedUsers: {
        type: type.ARRAY(type.TEXT),
        allowNull: true,
      },
      likes: {
        type: type.ARRAY(type.TEXT),
        allowNull: true,
      },
    },
    {
      tableName: "Posts",
      timestamps: false,
    }
  );
};
