import { useEffect, useRef } from "react";
import "./App.css";

import cookie from "./assets/cookie.png";
import game from "./assets/game.jpg";
import sleep from "./assets/sleep.jpg";
import book from "./assets/book.png";
import eat from "./assets/eat.mp3";
import pew from "./assets/pew.mp3";
import snore from "./assets/snore.mp3";
import hmm from "./assets/hmm.mp3";
import bgm from "./assets/bgm.mp3";

import boom from "./assets/boom.gif";
import explosion from "./assets/explosion.mp3";

import { RockSVG } from "./Rock.jsx";
import { setCookie, setGame, setSleep, setStudy } from "./functions";

import { Link, useNavigate } from "react-router-dom";

/* ToDos:
- Power ups, question mark
- Better UI
    - better scores
    - better buttons
    - not UI but better button setting code lol
    - better svg code (maybe make it component?)
    - better code overall. componentialize them!
*/

export const Game = () => {
  var pressed = [0, 0, 0, 0];

  const states = ["hungry", "bored", "tired", "curious"];
  const stateColors = ["yellow", "red", "blue", "green"];
  const nav = new useNavigate();
  var score = 0;
  var animationSpeed = 2;
  var multiplier = 1;
  var paused = true;
  var state = 0;
  var timeleft = 10;
  var hard = false;

  //refs
  const statusRef = useRef(null);
  const rockRef = useRef(null);
  const scoreRef = useRef(null);
  const hardRef = useRef(null);

  const enableHard = () => {
    var real = window.confirm(
      "Are you sure you want to enable hard mode? This immediately changes the difficulty. THERE IS NO GOING BACK."
    );
    if (real) {
      hard = !hard;
      multiplier = 0.1;
      alert("Hard Mode Enabled! Good Luck! Next round will spell your doom.");
      hardRef.current.innerHTML = "Hard Mode: On";
    }
  };

  function updateStatus() {
    //generate and update status and speed
    state = Math.floor(Math.random() * 4);
    statusRef.current.innerHTML = "Darock is " + states[state] + "!";
    rockRef.current.style.color = stateColors[state];
    rockRef.current.style.animationDuration = animationSpeed + "s";
  }

  function startGame() {
    updateStatus();
    //timer
    var statusTimer = setInterval(function () {
      if (paused == true) {
        clearInterval(statusTimer);
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
          timeleft = 10;
          scoreRef.current.innerHTML = "Score: " + score;
          startGame();
        } else {
          document.getElementById("rock").style.display = "none";
          document.getElementById("boom").style.display = "block";
          document.getElementById("explosionAudio").play();

          setTimeout(() => {
            alert("Game Over! Your score is: " + score);

            if (document.getElementById("name").value == "") {
              document.getElementById("name").value = "Anonymous";
            }

            document.getElementById("name").value = document
              .getElementById("name")
              .value.replaceAll(/\s/g, "_");

            var date = new Date();
            var dateStr =
              date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

            var scores = JSON.parse(localStorage.getItem("darockScore"));
            localStorage.setItem(
              "darockScore",
              JSON.stringify(
                scores +
                  "(" +
                  document.getElementById("name").value +
                  "," +
                  score +
                  "," +
                  dateStr +
                  ")" +
                  " "
              )
            );
            nav("/leaderboard");
          }, 1000);
        }
      }
      document.getElementById("progressBar").value = 10 - timeleft;
      timeleft -= 1;
    }, 1000 * multiplier);
  }

  const update = () => {
    paused = !paused;
    if (paused == true) {
      alert("Game Paused! Your current score is: " + score);
    } else {
      startGame();
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("darockScore"));
    if (
      localStorage.getItem("darockScore") == "" ||
      localStorage.getItem("darockScore") == null
    ) {
      localStorage.setItem("darockScore", JSON.stringify(""));
    }
    paused = !confirm("Welcome to Darock! Are you ready to start?");
    console.log(paused);
    if (paused) {
      alert(
        "Not yet ready? Just click the Pause/Resume button to start the game!"
      );
    }

    startGame();
  });

  return (
    <>
      <audio id="bgm" src={bgm} loop={true} />
      <div style={{ textAlign: "center", fontSize: "100px" }}>darock.</div>

      <button onClick={update} className="pauseBtn" id="pauseScore">
        Pause or Resume
      </button>
      <div ref={scoreRef} className="scorePause">
        Score: 0
      </div>
      <input id="name" type="text" placeholder="Name" className="nameField" />

      <button onClick={enableHard} className="hardBtn">
        Enable Hard Mode
      </button>
      <div ref={hardRef} className="hardText">
        Hard Mode: Off
      </div>

      <img className="cookie" id="cookieAnim" src={cookie} alt="" />
      <img className="game" id="gameAnim" src={game} alt="" />
      <img className="sleep" id="sleepAnim" src={sleep} alt="" />
      <img className="book" id="bookAnim" src={book} alt="" />

      <img id="boom" src={boom} alt="" />
      <audio id="explosionAudio" src={explosion}></audio>

      <div style={{ textAlign: "center" }}>
        <li
          style={{
            listStyleType: "none",
            display: "inline-block",
            marginRight: "2.5px",
          }}
        >
          <Link reloadDocument to={"/mechanics"}>
            <button
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "black",
              }}
            >
              <span
                className="mdc-button__label"
                style={{
                  fontFamily: "Coffee",
                  fontSize: "10px",
                  color: "white",
                }}
              >
                Mechanics
              </span>
            </button>
          </Link>
        </li>
        <span
          style={{
            display: "inline-block",
            marginLeft: "2.5px",
            marginRight: "2.5px",
          }}
        >
          <button
            style={{
              width: "100px",
              height: "50px",
              backgroundColor: "black",
              color: "white",
              fontFamily: "Coffee",
              fontSize: "10px",
            }}
            onClick={() => {
              document.getElementById("bgm").play();
            }}
          >
            Play/Stop Music
          </button>
        </span>
        <li
          style={{
            listStyleType: "none",
            display: "inline-block",
            marginLeft: "2.5px",
          }}
        >
          <Link reloadDocument to={"/leaderboard"}>
            <button
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "black",
              }}
            >
              <span
                className="mdc-button__label"
                style={{
                  fontFamily: "Coffee",
                  fontSize: "10px",
                  color: "white",
                }}
              >
                Leaderboard
              </span>
            </button>
          </Link>
        </li>
      </div>

      <RockSVG ref={rockRef}></RockSVG>

      <p
        ref={statusRef}
        className="status"
        style={{ textAlign: "center", fontSize: "50px" }}
      >
        status
      </p>

      <progress
        style={{ accentColor: "black" }}
        value="0"
        max="10"
        id="progressBar"
      ></progress>

      <div className="actionDiv">
        <button
          className="childBtn"
          id="cookie"
          onClick={() => {
            setCookie();
            pressed[0] = 1;
          }}
        >
          <audio id="eatAudio" src={eat}></audio>
          <img src={cookie} alt="cookie" height="50px" />
          <br />
          feed cookie
        </button>
        <button
          className="childBtn"
          id="game"
          onClick={() => {
            setGame();
            pressed[1] = 1;
          }}
        >
          <audio id="gameAudio" src={pew}></audio>
          <img src={game} alt="controller" height="50px" />
          <br />
          play game
        </button>
        <button
          className="childBtn"
          id="sleep"
          onClick={() => {
            setSleep();
            pressed[2] = 1;
          }}
        >
          <audio id="snoreAudio" src={snore}></audio>
          <img src={sleep} alt="pillow" height="50px" />
          <br />
          sleep
        </button>
        <button
          className="childBtn"
          id="study"
          onClick={() => {
            setStudy();
            pressed[3] = 1;
          }}
        >
          <audio id="thinkAudio" src={hmm}></audio>
          <img src={book} alt="book" height="50px" />
          <br />
          study
        </button>
      </div>
    </>
  );
};

/* Dones
- Speed up animations w/ multiplier DONE
- Pause and Resume DONE
- Hard Mode DONE
- Animations onclick (a cookie will appear if feed cookie etc)
    - Add symbols for the actions above buttons first lol DONE
    - Add sounds? DONE
    - add animations for the items flying onclick DONE
- Death scene? DONE
- bg music DONE
- fix alert on lose auto refreshing DONE
- Local Leadaerboard DONE
    - Save scores to local storage DONE
    - Display scores in leaderboard DONE
    - Sort scores DONE
    - Add names functionality and date DONE
*/
