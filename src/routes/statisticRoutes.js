import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isCreator } from "../middlewares/verify_roles";

const router = express.Router();

router.use(verifyToken);
router.get("/", isAdmin, controllers.eventByMonth);
router.get("/by-type-event", isAdmin, controllers.byTypeEvent);
router.get("/by-faculty", isAdmin, controllers.quantityByFaculty);
router.get("/increment-user", isAdmin, controllers.incrementUser);
router.get("/increment-event", isAdmin, controllers.incrementEvent);
router.get("/by-faculty/:eventId", isAdmin, controllers.byFaculty);
router.get("/by-gender/:eventId", isCreator, controllers.byGenderOfEvent);
router.get("/by-attended/:eventId", isCreator, controllers.attendedEvent);
router.get("/by-age/:eventId", isCreator, controllers.byAgeOfEvent);
router.get("/5-people-hot", isCreator, controllers.fivePeopleHot);
router.get("/total-rate-author", isCreator, controllers.totalRateOfAuthor);

module.exports = router;
