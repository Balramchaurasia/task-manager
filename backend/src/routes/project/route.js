import { Router } from "express";
import projectController from "./controller.js";
import auth from "../../utils/auth.js";

const projectRouter = Router();

projectRouter.post('/create',auth, projectController.createProject);
projectRouter.get('/project/:id',auth, projectController.getProjectById);
projectRouter.get('/user-all-projects/:id',auth, projectController.getProjectByuser);
projectRouter.put('/edit-project/:id',auth, projectController.editProject);
projectRouter.delete('/delete/:id', auth,projectController.deleteProject);


export default projectRouter;