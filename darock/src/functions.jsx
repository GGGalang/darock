//file for all the set functions

export function setCookie(){
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
};

export function setGame(){
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
};
export function setSleep(){
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
};
export function setStudy(){
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
};
