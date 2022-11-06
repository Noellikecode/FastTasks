import React, { useState } from "react";
import "./task.css";
import { useHistory } from "react-router-dom";

function Task({ task, date, description, currentUser, id, deleteTask, todo }) {
  let history = useHistory();

  return (
    <div className="todo-list">
      <div className="Card">
        <div className="card-title-handler">
          <h1 className="card-title">{task}</h1>
          <h3 className="card-date">{`Due by ${date}`}</h3>
        </div>
        <div className="card-info">
          <p className="description-text">{description}</p>
        </div>
        <div className="card-button-bar">
          <button className="card-button" onClick={() => deleteTask(todo.id)}>
            Delete
          </button>

          <button
            className="card-button"
            onClick={() => history.push("/timer")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
