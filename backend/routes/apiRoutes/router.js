import express from "express"
import { predictStress } from "../../conrollers/stressController.js";

export const router = express.Router();
router.post("/predict", predictStress);
