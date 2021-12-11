import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, query, onSnapshot, where } from "firebase/firestore";

const ShowBalance = ({ currentUser, setBalance, setBalanceID, balance }) => {
  const [balanceObj, setBalanceObj] = useState([]);
  //this component queries the db for the user balance
  //balance is set to 1000 initially on sign up and the users email is added as an id for
  //the balance in the db. so we can query using the user email
  useEffect(() => {
    const q = query(
      collection(db, "Stockies"),
      where("userID", "==", currentUser.email)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let balanceFromFireBase = [];
      querySnapshot.forEach((doc) => {
        balanceFromFireBase.push({ ...doc.data(), id: doc.id });
      });
      // using the useState from above and set it to balance from firebase
      setBalanceObj(balanceFromFireBase);
    });

    return () => unsub();
  }, [currentUser]);

  try {
    // this try catch sets our balance to balance from db
    // and id as user email
    setBalance(balanceObj[0].balance);
    setBalanceID(balanceObj[0].id);
  } catch (error) {
    // ...
  }

  return (
    <div className="showBalance">
      {/* display the user name and balance to 2 decimals*/}
      {currentUser.email}
      <br />
      balance: ${balance.toFixed(2)}
    </div>
  );
};

export default ShowBalance;
