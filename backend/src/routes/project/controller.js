
import Project from "./model.js";
import sendResponse from "../../utils/sendResponse.js";

const createProject = async (req, res) => {
  try {
    const {title,description,status,createdBy}=req.body;
    if(!title||!description||!createdBy){
      const response = {
      status: 400,
      message: "Fill all values",
    };
    return sendResponse(req, res, response);
    }
    const p = new Project({
      title,description,status,createdBy,
    });
    await p.save();

    const response = {
      status: 201,
      message: "Project Created Sucessfully",
      data: p,
    };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const getProjectById = async (req, res) => {
  try {
    const {id}=req.params;
    const project = await Project.findById(id);
    if (!project) {
      const response = { status: 404, message: "No project found" };
      return sendResponse(req, res, response);
    }
    const response = { status: 200, message: project };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const getProjectByuser = async (req, res) => {
  try {
    const {id}=req.params;
    const projects = await Project.find({createdBy:id});
    if (!projects) {
      const response = { status: 404, message: "No projects found" };
      return sendResponse(req, res, response);
    }
    const response = { status: 200, message: projects };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    let project = await Project.findByIdAndUpdate(
      
       { _id:id},
       { $set: {
          title:title ,
          description:description,
          status:status,
        },},
      { new: true }
    );
    if (!project) {
      const response = { status: 404, message: "Data not found" };
      return sendResponse(req, res, response);
    }
    const response = {
      status: 200,
      message: "Updated sucessfully",
      data: project,
    };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    let project = await Project.findByIdAndDelete(id);

    if (!project) {
      const response = { status: 404, message: "Data not found" };
      return sendResponse(req, res, response);
    }

    const response = {
      status: 200,
      message: "Deleted successfully",
      data: project,
    };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};

const projectController = {
  createProject,
  getProjectById,
  getProjectByuser,
  editProject,
  deleteProject,
};
export default projectController;
