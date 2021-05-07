import React, { useState } from "react";
import { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import SearchIcon from "@material-ui/icons/Search";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Link from "next/link";
import firebase, { firestore } from "../firebase/firebase.utils";
import CustomButton from "../components/CustomButton";
import CustomLink from "../components/CustomLink";
import CloseIcon from "@material-ui/icons/Close";

export default function RankingList() {
  //JSON of all the supported currencies
  const listofCurrencies = require("../assets/supported.json");

  //Hooks
  const [search, setSearch] = useState(null);
  const [myTopTen, setTopTen] = useState([
    {
      id: "btc",
      name: "bitcoin",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    },
    {
      id: "eth",
      name: "ethereum",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    },
  ]);
  const [submitCheck, setSubmitCheck] = useState(false);

  const searchCrypto = (event) => {
    let keyword = event.target.value;
    if (keyword === "") {
      setSearch(" ");
    } else {
      setSearch(keyword.toLowerCase());
    }
  };

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === obj.id) return true;
    }
    return false;
  }

  const addCurrency = (a, b, c) => {
    if (myTopTen.length < 10) {
      const topTenCopy = [...myTopTen];
      const newItem = { id: b, name: a, image: c };
      if (containsObject(newItem, topTenCopy)) {
        setTopTen(myTopTen);
      } else {
        topTenCopy.push(newItem);
        setTopTen(topTenCopy);
      }
    }
  };

  const deleteItem = (x) => {
    const topTenCopy = [...myTopTen];
    for (var i = 0; i < topTenCopy.length; i++) {
      if (topTenCopy[i].id === x) {
        topTenCopy.splice(i, 1);
        setTopTen(topTenCopy);
      }
    }
  };

  const submitData = async () => {
    const topTenCopy = [...myTopTen];
    const rankings = topTenCopy.map((data, index) => ({
      name: data.name,
      symbol: data.id,
      rank: index + 1,
      points: convertRankToPoints(index),
      image: data.image,
    }));

    await firestore
      .collection("rankings")
      .doc()
      .set({ rankings })
      .catch((error) => {
        alert(`Error`, error);
      });

    setSubmitCheck(true);
    setTopTen([]);
    setSearch(null);
  };

  const convertRankToPoints = (rank) => {
    return 10 - rank;
  };

  return (
    <div className="ranking-container">
      <h1>My Top Ten Cryptocurrencies</h1>
      <div className="button-container">
        <CustomLink type="enabled" text="VIEW GLOBAL TOP TEN" link="global" />
      </div>

      {submitCheck ? (
        <div className="thank-you-message">VOTE SUBMITTED!</div>
      ) : (
        <div>
          {" "}
          <ReactSortable
            list={myTopTen}
            setList={setTopTen}
            className="ranked-container"
            animation="150"
          >
            {myTopTen.map((item, index) => (
              <div key={item.id} className="list-item">
                <span className="coin-info">
                  <p className="coin-rank">{index + 1}</p>
                  <span className="coin-info">
                    <img src={item.image} width="20" height="20" />
                    <p className="coin-name">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
                      <span className="coin-symbol">
                        {item.id.toUpperCase()}
                      </span>
                    </p>
                  </span>
                </span>

                <span className="list-buttons">
                  <DragIndicatorIcon className="drag-button" title="drag" />
                  <button
                    onClick={() => deleteItem(item.id)}
                    title="remove"
                    className="remove-button"
                  >
                    <CloseIcon />
                  </button>
                </span>
              </div>
            ))}
          </ReactSortable>
          <div className="button-container">
            {myTopTen.length > 0 ? (
              myTopTen.length > 4 ? (
                <CustomButton type="enabled" text="SUBMIT" click={submitData} />
              ) : (
                <div className="add-more">
                  <CustomButton type="disabled" text="SUBMIT" />
                  <span className="error-message">
                    (minimum of five to submit)
                  </span>
                </div>
              )
            ) : null}
          </div>
          <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search for Cryptocurrencies to Add"
              onChange={(e) => searchCrypto(e)}
            />
          </div>
          <br></br>
          <div className="search-results">
            {listofCurrencies
              .filter((data) => data.id.includes(search))
              .map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`coin-search-list ${
                      containsObject(
                        {
                          id: data.symbol,
                          name: data.id,
                          image: data.image,
                        },
                        myTopTen
                      )
                        ? "added"
                        : null
                    }`}
                    onClick={() =>
                      addCurrency(data.id, data.symbol, data.image)
                    }
                  >
                    <div className="coin-name">
                      {data.id.charAt(0).toUpperCase() + data.id.slice(1)}
                      <span className="coin-symbol">
                        {data.symbol.toUpperCase()}
                      </span>
                    </div>
                    <button className="add-button">&#x2b;</button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
