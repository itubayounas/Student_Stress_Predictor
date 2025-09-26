import express from "express";
import { predictStress } from "../../conrollers/stressController.js";

export const router = express.Router();

// POST: /api/predict
router.post("/predict", predictStress);
