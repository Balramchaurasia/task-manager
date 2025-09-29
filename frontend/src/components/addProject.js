import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiUrl, headers } from "../utils/api";

const CreateNewProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  const { id } = useParams();
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("/");
  const taskType = parts[1];
  // Fetch project details and populate form for editing
  useEffect(() => {
    if (id && taskType === "edit-project") {
      const fetchProject = async () => {
        try {
          const res = await apiUrl.get(`/projects/project/${id}`, {
            headers: headers(),
          });
          if (res.data.status === 200) {
            const p = res.data.message;
            setForm({
              title: p.title || "",
              description: p.description || "",
              status: p.status || "active",
            });
          } else {
            setError("Could not load project details");
          }
        } catch (err) {
          setError("Could not load project details");
        }
      };
      fetchProject();
    }
  }, [id, taskType]);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (name === "assignedUsers") {
      const vals = Array.from(selectedOptions, (option) => option.value);
      setForm((prev) => ({ ...prev, assignedUsers: vals }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (id) {
        const res = await apiUrl.put(
          `/projects/edit-project/${id}`,
          { ...form },
          { headers: headers() }
        );
        if (res.data.status === 200) {
          alert(res.data.message);
          navigate(-1);
        } else {
          alert(res.data.message || "Failed to create project");
        }
      } else {
        const res = await apiUrl.post(
          "/projects/create",
          { ...form, createdBy: userId },
          { headers: headers() }
        );
        if (res.data.status === 201) {
          alert(res.data.message);
          setForm({
            title: "",
            description: "",
            status: "",
          });
        } else {
          alert(res.data.message || "Failed to create project");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create project");
    }
  };

  return (
    <div className="create-project-container">
      <div className="create-project-card">
        <Button
          onClick={() => navigate(-1)}
          className="mb-3"
          variant="secondary"
        >
          Back
        </Button>

        <Form onSubmit={handleSubmit}>
          <h4>{id ? "Edit Project" : "Create New Project"}</h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {/* Fields */}
          <Form.Group className="form-group">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Project description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
          {taskType === "edit-project" && (
            <Form.Group className="form-group">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          )}

          <Button type="submit" className="btn btn-primary mt-2">
            {id ? "Update Project" : "Create Project"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CreateNewProject;
