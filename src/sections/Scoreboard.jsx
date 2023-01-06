import "./Scoreboard.style.scss";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

import { useEffect, useState } from "react";

const Scoreboard = ({score}) => {
  const [players, setPlayers] = useState([""]);

  useEffect(() => {
    getPlayers();
  }, [score]);

  // GETTING DATA FROM DATABASE
  const getPlayers = async () => {
    const playersCollectionRef = await getDocs(collection(db, "players"));
    let results = [];
    playersCollectionRef.forEach((doc) => {
      results.push({
        displayName: doc.data().displayName,
        score: doc.data().score,
      });
    });

    setPlayers(results);
  };

  return (
    <div className="scoreboard">
      <h3>Top Players</h3>
      <div className="scoreboard-list">
        <div className="header">
          <p>NAME</p>
          <p>SCORE</p>
        </div>

        {players.map((player, index) => {
          return (
            <div key={index} className="player">
              <p>{player.displayName}</p>
              <p>{player.score} points</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scoreboard;
