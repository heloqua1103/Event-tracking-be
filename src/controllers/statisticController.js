import * as services from "../services";

export const eventByMonth = async (req, res) => {
  try {
    const response = await services.eventByMonth(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const byGenderOfEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await services.byGenderOfEvent(eventId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const byAgeOfEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await services.byAgeOfEvent(eventId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const byFaculty = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await services.byFaculty(eventId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const fivePeopleHot = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.fivePeopleHot(id, req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
export const fivePeopleHotSystem = async (req, res) => {
  try {
    const response = await services.fivePeopleHotSystem();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const totalRateOfAuthor = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.totalRateOfAuthor(id, req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const totalRateOfSystem = async (req, res) => {
  try {
    const response = await services.totalRateOfSystem(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const quantityByFaculty = async (req, res) => {
  try {
    const response = await services.quantityByFaculty();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const byTypeEvent = async (req, res) => {
  try {
    const response = await services.byTypeEvent(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const attendedEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await services.attendedEvent(eventId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const incrementUser = async (req, res) => {
  try {
    const response = await services.incrementUser(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const incrementEvent = async (req, res) => {
  try {
    const response = await services.incrementEvent(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
