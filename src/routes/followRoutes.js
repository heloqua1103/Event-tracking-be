import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

// hiển thị danh sách follow theo userId
router.get("/get-follow/:eventId", controllers.getAllFollower);

router.use(verifyToken);
router.post("/:eventId", controllers.followEvent);

module.exports = router;
