const { SERVICE_ISSUE_DETAIL_IMAGE_URL } = process.env;

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Question',
    {
      title: {
        type: DataTypes.TEXT,
      },
      question: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER(4),
      },
      files_uploading: {
        type: DataTypes.TEXT,
      },
      tmp_email: {
        type: DataTypes.STRING(200),
      },
      tmp_phone: {
        type: DataTypes.STRING(15),
      },
      adl1: {
        type: DataTypes.STRING(5),
      },
      adl2: {
        type: DataTypes.STRING(5),
      },
      adl3: {
        type: DataTypes.STRING(5),
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_issue_id: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'urs_questions',
      underscored: true,

      getterMethods: {
        images() {
          try {
            return JSON.parse(this.files_uploading) || []
          } catch (e) { }
          return [];
        },
        image_urls() {
          const images = this.images || [];
          return images.map(v => SERVICE_ISSUE_DETAIL_IMAGE_URL + '/' + v)
        }
      },

      setterMethods: {
        images(val) {
          try {
            this.setDataValue('files_uploading', JSON.stringify(val));
          } catch (e) { }
        }
      },
    }
  );


  Model.STATUS_PENDING = 1;
  Model.STATUS_APPROVED = 2;

  return Model;
};
