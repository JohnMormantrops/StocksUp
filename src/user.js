import { useState } from "react";
import { db } from "./firebase-config";
import { updateDoc, doc } from "firebase/firestore";

//user can update their balance using this component
//balanceID and balance passed from parent component App.js
const User = ({ balanceID, balance }) => {
  const [newBalance, setNewBalance] = useState(0);

  //handle submit takes the newbalance from user input in form
  // and updates the value in the db
  const handleSubmit = async (balanceID, newBalance) => {
    await updateDoc(doc(db, "Stockies", balanceID), {
      balance: newBalance
    });
  };

  return (
    <div>
      <br />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(balanceID, newBalance);
        }}
      >
        <div>
          <input
            type="number"
            className="Addtobalance"
            placeholder="Add funds"
            //number input is added to user balance and set to the variable newbalance
            onChange={(e) => setNewBalance(balance + Number(e.target.value))}
          />
        </div>
        <button
          style={{
            width: "71%",
            maxWidth: "500px",
            color: "white",
            backgroundColor: "forestgreen"
          }}
        >
          Add to balance
        </button>
      </form>
    </div>
  );
};

export default User;
