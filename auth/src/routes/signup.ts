import express, { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).send({ errors: errors.array() });
      throw new Error("Invalid email or password");
    }

    const { email, password } = req.body;

    console.log("Creating a new user...");

    res.send({});
  }
);

export { router as signupRouter };
