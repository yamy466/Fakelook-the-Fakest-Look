module.exports = (connection, sequelize) => {
  return connection.define(
    "post",
    {
      // Model attributes are defined here
      id: {
        type: sequelize.SMALLINT,
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
        allowNull: true,
      },
    },
    {
      tableName: "Posts",
      timestamps: false,
    }
  );
};
