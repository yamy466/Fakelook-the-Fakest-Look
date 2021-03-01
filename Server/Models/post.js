module.exports = (sequelize, type) => {
  return sequelize.define("post", {
    // Model attributes are defined here
    id: {
      type: type.SMALLINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    Text: {
      type: type.STRING,
      allowNull: true,
    },
  });
};
