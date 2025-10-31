import express from "express";
import { Promo } from "../Controllers/promoController.js";

const router = express.Router();

router.post("/validate", Promo);

export default router;