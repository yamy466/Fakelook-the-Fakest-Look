module.exports = (sequelize, type) => {
    return sequelize.define(
      "token",
      {
        // Model attributes are defined here
        token: {
          type: type.TEXT,
          primaryKey: true,
          allowNull: false,
        }
      },
      {
        tableName: "Tokens",
        timestamps: false,
        freezeTableName: true
      }
    );
  };
  