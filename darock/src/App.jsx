import "./App.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Mechanics } from "./Mechanics";
import { Game } from "./Game";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCaocb5pwfHaHG1sv1zDHijM1QwZUpABrU",
  authDomain: "darockgame.firebaseapp.com",
  projectId: "darockgame",
  storageBucket: "darockgame.appspot.com",
  messagingSenderId: "1085928755376",
  appId: "1:1085928755376:web:ee3bcd6673fd5eb4c32b75",
  measurementId: "G-B3HHY0510C",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const App = () => {

  return (
    <>
      {
        <Router>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/mechanics" element={<Mechanics />} />
            {/* Redirects to home if site does not exist*/}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      }
    </>
  );
};
