import db, { sequelize } from "../models";
import { Op } from "sequelize";

export const createFeedback = (eventId, userId, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEvent = await db.Event.findOne({
        where: { [Op.and]: [{ id: eventId }, { status: 4 }] },
      });
      const checkUser = await db.ListPeopleJoin.findOne({
        where: {
          [Op.and]: [
            { eventId: eventId },
            { userId: userId },
            { isJoined: true },
          ],
        },
      });
      if (checkEvent && checkUser) {
        const response = await db.Feedback.create({
          UserId: userId,
          EventId: eventId,
          rate: body.rate,
          feedback: body.feedback,
        });
        updateTotalRate(eventId);
        resolve({
          success: response ? true : false,
          mess: response ? "Đánh giá thành công" : "Đã có lỗi gì đó xảy ra",
          response: response,
        });
      } else {
        resolve({
          success: false,
          mess: "Bạn không thể đánh giá sự kiện này",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateFeedback = (eventId, userId, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkFeedback = db.Feedback.findOne({
        where: { [Op.and]: [{ UserId: userId }, { EventId: eventId }] },
      });
      if (checkFeedback) {
        const response = await db.Feedback.update(
          {
            rate: body.rate,
            feedback: body.feedback,
          },
          { where: { [Op.and]: [{ UserId: userId }, { EventId: eventId }] } }
        );
        updateTotalRate(eventId);
        resolve({
          success: response[0] > 0 ? true : false,
          mess:
            response[0] > 0 ? "Cập nhật thành công" : "Có lỗi gì đó đã xảy ra",
        });
      } else {
        resolve({
          success: false,
          mess: "Bạn không thể cập nhật đánh giá này",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateTotalRate = async (eventId) => {
  try {
    const rates = await db.Feedback.findAndCountAll({
      where: { eventId: eventId },
    });
    const totalRate = rates.rows.reduce(
      (accumulator, currentValue) => accumulator + currentValue.dataValues.rate,
      0
    );
    const avgRate = Number((totalRate / rates.count).toFixed(2));
    await db.Event.update({ totalRate: avgRate }, { where: { id: eventId } });
  } catch (error) {
    console.log(error);
  }
};
