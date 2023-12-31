"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        targetKey: "id",
        as: "roleData",
      });
      User.belongsTo(models.Student, {
        foreignKey: "id",
        targetKey: "studentId",
        as: "studentData",
      });
      User.belongsTo(models.Faculty, {
        foreignKey: "facultyCode",
        targetKey: "id",
        as: "facultyData",
      });
      // User.hasOne(models.ListEventFollow, {
      //   foreignKey: "userId",
      //   as: "followerData",
      // });
      User.hasMany(models.Event, {
        foreignKey: "authorId",
        as: "eventData",
      });
      User.belongsToMany(models.Event, {
        through: "ListEventFollow",
        as: "eventFollowed",
      });
      // User.belongsToMany(models.Comment, {
      //   through: "ResponseComment",
      // });
      User.belongsToMany(models.Event, {
        through: "ListPeopleJoin",
      });
      User.belongsToMany(models.Event, {
        through: "Feedback",
      });
      User.hasMany(models.ListEventFollow, {
        foreignKey: "userId",
        as: "followData",
      });
      User.belongsTo(models.ResponseComment, {
        foreignKey: "id",
        targetKey: "commentId",
        as: "responseData",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      gender: DataTypes.BOOLEAN,
      birthDate: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      facultyCode: DataTypes.INTEGER,
      refresh_token: DataTypes.STRING,
      fileName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
