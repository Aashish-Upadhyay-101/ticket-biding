import express, { Request, Response, Router } from "express";
import { signoutController } from "../controllers/authController";

const router: Router = express.Router();

router.post("/api/users/signout", signoutController);

export { router as signoutRouter };
