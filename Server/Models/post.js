module.exports = (sequelize, type) => {
  return sequelize.define(
    "post",
    {
      // Model attributes are defined here
      id: {
        type: type.SMALLINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      text: {
        type: type.TEXT,
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
