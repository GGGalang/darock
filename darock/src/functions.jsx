//file for all the set functions

export function setCookie() {
  document.getElementById("cookie").style.backgroundColor = "green";
  const el = document.getElementById("cookieAnim");

  el.style.display = "block";
  el.classList.remove("cookie");
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 1000);
  el.classList.add("cookie");

  document.getElementById("eatAudio").play();
  return 1;
}

export function setGame() {
  document.getElementById("game").style.backgroundColor = "green";

  const el = document.getElementById("gameAnim");

  el.style.display = "block";
  el.classList.remove("game");
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 1000);
  el.classList.add("game");

  document.getElementById("gameAudio").play();
  return 1;
}
export function setSleep() {
  document.getElementById("sleep").style.backgroundColor = "green";

  const el = document.getElementById("sleepAnim");

  el.style.display = "block";
  el.classList.remove("sleep");
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 1000);
  el.classList.add("sleep");

  document.getElementById("snoreAudio").play();
  return 1;
}
export function setStudy() {
  document.getElementById("study").style.backgroundColor = "green";

  const el = document.getElementById("bookAnim");

  el.style.display = "block";
  el.classList.remove("book");
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 1000);
  el.classList.add("book");

  document.getElementById("thinkAudio").play();
  return 1;
}

//power ups
export function generatePowerUp() {
  const upArr = [
    "pointsAnim",
    "timeAnim",
    "cookieSafe",
    "gameSafe",
    "sleepSafe",
    "studySafe",
  ];

  const powerUp = Math.floor(Math.random() * 6);
  console.log(upArr[powerUp]);

  const el = document.getElementById(upArr[powerUp]);

  el.style.display = "block";
  el.classList.remove(upArr[powerUp]);
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 8000);
  el.classList.add(upArr[powerUp]);

  document.getElementById("shine").play();
}

export function cookieUp(){
  let x = 0;
  var cookies = setInterval(function () {
    setCookie();
    if (x == 25) {
      clearInterval(cookies);
    }
  }, 200);
  document.getElementById("cookieSafe").style.display = "none";
  document.getElementById("eatAudio").play();
};

export function gameUp(){
  let x = 0;
  var games = setInterval(function () {
    setGame();
    if (x == 25) {
      clearInterval(games);
    }
  }, 200);
  document.getElementById("gameSafe").style.display = "none";
  document.getElementById("gameAudio").play();
};

export function sleepUp(){
  let x = 0;
  var sleeps = setInterval(function () {
    setSleep();
    if (x == 25) {
      clearInterval(sleeps);
    }
  }, 200);
  document.getElementById("sleepSafe").style.display = "none";
  document.getElementById("snoreAudio").play();
};

export function studyUp(){
  let x = 0;
  var studys = setInterval(function () {
    setStudy();
    if (x == 25) {
      clearInterval(studys);
    }
  }, 200);
  document.getElementById("studySafe").style.display = "none";
  document.getElementById("thinkAudio").play();
};
