import joi from "joi";
import * as services from "../services";

export const postComment = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.postComment(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.updateComment(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.deleteComment(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
