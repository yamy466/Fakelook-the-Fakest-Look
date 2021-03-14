module.exports = (sequelize, type) => {
    return sequelize.define(
      "tag",
      {
        // Model attributes are defined here
        tag: {
          type: type.TEXT,
          primaryKey: true,
          allowNull: false,
        }
      },
      {
        tableName: "Tags",
        timestamps: false,
        freezeTableName: true
      }
    );
  };