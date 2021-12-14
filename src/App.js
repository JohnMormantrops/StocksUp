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

  //if authorised render navbar and homepage otherwise show login page
  if (theAuthUser)
    return (
      <div className="App">
        <div className="navbar">
          {/* if user logs in we will see the homescreen and navbar the buttons navigate to the pages buttons
          change state of page*/}
          <button className="navButton" onClick={() => setPage("home")}>
            HOME
          </button>
          <button className="navButton" onClick={() => setPage("portfolio")}>
            PORTFOLIO
          </button>
          <button className="navButton" onClick={() => setPage("stonks")}>
            STOCKS
          </button>
          <button className="navButton" onClick={() => setPage("User")}>
            USER
            <br /> {}
          </button>
          <button className="navButton" onClick={() => setPage("logout")}>
            LOGOUT
          </button>
          {/* show balance component renders balance to screen */}
          <ShowBalance
            currentUser={theAuthUser}
            setBalance={setBalance}
            balance={balance}
            setBalanceID={setBalanceID}
          />
        </div>
        {page === "home" && (
          //   homepage component shows additional buttons and info
          <Homepage currentUser={theAuthUser} setPage={setPage} />
        )}
        {page === "portfolio" && (
          <Portfolio
            //   portfolio component show users stcoks from db
            currentUser={theAuthUser}
            balance={balance}
            balanceID={balanceID}
          />
        )}
        {page === "stonks" && (
          // stocks component shows stock
          <Stonks
            currentUser={theAuthUser}
            balance={balance}
            balanceID={balanceID}
          />
        )}
        {page === "logout" && <Logout setTheAuthUser={setTheAuthUser} />}
        {page === "User" && (
          <User
            //user component upodat balance
            currentUser={theAuthUser}
            balanceID={balanceID}
            balance={balance}
            setBalance={setBalance}
          />
        )}
      </div>
    );
  // login page user firebase auth for user each login also sets page state to home
  else return <LogIn setTheAuthUser={setTheAuthUser} setPage={setPage} />;
}
