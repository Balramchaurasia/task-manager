import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api.js";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin
        ? await apiUrl.post("/users/login", form)
        : await apiUrl.post("/users/register", form);

      if (isLogin) {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("id", res?.data?.message?.id);
        localStorage.setItem("user-email", res?.data?.message?.email);
        localStorage.setItem("user-name", res?.data?.message?.name);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <Card className="auth-card">
        <Card.Body>
          <h3>{isLogin ? "Login" : "Register"}</h3>
          <Form onSubmit={submit}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" className="btn-auth">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button
              variant="link"
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Back to Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginRegister;
