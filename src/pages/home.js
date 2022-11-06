import React, { useEffect } from "react";
import "./home.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Task from "../components/task";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { db } from "../components/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
const Home = ({
  theme,
  task,
  setTask,
  date,
  setDate,
  currentUser,
  description,
  setDescription,
  todos,
  setTodos,
  toggleTheme,
  id
}) => {
  let history = useHistory();
  const signOutHandler = () => {
    signOut(auth);
    history.push("/");
  };
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const userHandler = (todo) => {
    if (currentUser.email === todo.email) {
      return (
        <Task
          key={todo.id}
          task={todo.task}
          date={todo.date}
          description={todo.description}
          id={id}
          currentUser={currentUser}
          deleteTask={deleteTask}
          todo={todo}
        />
      );
    }
  };
  const addTaskHomeHandler = () => {
    history.push("/add");
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
      <div className="home">
        <div className="nav-home-bar">
          <h1 className="title-text-name">Welcome to your Dashboard</h1>
          <button className="add-task-home-button" onClick={addTaskHomeHandler}>
            +
          </button>
        </div>
        {todos.map(userHandler)}
      </div>
    </>
  );
};
export default Home;
