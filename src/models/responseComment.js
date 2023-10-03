"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResponseComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResponseComment.init(
    {
      userId: DataTypes.STRING,
      eventId: DataTypes.STRING,
      response: DataTypes.STRING,
      commentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ResponseComment",
    }
  );
  return ResponseComment;
};
