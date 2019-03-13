module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Answer',
    {
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answerer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER(4),
      },
      // created_by: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'urs_answers',
      underscored: true,
    }
  );

  Model.STATUS_NOT_ANSWERED = 0;
  Model.STATUS_ANSWERED = 1;
  Model.STATUS_INACTIVE = 2;

  return Model;
};
