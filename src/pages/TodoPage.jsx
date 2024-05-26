import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";

import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function TodoPage({ user, setUser }) {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log(response);
    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("성공");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && todoValue) {
      addTask();
    }
  };

  const goToLoginPage = () => {
    sessionStorage.setItem("token", "");
    setUser(null);
  };

  return (
    <Container className="container">
      <div className="title-area">
        <h2 className="title">
          <Link className="link-item" to="/">
            Todo List
          </Link>
        </h2>
        <h2 className="title-login" onClick={goToLoginPage}>
          logout
        </h2>
      </div>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
            onKeyDown={handleKeyPress}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
}

export default TodoPage;
