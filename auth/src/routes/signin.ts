import express, { Router } from "express";
import { body } from "express-validator";
import { signinController } from "../controllers/authController";
import { validateRequest } from "../middlewares/validate-request";

const router: Router = express.Router();

router.post("/api/users/signin", [
  body("email")
  .isEmail()
  .notEmpty()
  .withMessage("Email is required"),

  body("password")
  .trim()
  .notEmpty()
  .isLength({min: 4, max: 20})
  .withMessage("Password must be less than 4 and at most 20 characters long")
], 
validateRequest,
signinController
);

export { router as signinRouter };

