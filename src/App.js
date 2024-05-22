import { useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./utils/api";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
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

  return (
    <Container className="container">
      <h2 className="title">Todo List</h2>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
            onKeyPress={handleKeyPress}
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

export default App;
