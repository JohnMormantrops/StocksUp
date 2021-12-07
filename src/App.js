import "./styles.css";
import React, { useState, useEffect } from "react";
import Homepage from "./homepage";
import Portfolio from "./portfolio";
import Stonks from "./stonks";
import Logout from "./logout";
import LogIn from "./logIn";
import User from "./user";
import ShowBalance from "./showBalance";
import app from "./firebase-config";
import bull from "./images/pngfind.com-bulls-png-6600169.png";
import {
  collection,
  query,
  onSnapshot,
  doc,
  where,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase-config";

export default function App() {
  const [page, setPage] = useState("home");
  const [theAuthUser, setTheAuthUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceID, setBalanceID] = useState("");

  if (theAuthUser)
    return (
      <div className="App">
        <div className="navbar">
          {/* <img className="navButton" src={bull} /> */}
          <button className="navButton" onClick={() => setPage("home")}>
            HOME
          </button>
          <button className="navButton" onClick={() => setPage("portfolio")}>
            PORTFOLIO
          </button>
          <button className="navButton" onClick={() => setPage("stonks")}>
            STONKS
          </button>
          <button className="navButton" onClick={() => setPage("User")}>
            {/* {theAuthUser.email} */}
            USER
            <br /> {}
          </button>
          <button className="navButton" onClick={() => setPage("logout")}>
            LOGOUT
          </button>
          <ShowBalance
            currentUser={theAuthUser}
            setBalance={setBalance}
            balance={balance}
            setBalanceID={setBalanceID}
          />
        </div>
        {/* {console.log(page)} */}
        {page === "home" && (
          <Homepage currentUser={theAuthUser} setPage={setPage} />
        )}
        {page === "portfolio" && (
          <Portfolio
            currentUser={theAuthUser}
            balance={balance}
            balanceID={balanceID}
          />
        )}
        {page === "stonks" && (
          <Stonks
            currentUser={theAuthUser}
            balance={balance}
            balanceID={balanceID}
          />
        )}
        {page === "logout" && <Logout setTheAuthUser={setTheAuthUser} />}
        {page === "User" && (
          <User
            currentUser={theAuthUser}
            balanceID={balanceID}
            balance={balance}
            setBalance={setBalance}
          />
        )}
      </div>
    );
  else return <LogIn setTheAuthUser={setTheAuthUser} />;
}
