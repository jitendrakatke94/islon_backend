import express from "express";
import {login, registartion} from "../controller/login.js"
import { getEvents } from "../controller/events.js"
// import {addEvents} from ""
const router = express.Router();

router.route("/login").post(login);
router.route("/registration").post(registartion);

router.route("/events").get(getEvents);

export default router;