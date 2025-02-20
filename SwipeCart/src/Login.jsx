import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const SubmitEmail = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!emailRegex.test(email)) {
      setError("Invalid Email Format");
      return;
    }
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      if (response.data.length === 0) {
        setError("Invalid email or password.");
        return;
      }
      setError("");
      setSuccess("Login Successfull");
      setFormData({ email: "", password: "" });
         setAuth(response.data[0].id);
         localStorage.setItem("id", response.data[0].id);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Container style={{ marginTop: "50px", maxWidth: "500px" }}>
        <Card>
          <Card.Body>
            <h3 className="text-center">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-danger">{success}</div>}
            <Form onSubmit={SubmitEmail}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  value={formData.email}
                  name="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
              <div className="mt-2">
                <NavLink to="/register">
                  {" "}
                  Don't have an Account? Register!
                </NavLink>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
