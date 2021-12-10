import "./styles.css";
import React, { useState } from "react";
import Homepage from "./homepage";
import Portfolio from "./portfolio";
import Stonks from "./stonks";
import Logout from "./logout";
import LogIn from "./logIn";
import User from "./user";
import ShowBalance from "./showBalance";

//App is the parent for the pages of the app here we conditionally render the other pages in the app

export default function App() {
  // page state is used to conditionally render pages
  const [page, setPage] = useState("home");
  const [theAuthUser, setTheAuthUser] = useState(null);
  const [balance, setBalance] = useState(0); //users are given a balance initially set at 0
  const [balanceID, setBalanceID] = useState("");

  if (theAuthUser)
    return (
      <div className="App">
        <div className="navbar">
          {/* if user logs in we will see the homescreen and navbar the buttons navigate to the pages */}
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
  else return <LogIn setTheAuthUser={setTheAuthUser} setPage={setPage} />;
}
