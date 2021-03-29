module.exports = (connection, sequelize) => {
  return connection.define(
    "comment",
    {
      id: {
        type: sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      writer: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: sequelize.DATE,
        allowNull: false,
      },
      likes: {
        type: sequelize.ARRAY(sequelize.INTEGER),
        allowNull: true,
      },
      postId: {
        type: sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "Comments",
      timestamps: false,
    }
  );
};
