import db, { sequelize } from "../models";
import { Op, Sequelize } from "sequelize";
import moment from "moment";

export const eventByMonth = ({ year, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (year) {
        query.startDate = {
          [Op.between]: [moment(year), moment(year).endOf("year")],
        };
      }
      const data = await db.Event.findAll({
        where: query,
      });

      const response = [];
      const months = data.map((event) => {
        return Number(moment(event.dataValues.startDate).format("MM"));
      });
      for (let month = 1; month <= 12; month++) {
        const totalEvent = months.reduce(
          (count, i) => (i === month ? count + 1 : count),
          0
        );
        response.push({ month, totalEvent });
      }
      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const byGenderOfEvent = (eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListPeopleJoin.findAll({
        where: {
          [Op.and]: [{ eventId: eventId }, { isJoined: true }],
        },
        include: [
          {
            model: db.User,
            as: "userData",
          },
        ],
      });
      const response = [];

      const gender = data.reduce(
        (acc, item) => {
          if (item.dataValues.userData.gender) {
            acc.female += 1;
          } else {
            acc.male += 1;
          }
          return acc;
        },
        { female: 0, male: 0 }
      );
      response.push({
        gender: "Nữ",
        count: gender.female,
      });
      response.push({
        gender: "Nam",
        count: gender.male,
      });
      resolve({
        success: data ? true : false,
        mess: data ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const byAgeOfEvent = (eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListPeopleJoin.findAll({
        where: {
          [Op.and]: [{ eventId: eventId }, { isJoined: true }],
        },
        include: [
          {
            model: db.User,
            as: "userData",
          },
        ],
      });

      const ages = data.map((item) => {
        return Number(
          moment(item.dataValues.userData.birthDate).fromNow().slice(0, 2)
        );
      });

      resolve({
        success: data ? true : false,
        mess: data ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const byFaculty = (eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListPeopleJoin.findAll({
        where: { eventId: eventId, isJoined: true },
        include: {
          model: db.User,
          as: "userData",
          attributes: ["facultyCode"],
        },
      });
      const response = [];
      const faculties = data.map((event) => {
        return event.dataValues.userData.facultyCode;
      });
      for (let code = 1; code <= 5; code++) {
        const totalFaculty = faculties.reduce(
          (count, i) => (i === code ? count + 1 : count),
          0
        );
        response.push({ code, totalFaculty });
      }
      resolve({
        success: data ? true : false,
        mess: data ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const fivePeopleHot = (authorId, { ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalEvent = await db.Event.findAll({
        where: { authorId: authorId },
        attributes: ["id"],
      });
      const Ids = totalEvent.map((item) => {
        return item.dataValues.id;
      });
      const response = await db.ListPeopleJoin.findAll({
        attributes: [
          "userId",
          [sequelize.fn("COUNT", sequelize.col("eventId")), "eventCount"],
        ],
        where: {
          eventId: {
            [Op.in]: Ids,
          },
          isJoined: true,
        },
        limit: 5,
        group: ["userId"],
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: {
              exclude: [
                "password",
                "username",
                "roleId",
                "refresh_token",
                "fileName",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.Student,
                as: "studentData",
                attributes: ["point"],
              },
            ],
          },
        ],
      });

      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const fivePeopleHotSystem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.ListPeopleJoin.findAll({
        attributes: [
          "userId",
          [sequelize.fn("COUNT", sequelize.col("eventId")), "eventCount"],
        ],
        where: {
          isJoined: true,
        },
        order: [[sequelize.col("eventCount"), "DESC"]],
        limit: 5,
        group: ["userId"],
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: {
              exclude: [
                "password",
                "username",
                "roleId",
                "refresh_token",
                "fileName",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.Student,
                as: "studentData",
                attributes: ["point"],
              },
            ],
          },
        ],
      });

      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const totalRateOfAuthor = (authorId, { month, year, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (year) {
        query.startDate = {
          [Op.between]: [moment(year), moment(year).endOf("year")],
        };
      }
      const data = await db.Event.findAll({
        where: { authorId: authorId, ...query },
      });
      const rates = data.map((item) => {
        return item.dataValues.totalRate;
      });
      console.log(rates);
      const response = [];
      for (let rate = 1; rate <= 5; rate++) {
        const totalRate = rates.reduce(
          (count, i) => (Math.round(i) === rate ? count + 1 : count),
          0
        );
        response.push({ rate, totalRate });
      }

      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Not",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const quantityByFaculty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        attributes: ["facultyCode"],
      });
      const dataUser = data.map((data) => {
        return data.dataValues.facultyCode;
      });
      const faculty = await db.Faculty.findAll({
        attributes: ["id"],
      });
      const idsFaculty = faculty.map((item) => {
        return item.dataValues.id;
      });
      const response = [];
      idsFaculty.forEach((id) => {
        const totalFaculty = dataUser.reduce(
          (count, i) => (i === id ? count + 1 : count),
          0
        );
        response.push({ id, totalFaculty });
      });

      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Not",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const byTypeEvent = ({ month, year, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (month) {
        const data = await db.Event.findAll();
        const ids = [];
        data.forEach((event) => {
          if (
            moment(event.dataValues.startDate).format("YYYY-MM") <=
              moment(month).format("YYYY-MM") &&
            moment(event.dataValues.finishDate).format("YYYY-MM") >=
              moment(month).format("YYYY-MM")
          ) {
            ids.push(event.dataValues.id);
          }
        });
        query.id = { [Op.in]: ids };
      }
      if (year) {
        const data = await db.Event.findAll();
        const ids = [];
        data.forEach((event) => {
          if (
            moment(event.dataValues.startDate).format("YYYY") <=
              moment(year).format("YYYY") &&
            moment(event.dataValues.finishDate).format("YYYY") >=
              moment(year).format("YYYY")
          ) {
            ids.push(event.dataValues.id);
          }
        });
        query.id = { [Op.in]: ids };
      }
      const data = await db.Event.findAll({
        where: query,
        attributes: ["typeEvent"],
      });
      const typeEvent = data.map((data) => {
        return data.dataValues.typeEvent;
      });
      const response = [];
      const countOnline = typeEvent.reduce(
        (count, i) => (i === true ? count + 1 : count),
        0
      );
      const countOffline = typeEvent.reduce(
        (count, i) => (i === false ? count + 1 : count),
        0
      );
      response.push({ typeEvent: "Online", countOnline });
      response.push({ typeEvent: "Offline", countOffline });
      resolve({
        success: data ? true : false,
        mess: data ? "Get data successfull" : "Đã có lỗi gì đó xảy ra",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const attendedEvent = (eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ListPeopleJoin.findAll({
        where: { eventId: eventId },
        attributes: ["isJoined"],
      });
      const data1 = await db.ListEventFollow.findAndCountAll({
        where: { eventId: eventId },
      });
      const response = [];
      const countJoined = data.reduce(
        (count, i) => (i.dataValues.isJoined === true ? count + 1 : count),
        0
      );
      const countNotJoined = data.reduce(
        (count, i) => (i.dataValues.isJoined === false ? count + 1 : count),
        0
      );
      response.push({ typeAttended: "Joined", count: countJoined });
      response.push({ typeAttended: "Not Join", count: countNotJoined });
      response.push({ typeAttended: "Followed", count: data1.count });

      resolve({
        success: response ? true : false,
        mess: response ? "Get data successfull" : "Not",
        response: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const incrementUser = ({ month, year, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (month) {
        const response = await db.User.findAll({
          attributes: [
            [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
            [Sequelize.fn("COUNT", Sequelize.col("*")), "userCount"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURDATE() - INTERVAL 1 YEAR"), // Lấy dữ liệu trong vòng 1 năm gần đây
            },
          },
          group: ["month"],
          raw: true,
        });
        resolve({
          success: response ? true : false,
          mess: response ? "Get data successfull" : "Not",
          response: response,
        });
      } else if (year) {
        const response = await db.User.findAll({
          attributes: [
            [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "year"],
            [Sequelize.fn("COUNT", Sequelize.col("*")), "userCount"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURDATE() - INTERVAL 1 YEAR"),
            },
          },
          group: ["year"],
          raw: true,
        });
        resolve({
          success: response ? true : false,
          mess: response ? "Get data successfull" : "Not",
          response: response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const incrementEvent = ({ month, year, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (month) {
        const response = await db.Event.findAll({
          attributes: [
            [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
            [Sequelize.fn("COUNT", Sequelize.col("*")), "eventCount"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURDATE() - INTERVAL 1 YEAR"), // Lấy dữ liệu trong vòng 1 năm gần đây
            },
          },
          group: ["month"],
          raw: true,
        });
        resolve({
          success: response ? true : false,
          mess: response ? "Get data successfull" : "Not",
          response: response,
        });
      } else if (year) {
        const response = await db.Event.findAll({
          attributes: [
            [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "year"],
            [Sequelize.fn("COUNT", Sequelize.col("*")), "eventCount"],
          ],
          where: {
            createdAt: {
              [Op.gte]: Sequelize.literal("CURDATE() - INTERVAL 1 YEAR"),
            },
          },
          group: ["year"],
          raw: true,
        });
        resolve({
          success: response ? true : false,
          mess: response ? "Get data successfull" : "Not",
          response: response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
