import { useEffect } from "react";
import "./App.css";
import "./leaderboard.css";

import { Link } from "react-router-dom";

export const Leaderboard = () => {
  useEffect(() => {
    var scores = localStorage.getItem("darockScore");
    scores = scores.split(" ");
    console.log(scores);
    if (scores.length == 1 && scores[0] == null) {
      alert("No scores to display");
      return;
    }

  });

  return (
    <main>
      <header>
        <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
      </header>
      <section>
        <table>
          <thead id="base">
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
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
