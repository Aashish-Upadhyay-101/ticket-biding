import express, { Request, Response, Router } from "express";
import { currentUserController } from "../controllers/authController";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router: Router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, currentUserController);

export { router as currentUserRouter };
 