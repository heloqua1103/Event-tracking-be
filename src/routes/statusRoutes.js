import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);
router.put("/:eventId", controllers.updateStatusEvent);

module.exports = router;
