import { Router } from "express";

import userRouter from "./user/route.js";
import projectRouter from "./project/route.js";
import taskRouter from "./task/route.js";
const router = Router();

router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
export default router;
