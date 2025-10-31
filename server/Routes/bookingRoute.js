import express from "express";
import { createBooking } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

export default router;
