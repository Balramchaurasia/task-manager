import { Router } from "express";
import taskController from "./controller.js";
import auth from "../../utils/auth.js";

const taskRouter = Router();
taskRouter.post('/create',auth, taskController.createtask);
taskRouter.get('/:projectId',auth, taskController.getTasksByprojectId);
taskRouter.get('/task/:id',auth, taskController.getTasksById);
taskRouter.put('/update-task/:id',auth, taskController.updateTaskById);
taskRouter.delete('/delete/:id',auth, taskController.deleteTaskById);

export default taskRouter;