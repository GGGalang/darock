import { useEffect } from "react";
import "./App.css";
import "./leaderboard.css";

import { Link } from "react-router-dom";

export const Leaderboard = () => {

    var toDisplay = [];

  useEffect(() => {
    var scores = JSON.parse(localStorage.getItem("darockScore"));
    console.log(scores);
    if (localStorage.getItem("darockScore") == "" || localStorage.getItem("darockScore") == null) {
      alert("No scores to display");
      return;
    }
    scores = scores.trim().split(" ");
    console.log(scores);
    scores.forEach((entry) => {
        entry = entry.replace(/[()]/g, '')
        let realEntry = entry.split(",");
        toDisplay.push(realEntry);
    })

    toDisplay = toDisplay.sort((a, b) => {
        return b[1] - a[1];
    });

    var index = 0;
    toDisplay.forEach((entry) => {
        console.log(entry);
        let row = document.createElement("tr");
        let rank = document.createElement("td");
        let player = document.createElement("td");
        let score = document.createElement("td");
        let date = document.createElement("td");

        rank.textContent = index + 1;
        player.textContent = entry[0];
        score.textContent = entry[1];
        date.textContent = entry[2];

        row.appendChild(rank);
        row.appendChild(player);
        row.appendChild(score);
        row.appendChild(date);

        document.querySelector("tbody").appendChild(row);
        index++;
    });

  });

  return (
    <main>
      <header>
        <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </main>
  );
};
