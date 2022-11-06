import React, { useState, useEffect } from "react";
import "./pages/home.css";
import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./pages/home";
import TitlePage from "./components/TitlePage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TaskForm from "./components/AddTask";
import Login from "./components/Login";
import { AuthProvider } from "./components/AuthContext";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import Timer from "./components/Timer";
import {
  todos,
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./components/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  let history = useHistory();
  const id = Math.floor(Math.random() * 100000) + 1;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/add">
            <TaskForm
              task={task}
              setTask={setTask}
              date={date}
              setDate={setDate}
              description={description}
              setDescription={setDescription}
              todos={todos}
              setTodos={setTodos}
              theme={theme}
              toggleTheme={toggleTheme}
              id={id}
              currentUser={currentUser}
            />
          </Route>
          <Route path="/home">
            <Home
              theme={theme}
              toggleTheme={toggleTheme}
              task={task}
              setTask={setTask}
              date={date}
              setDate={setDate}
              description={description}
              setDescription={setDescription}
              todos={todos}
              id={id}
              currentUser={currentUser}
            />
          </Route>
          <Route path="/timer">
            <Timer id={id} theme={theme} toggleTheme={toggleTheme} />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
