import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const [formData, setfromData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfromData({ ...formData, [name]: value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { fullname, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Password and Confirm Password should be same!");
      return;
    }
    if (!fullname || !email || !password || !confirmPassword) {
      setError("Can't be Empty!");
      return;
    }
    if (fullname.length > 15) {
      setError("Full name must be below 15 character!");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Minimum 8 characters, at least 1 letter and 1 number!");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please write valid email!");
      return;
    }
    try {
      const userValidation = await axios.get(
        `http://localhost:3000/users/?email=${email}`
      );
      //console.log(userValidation);
      if (userValidation.data.length > 0) {
        setError("Email already registered!!");
        return;
      }
      const response = await axios.post(`http://localhost:3000/users`, {
        fullname,
        email,
        password,
      });
      //console.log(response);

      setError("");
      setfromData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess("Thank you for regiestering");
      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Container style={{ marginTop: "50px", maxWidth: "500px" }}>
        <Card>
          <Card.Body>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <h3 className="text-center">Register</h3>
            <Form onSubmit={submitData}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleChange}
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleChange}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
            </Form>
            <div className="mt-2">
              <NavLink to="/">Already have Account? Login!</NavLink>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Register;
