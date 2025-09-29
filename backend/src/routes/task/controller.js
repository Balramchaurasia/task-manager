

import Task from "./model.js";
import sendResponse from "../../utils/sendResponse.js";

const createtask = async (req, res) => {
  try {
    const {projectId,title,status}=req.body;
    if (!projectId || !title) {
      const response = { status: 400, message: "fill all firelds" };
      return sendResponse(req, res, response);
    }
    const task = new Task({projectId,title,status});
    await task.save();
    if (!task) {
      const response = { status: 500, message: "Tasks not created" };
      return sendResponse(req, res, response);
    }


    const response = { status: 201, message: "New Task created", data: task };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      const response = { status: 400, message: "Bad Request" };
      return sendResponse(req, res, response);
    }
    const task = await Task.findById(id);
    if (!task) {
      const response = { status: 404, message: "No tasks Found" };
      return sendResponse(req, res, response);
    }
    const response = { status: 200, message: task };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if(!id){
      const response = { status: 400, message: "Bad Request" };
      return sendResponse(req, res, response);
    }
    const task = await Task.findByIdAndUpdate({_id:id},{$set:{status:status}},{new:true});
    if (!task) {
      const response = { status: 404, message: "No tasks Found" };
      return sendResponse(req, res, response);
    }




    const response = { status: 200, message: "Task Updated", data:task };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const getTasksByprojectId = async (req, res) => {
  const {projectId}=req.params;
  try {
    if (!projectId) {
      const response = { status: 400, message: "No project Id Found" };
      return sendResponse(req, res, response);
    }
    const tasks = await Task.find({ projectId:projectId });
    if (!tasks) {
      const response = { status: 404, message: "No tasks Found" };
      return sendResponse(req, res, response);
    }
    const response = { status: 200, message: tasks };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};


const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      const response = { status: 404, message: "Task not found" };
      return sendResponse(req, res, response);
    }

    const response = {
      status: 200,
      message: "Task deleted successfully",
      data: task,
    };
    return sendResponse(req, res, response);

  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};


const taskController = {
  createtask,
  getTasksByprojectId,
  updateTaskById,
  deleteTaskById,
  getTasksById,
  updateTaskById,
};
export default taskController;
