'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostModel = sequelize.define('PostModel', {
    textField: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {});
  return PostModel;
};
