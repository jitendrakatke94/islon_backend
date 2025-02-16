import express from "express";
import {login, registartion} from "../controller/login.js"
import { getEvents, addEvents, updateEvent, deleteEvent } from "../controller/events.js"
// import {addEvents} from ""
const router = express.Router();

router.route("/login").post(login);
router.route("/registration").post(registartion);

router.route("/events").get(getEvents);
router.route("/addEvent").post(addEvents);
router.route("/updateEvent/:id").put(updateEvent);
router.route("/deleteEvent/:id").delete(deleteEvent);

export default router;