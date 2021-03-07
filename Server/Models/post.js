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
      postedTime: {
        type: sequelize.DATE,
        allowNull: false,
      },
      likes: {
        type: sequelize.ARRAY(sequelize.TEXT),
        allowNull: true,
      },
      tags: {
        type: sequelize.ARRAY(sequelize.TEXT),
        allowNull: true,
      },
      taggedUsers: {
        type: sequelize.ARRAY(sequelize.TEXT),
        allowNull: true,
      },
    },
    {
      tableName: "Posts",
      timestamps: false,
    }
  );
};
