import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, getTasks }) => {
  const updateTask = async () => {
    try {
      const response = await api.put(`/tasks/${item._id}`);

      if (response.status === 200) {
        console.log("수정 성공");
        getTasks();
      } else {
        throw new Error("task can not be updated");
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${item._id}`);

      if (response.status === 200) {
        console.log("삭제 성공");
        getTasks();
      } else {
        throw new Error("task can not be deleted");
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={deleteTask}>
              삭제
            </button>
            <button className="button-delete" onClick={updateTask}>
              {item.isComplete ? "끝남" : "안끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
