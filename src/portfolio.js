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
  const [stockies, setStockies] = useState([]);
  const [selling, setSelling] = useState([]);
  const [newBalance, seNewBalance] = useState(balance);

  useEffect(() => {
    const q = query(
      collection(db, "Stockies"),
      where("userID", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let stockiesArrayFromFirebase = [];
      querySnapshot.forEach((doc) => {
        stockiesArrayFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      // using the useState from above
      setStockies(stockiesArrayFromFirebase);
    });
    return () => unsub();
  }, [currentUser]);

  async function removeFromPortfolio() {
    try {
      let id = selling[0].id;
      let s = selling[0].sell;
      let added = Number(newBalance + s);
      await updateDoc(doc(db, "Stockies", balanceID), {
        balance: added
      });
      console.log(s);

      selling.length = 0;
      console.log("DELETING STOCK");
      console.log(id);
      await deleteDoc(doc(db, "Stockies", id));
    } catch (error) {}
  }

  const sellStock = (object) => {
    console.log("BUTTON PRESSED");
    console.log(object);
    selling.length = 0;

    // console.log("SELLING");
    // console.log(selling);
    //let foundItem = stockies.filter(findItemByIndex(index));
    setSelling(selling.concat(object));
    //console.log(selling.length);
  };

  // const findItemByIndex(index){

  //   return function (object){
  //       return Object.id === index;
  //   };
  // }

  return (
    <div>
      <h1>PORTFOLIO</h1>
      <h2 className="value">
        VALUE:
        <br />$
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
          {selling.reduce((total, item) => {
            return total + item.sell;
          }, 0)}
          {console.log(selling)}
          {selling.length !== 0 && (
            <button className="empbtn" onClick={removeFromPortfolio}>
              REMOVE FROM PORTFOLIO
            </button>
          )}
          <ol>
            {selling.map((s, key) => (
              <li key={key}>
                {s.symbol} {s.name} ${s.sell}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <br />

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
              >
                BUY
              </button>
            </div>
            <div className="price">
              {/* TASK 1: Add a reduce function to caculate the total buy */}
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
