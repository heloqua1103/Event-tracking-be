import { Op } from "sequelize";
import db from "../models";

export const postComment = (body, id, eventId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.create({
        userId: id,
        eventId: eventId,
        comment: body.comment,
      });
      resolve({
        success: response ? true : false,
        mess: response
          ? "Bình luận thành công"
          : "Đã xảy ra một lỗi gì đó vui lòng thử lại",
      });
    } catch (e) {
      reject(e);
    }
  });

export const updateComment = (body, userId, commentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.update(
        { comment: body.comment },
        {
          where: { [Op.and]: [{ userId: userId }, { id: commentId }] },
        }
      );
      resolve({
        success: response[0] > 0 ? true : false,
        mess:
          response[0] > 0
            ? "Cập nhật bình luận thành công"
            : "Đã xảy ra một lỗi gì đó vui lòng thử lại",
      });
    } catch (e) {
      reject(e);
    }
  });

export const deleteComment = (userId, commentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.destroy({
        where: { [Op.and]: [{ userId: userId }, { id: commentId }] },
      });
      if (response) {
        const destroy = await db.ResponseComment.destroy({
          where: { commentId: commentId },
        });
      }
      resolve({
        success: response ? true : false,
        mess: response
          ? "Xóa bình luận thành công"
          : "Đã xảy ra một lỗi gì đó vui lòng thử lại",
      });
    } catch (e) {
      reject(e);
    }
  });

export const responseComment = (body, id, commentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.ResponseComment.create({
        userId: id,
        response: body.response,
        commentId: commentId,
      });
      resolve({
        success: response ? true : false,
        mess: response
          ? "Bình luận thành công"
          : "Đã xảy ra một lỗi gì đó vui lòng thử lại",
      });
    } catch (e) {
      reject(e);
    }
  });
