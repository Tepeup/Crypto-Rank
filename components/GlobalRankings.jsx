import React, { useEffect, useState } from "react";
import firebase, { firestore } from "../firebase/firebase.utils";
import Link from "next/link";

export default function GlobalRankings() {
  const [globalRanking, setGlobalRanking] = useState([]);

  useEffect(async () => {
    const rankingsRef = firestore.collection("rankings");
    const snapshot = await rankingsRef.get();
    const results = [];
    snapshot.forEach((doc) => {
      results.push(doc.data().rankings);
    });

    var mergedResults = [].concat.apply([], results);

    const result = Object.values(
      mergedResults.reduce(function (r, { name, points, symbol, image }) {
        if (r[name]) {
          r[name].points += points;
        } else {
          r[name] = { name, points, symbol, image };
        }
        return r;
      }, Object.create(null))
    );

    const globalTop = result.sort(function (a, b) {
      return b.points - a.points;
    });

    const globalTopTen = globalTop.slice(0, 10);

    setGlobalRanking(globalTopTen);
  }, []);

  return (
    <div className="ranking-container">
      <h1>Global Top Ten Cryptocurrencies</h1>
      <div className="button-container">
        <Link href="/">(Vote Here)</Link>
      </div>
      {globalRanking.map((item, index) => (
        <div className="list-item" key={item.name}>
          <span className="coin-info">
            <p className="coin-rank">{index + 1}</p>
            <span className="coin-info">
              <img src={item.image} width="20" height="20" />
              <p className="coin-name">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
                <span className="coin-symbol">{item.symbol}</span>
              </p>
            </span>
          </span>
        </div>
      ))}
      <div className="donate-container">
        Donate BTC: 3Ebeo3vyRZXkqjswn1rsFuVtnLzmYU75BQ
      </div>
    </div>
  );
}
