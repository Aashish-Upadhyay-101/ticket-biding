import express, { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { signupController } from "../controllers/authController";
import { validateRequest } from "../middlewares/validate-request";

const router: Router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Password must be at least 4 characters long and at most 20 characters long"
      ),
  ],
  validateRequest,
  signupController
);

export { router as signupRouter };
