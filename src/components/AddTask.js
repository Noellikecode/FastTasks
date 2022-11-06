import React, { useState, useEffect, useRef } from "react";
import "./AddTask.css";
import { useHistory } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { db } from "./firebase";
import Task from "./task";
import { collection, addDoc } from "firebase/firestore";

const TaskForm = ({
  task,
  setTask,
  date,
  setDate,
  description,
  setDescription,
  todos,
  setTodos,
  theme,
  toggleTheme,
  id,
  currentUser
}) => {
  let history = useHistory();

  const TodoSubmit = async (e) => {
    e.preventDefault();
    history.push("/home");
    await addDoc(collection(db, "todos"), {
      task: task,
      description: description,
      date: date,
      id: id,
      email: currentUser.email
    });
  };

  const signOutHandler = () => {
    signOut(auth);
    history.push("/");
  };
  return (
    <>
      <div className="navbar">
        <a href="/home">Home</a>
        <a href="/add">Add Task</a>
        <button onClick={signOutHandler} className="sign-out-button">
          Sign Out
        </button>

        {theme === "light" ? (
          <DarkModeIcon className="icon-light" onClick={toggleTheme} />
        ) : (
          <LightModeIcon className="icon-dark" onClick={toggleTheme} />
        )}
      </div>
      <div className="form-handler">
        <h1 className="add-task-page-title">Add a task</h1>
        <form className="add-form" onSubmit={TodoSubmit}>
          <div className="form-control">
            <label>Task Name</label>
            <input
              type="text"
              className="text-input"
              required
              placeholder="Study for Math"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Due Date</label>
            <input
              type="text"
              className="text-input"
              required
              placeholder="month/day/year"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Description</label>
            <input
              type="text"
              className="text-input"
              required
              placeholder="Word problems and quadratics are going to be on the test"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <input type="submit" value="Add Task" className="save-task-button" />
        </form>
      </div>
    </>
  );
};
export default TaskForm;
