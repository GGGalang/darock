//file for all the set functions

export function masterSet(ele){
  const actions = ["cookie", "game", "sleep", "study"];
  const anims = ["cookieAnim", "gameAnim", "sleepAnim", "bookAnim"];
  const audios = ["eatAudio", "gameAudio", "snoreAudio", "thinkAudio"];
  document.getElementById(actions[ele]).style.backgroundColor = "green";
  const el = document.getElementById(anims[ele]);

  el.style.display = "block";
  el.classList.remove(actions[ele]);
  void el.offsetWidth;
  setTimeout(() => {
    el.style.display = "none";
  }, 1000);
  el.classList.add(actions[ele]);

  document.getElementById(audios[ele]).play();
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