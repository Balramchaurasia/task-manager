import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiUrl, headers } from "../utils/api.js";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  const userName=localStorage.getItem("user-name");

  const authCheck = async () => {
    try {
      const res = await apiUrl.get("/users/me", { headers: headers() });
      if (res.data.status !== 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      // localStorage.clear();
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    authCheck();
  }, []);

  const getTasks = async () => {
    try {
      const res = await apiUrl.get(`/tasks/${selectedProj._id}`, {
        headers: headers(),
      });
      if (res.data.status === 200) {
        setTasks(res.data.message);
      } else {
        alert(res.data.message);
        setTasks([]);
      }
    } catch (error) {}
  };
  const getProjects = async () => {
    try {
      const res = await apiUrl.get(`/projects/user-all-projects/${userId}`, {
        headers: headers(),
      });
      if (res.data.status === 200) {
        setProjects(res.data.message);
      } else {
        alert(res.data.message);
        setTasks([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteProject = async (id) => {
    try {
      const updatedProjects = projects.filter((item) => item._id != id);
      setProjects(updatedProjects);
      const res = await apiUrl.delete(`/projects/delete/${id}`, {
        headers: headers(),
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
   const deleteTask = async (id) => {
    try {
      const updatedTasks = tasks.filter((item) => item._id != id);
      setTasks(updatedTasks);
      const res = await apiUrl.delete(`/tasks/delete/${id}`, {
        headers: headers(),
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  useEffect(() => {
    getTasks();
  }, [selectedProj]);

  const logout = () => {
    window.location.href = "/login";
    localStorage.clear();
  };


  const visibleTasks = statusFilter
    ? tasks.filter((t) => t.status === statusFilter)
    : tasks;
  return (
    <div className="dashboard-container">
      <h2>{userName}</h2>
      <div className="dashboard-header">
      
        <h3> Your Projects</h3>
        <div>
          <Button onClick={() => navigate("/add-project")}>Add Project</Button>

          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>View</th>
            <th>Add Task</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td>{p?.title}</td>
              <td>{p?.status}</td>
              <td>
                <Button size="sm" onClick={() => setSelectedProj(p)}>
                  View Tasks
                </Button>
              </td>

              <td>
                <Button
                  size="sm"
                  onClick={() => navigate(`/add-task/${p._id}`)}
                >
                  Add
                </Button>
              </td>
              <td>
                <Button
                  size="sm"
                  onClick={() => navigate(`/edit-project/${p._id}`)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button size="sm" onClick={() => deleteProject(p._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedProj && (
        <>
          <h4>Tasks for {selectedProj.title}</h4>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mb-2"
          >
            <option value="">All tasks</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Select>

          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map((t) => (
                <tr key={t?._id}>
                  <td>{t?.title}</td>
                  <td>{t?.status}</td>

                  <td>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/update-task/${t._id}`)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => deleteTask(t._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
export default Dashboard;
