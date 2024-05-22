import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, getTasks }) => {
  const [filter, setFilter] = useState(0);

  const filterdTodoList = todoList.filter((item) => {
    if (filter === 1) {
      return !item.isComplete;
    } else if (filter === 2) {
      return item.isComplete;
    }
    return true;
  });

  return (
    <div>
      <ul className="category">
        <li
          onClick={() => setFilter(0)}
          className={`${filter === 0 ? "active" : ""}`}
        >
          전체
        </li>
        <li
          onClick={() => setFilter(1)}
          className={`${filter === 1 ? "active" : ""}`}
        >
          미완료
        </li>
        <li
          onClick={() => setFilter(2)}
          className={`${filter === 2 ? "active" : ""}`}
        >
          완료
        </li>
      </ul>
      {filterdTodoList.length > 0 ? (
        filterdTodoList.map((item, index) => (
          <TodoItem
            key={item._id}
            item={item}
            getTasks={getTasks}
            tag={
              index === 0
                ? "first"
                : index === todoList.length - 1
                ? "last"
                : ""
            }
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
