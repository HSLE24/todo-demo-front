import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error("에러: 패스워드가 일치하지 않습니다.");
      }

      const response = await api.post("/user", { name, email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입 {error && <span className="error">{error}</span>}</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            type="string"
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSecPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            onChange={(event) => setSecPassword(event.target.value)}
            type="password"
            placeholder="re-enter the password"
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
