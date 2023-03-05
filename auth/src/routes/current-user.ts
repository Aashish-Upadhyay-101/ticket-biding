import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.send("hello there haha aashish!");
});

export { router as currentUserRouter };
