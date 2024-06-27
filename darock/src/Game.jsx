import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

//assets: images
import cookie from "./assets/cookie.png";
import game from "./assets/game.jpg";
import sleep from "./assets/sleep.jpg";
import book from "./assets/book.png";

//assets: sounds
import eat from "./assets/eat.mp3";
import pew from "./assets/pew.mp3";
import snore from "./assets/snore.mp3";
import hmm from "./assets/hmm.mp3";
import bgm from "./assets/bgm.mp3";
import shine from "./assets/shine.mp3";

//assets: powerups and misc
import boom from "./assets/boom.gif";
import explosion from "./assets/explosion.mp3";
import alarm from "./assets/alarm.mp3";
import plus from "./assets/plus.jpg";
import time from "./assets/time.png";
import { RockSVG } from "./Rock.jsx";

//functions import
import { masterSet, generatePowerUp } from "./functions";

/* ToDos:
- Power ups, question mark
  - Plus Points DONE
  - Time Stop  DONE
  - Button Safe (one button auto click for a set time) DONE
- Better UI
    - better scores
    - better buttons
    - not UI but better button setting code lol
    - better svg code (maybe make it component?)
    - better code overall. componentialize them!
*/

export const Game = () => {
  //array to check which actions are pressed
  var pressed = [0, 0, 0, 0];

  //game variables
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
  const plusRef = useRef(null);
  const timeRef = useRef(null);

  //hard mode; changes difficulty on next round
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

  //generate and update status and speed
  function updateStatus() {
    state = Math.floor(Math.random() * 4);
    statusRef.current.innerHTML = "Darock is " + states[state] + "!";
    rockRef.current.style.color = stateColors[state];
    rockRef.current.style.animationDuration = animationSpeed + "s";
  }

  //cant be placed in functions file; will break
  //power up to add points
  const addPoints = () => {
    score += 10;
    scoreRef.current.innerHTML = "Score: " + score + "(+ Power Up)";
    document.getElementById("thinkAudio").play();
    plusRef.current.style.display = "none";
  };
  //pause time power up; literally just pauses btw
  const pauseTime = () => {
    paused = !paused;
    alert(
      "Power Up: Pause! Get a breather, click all actions, while your score is: " +
        score
    );
    document.getElementById("timeSafe").style.display = "none";
    document.getElementById("alarm").play();
  };

  //master function for action-related powerups
  function loopPress(i) {
    const actions = ["cookie", "game", "sleep", "study"];
    const displays = ["cookieSafe", "gameSafe", "sleepSafe", "studySafe"];
    const audios = ["eatAudio", "gameAudio", "snoreAudio", "thinkAudio"];
    var x = 0;
    document.getElementById(displays[i]).style.display = "none";
    var press = setInterval(() => {
      try {
        document.getElementById(actions[i]).style.backgroundColor = "green";
        pressed[i] = 1;
        document.getElementById(audios[i]).play();
      } catch (e) {
        console.log(e);
        clearInterval(press);
      }
      x++;
      if (x == 24) {
        clearInterval(press);
      }
    }, 200);
  }

  function startGame() {
    updateStatus();

    //timer
    var statusTimer = setInterval(function () {
      if (paused == true) {
        clearInterval(statusTimer);
        return;
      }

      //roll a dice to generate power up; 8 is your number
      if (Math.floor(Math.random() * 30) == 8) {
        generatePowerUp();
      }

      //if time HAS run out section
      if (timeleft <= 0) {
        clearInterval(statusTimer);
        console.log(state);

        //if the correct action is pressed, update score, change vars, next round
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
          //if the wrong action is pressed, game over
          document.getElementById("rock").style.display = "none";
          document.getElementById("boom").style.display = "block";
          document.getElementById("explosionAudio").play();

          setTimeout(() => {
            alert("Game Over! Your score is: " + score);

            //generate and store data for leaderboard
            if (document.getElementById("name").value == "") {
              document.getElementById("name").value = "Anonymous";
            }

            document.getElementById("name").value = document
              .getElementById("name")
              .value.replaceAll(/\s/g, "_");

            var date = new Date();
            var dateStr =
              date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

            //store it to local
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
            //auto nav to that page on death
            nav("/leaderboard");
          }, 1000);
        }
      }
      //everytime the function runs, update the progress bar
      document.getElementById("progressBar").value = 10 - timeleft;
      timeleft -= 1;
    }, 1000 * multiplier);
  }

  //pause and resume function
  const update = () => {
    paused = !paused;
    if (paused == true) {
      alert("Game Paused! Your current score is: " + score);
    } else {
      startGame();
    }
  };

  useEffect(() => {
    //initial setup onload of everything; ask if ready
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

  //i am sorry for this mess of code; i will try to add comments best i can and group eles
  return (
    <>
      {/* Top UI Elements and BGM */}
      <>
        <audio id="bgm" src={bgm} loop={true} />
        <audio id="shine" src={shine}></audio>
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
      </>

      {/* Power Ups */}
      <>
        <button
          ref={plusRef}
          id="pointsAnim"
          onClick={addPoints}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={plus}
            alt=""
          />
        </button>

        <button
          ref={timeRef}
          id="timeAnim"
          onClick={pauseTime}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={time}
            alt=""
          />
          <audio id="alarm" src={alarm}></audio>
        </button>

        <button
          id="cookieSafe"
          onClick={() => {
            loopPress(0);
          }}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={cookie}
            alt=""
          />
        </button>

        <button
          id="gameSafe"
          onClick={() => {
            loopPress(1);
          }}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={game}
            alt=""
          />
        </button>

        <button
          id="sleepSafe"
          onClick={() => {
            loopPress(2);
          }}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={sleep}
            alt=""
          />
        </button>

        <button
          id="studySafe"
          onClick={() => {
            loopPress(3);
          }}
          style={{
            position: "absolute",
            height: "100px",
            width: "100px",
            background: "none",
            border: "none",
          }}
        >
          <img
            style={{ position: "absolute", height: "100px" }}
            src={book}
            alt=""
          />
        </button>
      </>

      {/* Action Anims and Explosion Death */}
      <>
        <img className="cookie" id="cookieAnim" src={cookie} alt="" />
        <img className="game" id="gameAnim" src={game} alt="" />
        <img className="sleep" id="sleepAnim" src={sleep} alt="" />
        <img className="book" id="bookAnim" src={book} alt="" />

        <img id="boom" src={boom} alt="" />
        <audio id="explosionAudio" src={explosion}></audio>
      </>

      {/* Middle Top UI Elements */}
      <>
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
      </>

      {/* THE ROCK */}
      <RockSVG ref={rockRef}></RockSVG>

      {/* Action Buttons and Everything Else */}
      <>
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
              pressed[0] = masterSet(0);
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
              pressed[1] = masterSet(1);
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
              pressed[2] = masterSet(2);
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
              pressed[3] = masterSet(3);
            }}
          >
            <audio id="thinkAudio" src={hmm}></audio>
            <img src={book} alt="book" height="50px" />
            <br />
            study
          </button>
        </div>
      </>
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
