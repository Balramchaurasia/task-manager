import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { apiUrl ,headers} from "../utils/api";


const CreateTask = () => {
  const [form, setForm] = useState({
    title: "",
    status:"To Do",
  });

  const { id } = useParams();
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("/");
  const taskType = parts[1];
  const navigate = useNavigate();

  // Fetch users (assigned to project)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (taskType === "update-task") {
          const res = await apiUrl.get(`/tasks/task/${id}`,{ headers :headers()});
          if (res.data.status === 200) {
            const t = res.data.message;
            setForm({
              title: t?.title,
              status: t?.status,
            });
          } else {
            alert("Could not load task details");
          }
        }
      } catch (e) {
        alert("Could not load users!");
      }
    };
    fetchTask();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskType === "update-task") {
        const res = await apiUrl.put(
          `/tasks/update-task/${id}`,
          { status: form.status }
         ,{ headers :headers()}
        );
        if (res.data.status === 200) {
          alert("Task updated successfully!");
          navigate(-1);
        } else {
          alert(res.data.message);
        }}
        if (taskType === "add-task") {
          const payload = {
            ...form,assignee:id,
            projectId: id,
          };
          const res = await apiUrl.post("/tasks/create", payload,{ headers :headers()});
          if (res.data.status === 201) {
            alert("Task created successfully!");
            navigate(-1);
          } else {
            alert(res.data.message);
          }
        }
      
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create task");
    }
  };

return (
  <div className="create-task-container">
    <div className="create-task-card">
      <Button onClick={() => navigate(-1)} className="mb-3" variant="secondary">
        Back
      </Button>

      <Form onSubmit={handleSubmit}>
        <h5>{taskType === "add-task" ? "Create New Task" : "Update Task"}</h5>

        {taskType === "add-task" && (
          <Form.Group className="form-group">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        {taskType === "update-task" && (
          <Form.Group className="form-group">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>
        )}

        <Button type="submit" className="btn btn-primary mt-2">
          {taskType === "add-task" ? "Add Task" : "Update Task"}
        </Button>
      </Form>
    </div>
  </div>
);

};

export default CreateTask;
