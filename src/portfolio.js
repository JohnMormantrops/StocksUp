import { useEffect, useState } from "react";
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

export default function ({ currentUser, balance, balanceID }) {
  //in this component we create an array stockies using usestate to store
  //the users data retrieved from firebase, the data in firebase is also labelled
  //stockies
  const [stockies, setStockies] = useState([]);
  //selling is  used to temprorarily add a stock to before selling
  const [selling, setSelling] = useState([]);
  //new balanec is used to temporarily store user balance before updating when selling stock
  const [newBalance, setNewBalance] = useState(balance);

  useEffect(() => {
    //query database to retrieve users stock data
    const q = query(
      collection(db, "Stockies"),
      //retreive data which contains the users id
      where("userID", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let stockiesArrayFromFirebase = [];
      querySnapshot.forEach((doc) => {
        //push data from firebase to temporary array
        stockiesArrayFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      // using useState we set the stockies array equal to the one retrieved from firebase
      setStockies(stockiesArrayFromFirebase);
    });
    return () => unsub();
  }, [currentUser]);

  async function removeFromPortfolio() {
    try {
      //selling array will only contain one item at index 0
      //this function deletes the item from the db and adds the value to the user balance
      let id = selling[0].id;
      let s = selling[0].sell;
      //variable added uses newbalance and adds the value
      //of the stock were selling
      let added = Number(newBalance + s);
      setNewBalance(added);
      //update the db to set the balance to added balance
      await updateDoc(doc(db, "Stockies", balanceID), {
        balance: added
      });

      //reset the array to be empty
      selling.length = 0;
      //remove the item from the db
      await deleteDoc(doc(db, "Stockies", id));
    } catch (error) {}
  }

  const sellStock = (object) => {
    //reset selling array
    selling.length = 0;
    //add new object to array
    setSelling(selling.concat(object));
  };

  return (
    <div>
      <h1>PORTFOLIO</h1>
      <h2 className="value">
        VALUE:
        <br />$
        {/* reduce function shows the value of the stocks in the portfolio */}
        {stockies
          .reduce((total, obj) => {
            return total + obj.buy;
          }, 0)
          .toFixed(2)}
      </h2>
      <div className="container">
        <div className="orders">
          <h2>BUYING:</h2>
          Buy from the Stonks page
        </div>

        <div className="orders">
          <h2>SELLING:</h2>
          Total cost: $
          {/* reduce function shows value of stock to be sold. initially 
          the selling array was showing multiple items but we changed it to one afterwards */}
          {selling.reduce((total, item) => {
            return total + item.sell;
          }, 0)}
          {/* show the selling button only when an object is added to the selling array*/}
          {selling.length !== 0 && (
            <button className="empbtn" onClick={removeFromPortfolio}>
              REMOVE FROM PORTFOLIO
            </button>
          )}
          <ol>
            {/* show the item in the selling array */}
            {selling.map((s, key) => (
              <li key={key}>
                {s.symbol} {s.name} ${s.sell}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <br />

      {/* map function to display the objects in the stokies array retrieved from the db */}
      {stockies.map((s, key) => (
        <div className="li" key={s.id}>
          <div className="buttons" onMouseOver={this.boxMouseOverHandler}>
            <b>{s.symbol}</b>
            <div style={{ alignItems: "center", width: "80%" }}>
              {s.name}
              <br />
              {s.sector}
            </div>
            <div className="price">
              <p style={{ margin: "3px" }}>${s.buy}</p>
              <button
                className="buybtn"
                style={{ background: "none" }}
                // onClick={() => this.props.buyStock(key)}
                //this button is inactive here but is active in the stocks page
              >
                BUY
              </button>
            </div>
            <div className="price">
              {/* sell button adds a stock to the selling array */}
              <p style={{ margin: "3px" }}>${s.sell}</p>
              <button
                style={{ background: "red", color: "white" }}
                className="sellbtn"
                onClick={() => {
                  sellStock(s);
                }}
              >
                SELL
              </button>
            </div>
          </div>
        </div>
      ))}

      <p>add stocks to add to your portfolio and keep track of them here!!</p>
    </div>
  );
}
