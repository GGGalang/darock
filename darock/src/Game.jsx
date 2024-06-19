import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import rockmuffin from "./assets/rockmuffin.svg";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Mechanics } from "./Mechanics";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

/* ToDos:
- Speed up animations w/ multiplier DONE
- Pause and Resume
- Hard Mode
- Animations onclick (a cookie will appear if feed cookie etc)
    - Add symbols for the actions above buttons first lol
    - Add sounds?
- Death scene?
- Better UI
- Leaderboard
- Power ups, question mark
*/

export const Game = () => {
  let pressed = [0, 0, 0, 0];

  const setCookie = () => {
    pressed[0] = 1;
    document.getElementById("cookie").style.backgroundColor = "green";
  };
  const setGame = () => {
    pressed[1] = 1;
    document.getElementById("game").style.backgroundColor = "green";
  };
  const setSleep = () => {
    pressed[2] = 1;
    document.getElementById("sleep").style.backgroundColor = "green";
  };
  const setStudy = () => {
    pressed[3] = 1;
    document.getElementById("study").style.backgroundColor = "green";
  };

  var score = 0;
  var animationSpeed = 2;
  const states = ["hungry", "bored", "tired", "curious"];
  const stateColors = ["yellow", "red", "blue", "green"];
  var multiplier = 1;
  var paused = true;

  const update = () => {
    setTestState("paused");
  };

  const [testState, setTestState] = useState();

  useEffect(() => {
    paused = !paused;
    console.log(paused);
    if (paused == true) {
      alert("Game Paused! Your current score is: " + score);
    } else {
      startGame();
    }
  }, [testState]);

  useEffect(() => {
    function updateStatus() {
      //generate and update status and speed
      var state = Math.floor(Math.random() * 4);
      document.querySelector(".status").innerHTML =
        "Darock is " + states[state] + "!";
      document.getElementsByClassName("rock")[0].style.color =
        stateColors[state];
      document.getElementById("rock").style.animationDuration =
        animationSpeed + "s";
    }

    function startGame() {
      updateStatus();
      //timer
      var timeleft = 10;
      var statusTimer = setInterval(function () {
        if (paused) {
          return;
        }
        if (timeleft <= 0) {
          clearInterval(statusTimer);
          console.log(state);
          if (pressed[state] == 1) {
            score = score + 10;
            pressed = [0, 0, 0, 0];
            if (multiplier > 0.02) {
              multiplier -= 0.05;
            }
            if (animationSpeed > 0.2) {
              animationSpeed -= 0.1;
            }
            console.log(multiplier);
            document.querySelectorAll(".childBtn").forEach((btn) => {
              btn.style.backgroundColor = "white";
            });
            startGame();
          } else {
            alert("Game Over! Your score is: " + score);
            window.location.reload();
          }
        }
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
      }, 1000 * multiplier);
    }

    startGame();
  });

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "100px" }}>darock.</div>
      <button onClick={update} className="pauseBtn" id="pauseScore">
        Pause or Resume
      </button>
      <div className="scorePause">Score: 0</div>
      <div style={{ textAlign: "center" }}>
        <li style={{ listStyleType: "none" }}>
          <Link reloadDocument to={"/mechanics"}>
            <button
              style={{
                width: "300px",
                height: "50px",
                backgroundColor: "black",
              }}
            >
              <span
                className="mdc-button__label"
                style={{
                  fontFamily: "Coffee",
                  fontSize: "30px",
                  color: "white",
                }}
              >
                Mechanics
              </span>
            </button>
          </Link>
        </li>
      </div>

      <svg
        className="rock"
        id="rock"
        height="300px"
        width="300px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512.014 512.014"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <path
              fill="currentcolor"
              d="M506.35,210.979l-2.517-5.504c-1.451-3.093-2.027-6.528-1.728-9.899l0.555-5.931c1.6-17.749-4.544-35.456-16.853-48.533
			l-4.928-5.248c-2.368-2.517-4.053-5.547-4.885-8.811l-1.685-6.613c-4.288-16.683-15.531-31.147-30.805-39.616l-7.68-4.288
			c-3.029-1.685-5.611-4.032-7.488-6.891l-4.565-6.912c-9.301-14.016-23.595-23.744-40.32-27.371l-10.069-2.176
			c-3.349-0.725-6.507-2.197-9.173-4.309l-7.765-6.123C343.559,12.578,327.431,7.671,310.94,8.93l-11.115,0.853
			c-3.392,0.256-6.848-0.256-10.005-1.472l-10.261-3.925c-15.168-5.845-31.872-5.845-47.125,0l-10.219,3.925
			c-3.157,1.216-6.72,1.728-10.027,1.472L201.137,8.93c-16.405-1.195-32.64,3.627-45.547,13.824l-7.808,6.144
			c-2.624,2.091-5.781,3.563-9.131,4.288l-10.112,2.176c-16.704,3.627-30.976,13.355-40.256,27.349l-4.651,6.976
			c-1.835,2.816-4.416,5.163-7.424,6.848l-7.723,4.288c-15.253,8.469-26.475,22.933-30.763,39.637l-1.685,6.613
			c-0.832,3.243-2.517,6.272-4.928,8.832l-4.885,5.205c-12.309,13.077-18.453,30.784-16.853,48.576l0.533,5.888
			c0.32,3.371-0.277,6.805-1.707,9.899l-2.517,5.504c-7.573,16.512-7.573,35.413,0,51.925l2.517,5.504
			c1.429,3.093,2.027,6.528,1.707,9.877l-0.533,5.931c-1.6,17.771,4.544,35.456,16.853,48.555l4.907,5.248
			c2.389,2.496,4.075,5.547,4.907,8.832l6.165,23.979c1.173,4.587,4.117,8.299,7.787,11.179v73.685
			c0,31.061,25.728,56.32,57.387,56.32h306.301c31.637,0,57.365-25.259,57.365-56.32v-89.6l4.949-19.285
			c0.832-3.243,2.517-6.293,4.907-8.832l4.907-5.205c12.309-13.099,18.453-30.784,16.853-48.576l-0.555-5.888
			c-0.299-3.371,0.277-6.805,1.728-9.899l2.517-5.504C513.902,246.392,513.902,227.491,506.35,210.979z M174.083,198.349
			c8.491-1.877,16.512-5.717,23.253-11.157l6.272-5.056c2.709-2.219,6.101-3.264,9.685-2.987l8.917,0.683
			c8.405,0.64,17.109-0.619,25.024-3.733l8.213-3.221c3.243-1.28,6.827-1.301,10.091-0.021l8.256,3.243
			c7.893,3.115,16.533,4.352,25.003,3.733l8.939-0.683c3.349-0.107,6.955,0.789,9.685,2.987l6.229,5.013
			c6.741,5.461,14.784,9.323,23.275,11.2l0.853,0.192c-3.52,0.171-6.997,0.683-10.496,1.003c-2.88,0.256-5.739,0.448-8.576,0.811
			c-7.339,0.939-14.592,2.219-21.781,3.819c-1.216,0.256-2.475,0.405-3.712,0.704c-8.256,1.963-16.363,4.459-24.341,7.275
			c-2.539,0.917-5.013,2.005-7.531,2.987c-3.627,1.429-7.296,2.688-10.837,4.309c-3.456-1.579-7.04-2.816-10.581-4.203
			c-2.624-1.045-5.205-2.197-7.872-3.136c-7.915-2.795-15.936-5.269-24.128-7.211c-1.493-0.363-3.029-0.533-4.523-0.875
			c-6.912-1.515-13.909-2.752-20.949-3.648c-2.944-0.384-5.888-0.576-8.853-0.853c-3.456-0.299-6.869-0.811-10.347-0.981
			L174.083,198.349z M121.006,335.096c-10.283-1.003-17.728-7.381-23.211-16.533c-0.427-0.725-0.853-1.472-1.259-2.261
			c-1.067-1.963-1.963-4.096-2.859-6.272c-0.619-1.493-1.259-2.901-1.835-4.608c-0.64-1.813-1.152-3.733-1.685-5.653
			c-0.768-2.688-1.472-5.461-2.112-8.405c-0.597-2.88-1.216-5.781-1.685-8.747c-0.235-1.536-0.384-3.221-0.597-4.821
			c-0.363-2.752-0.747-5.504-0.981-8.235c-0.363-3.904-0.64-7.957-0.811-12.16c-0.021-0.277-0.043-0.576-0.064-0.853
			c7.851-3.328,16.192-6.059,24.725-8.427c2.283-0.619,4.565-1.216,6.848-1.749c3.435-0.811,6.848-1.579,10.304-2.197
			c2.901-0.533,5.845-0.939,8.768-1.323c3.285-0.448,6.549-0.896,9.835-1.173c3.029-0.256,6.08-0.341,9.109-0.469
			c3.285-0.128,6.571-0.299,9.856-0.277c2.965,0.021,5.909,0.256,8.875,0.427c3.328,0.171,6.699,0.256,10.005,0.597
			c3.008,0.32,5.973,0.875,8.96,1.323c5.653,0.853,11.243,1.941,16.789,3.264c3.499,0.832,7.019,1.6,10.453,2.645
			c2.56,0.747,5.035,1.728,7.552,2.603c3.499,1.195,7.019,2.389,10.432,3.797c0.64,0.256,1.259,0.597,1.899,0.853
			c-0.043,0.299-0.107,0.64-0.149,0.96c-0.405,3.115-1.024,6.592-1.792,10.197c-0.235,1.088-0.491,2.176-0.747,3.285
			c-1.088,4.373-2.432,8.917-4.267,13.547c-0.128,0.299-0.299,0.597-0.427,0.896c-1.749,4.224-3.989,8.448-6.528,12.587
			c-0.704,1.131-1.451,2.261-2.219,3.371c-3.072,4.437-6.507,8.768-10.795,12.651c-14.827,13.461-35.627,20.821-62.08,22.016
			C140.505,336.355,131.075,336.056,121.006,335.096z M333.614,421.795c-9.109,7.509-22.528,6.229-30.037-2.837
			c-7.744-9.323-16.597-13.739-26.432-12.992c-15.701,0.896-33.728,13.611-45.909,32.341c-4.096,6.293-10.944,9.707-17.92,9.707
			c-3.968,0-8.021-1.088-11.605-3.435c-9.877-6.421-12.672-19.648-6.272-29.504c19.947-30.677,49.579-50.005,79.232-51.712
			c23.488-1.301,45.483,8.725,61.781,28.395C343.939,400.845,342.702,414.264,333.614,421.795z M437.059,257.421
			c-0.192,4.203-0.469,8.235-0.811,12.139c-0.256,2.816-0.661,5.675-1.024,8.512c-0.192,1.493-0.341,3.093-0.555,4.523
			c-0.576,3.691-1.301,7.296-2.091,10.859c-0.448,1.963-0.981,3.755-1.493,5.611c-0.597,2.155-1.195,4.331-1.899,6.4
			c-0.597,1.685-1.216,3.093-1.835,4.587c-0.896,2.133-1.792,4.245-2.816,6.187c-0.448,0.832-0.896,1.6-1.344,2.368
			c-5.461,9.131-12.885,15.488-23.168,16.491c-40.213,3.883-70.613-3.221-90.411-21.184c-4.267-3.861-7.68-8.171-10.752-12.608
			c-0.789-1.131-1.557-2.283-2.261-3.456c-2.517-4.075-4.715-8.213-6.443-12.373c-0.149-0.363-0.363-0.747-0.512-1.109
			c-1.835-4.587-3.157-9.109-4.245-13.461c-0.277-1.131-0.533-2.24-0.768-3.349c-0.768-3.584-1.387-6.997-1.771-10.091
			c-0.043-0.341-0.107-0.704-0.149-1.024c0.64-0.256,1.259-0.597,1.92-0.875c3.413-1.387,6.912-2.56,10.389-3.776
			c2.517-0.875,4.992-1.835,7.552-2.603c3.349-1.003,6.741-1.728,10.133-2.56c6.4-1.536,12.843-2.752,19.392-3.669
			c2.176-0.299,4.352-0.725,6.571-0.96c3.755-0.384,7.552-0.512,11.328-0.683c2.475-0.128,4.949-0.341,7.445-0.363
			c3.691-0.043,7.381,0.149,11.072,0.32c2.603,0.107,5.184,0.171,7.787,0.384c3.605,0.299,7.211,0.789,10.816,1.28
			c2.624,0.363,5.248,0.725,7.872,1.195c3.584,0.64,7.168,1.429,10.731,2.283c2.219,0.533,4.437,1.088,6.635,1.685
			c8.533,2.368,16.896,5.099,24.768,8.448C437.102,256.824,437.059,257.144,437.059,257.421z"
            />
          </g>
        </g>
      </svg>

      <p className="status" style={{ textAlign: "center", fontSize: "50px" }}>
        status
      </p>

      <progress value="0" max="10" id="progressBar"></progress>

      <div className="actionDiv">
        <button className="childBtn" id="cookie" onClick={setCookie}>
          feed cookie
        </button>
        <button className="childBtn" id="game" onClick={setGame}>
          play game
        </button>
        <button className="childBtn" id="sleep" onClick={setSleep}>
          sleep
        </button>
        <button className="childBtn" id="study" onClick={setStudy}>
          study
        </button>
      </div>
    </>
  );
};
