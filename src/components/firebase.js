import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBIY5wnfQUacARnj5pNU7tpTYc0LaA4qhU",
  authDomain: "fast-tasks-a5722.firebaseapp.com",
  projectId: "fast-tasks-a5722",
  storageBucket: "fast-tasks-a5722.appspot.com",
  messagingSenderId: "684756852087",
  appId: "1:684756852087:web:1c8cdf43af70749179d572"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
