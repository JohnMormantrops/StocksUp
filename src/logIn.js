import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import firebaseApp from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

//this function fire upon the succesful signup of a new user
//settting them an initial balance of $1000 and adding it to database using their email as
// balance id
const addNewBalance = async (user) => {
  //  e.preventDefault();
  console.log("setting balance for user");
  console.log(user);
  await addDoc(collection(db, "Stockies"), {
    balance: 1000,
    userID: user.email
  });
};

//sign up takes the input from sign up form
const signUp = (auth, email, password, setTheAuthUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      //set the auth user passed down from app component allowing user to acces app
      //sign up takes the input from sign up form
      setTheAuthUser(user);
      addNewBalance(user);

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

//sign in an already signed up user
const signIn = (auth, email, password, setTheAuthUser, setPage) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      setTheAuthUser(user);
      setPage("home");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export default function ({ setTheAuthUser, setPage }) {
  //used email 1 and email 2 to avoid both forms being simultaniuosly filled
  //same with password, get auth from firebase app
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const auth = getAuth(firebaseApp);

  return (
    <div>
      <h1>
        stocks<text style={{ color: "forestgreen" }}>U</text>p
      </h1>
      <h1>Log In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(auth, email1, password1, setTheAuthUser, setPage);
        }}
      >
        <div className="Logy">
          <label className="Login">
            <input
              className="EandP"
              type="email"
              placeholder="Email"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              required
            ></input>
          </label>
          <label>
            <input
              className="EandP"
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>

      <h1>Sign Up</h1>
      <form
        onSubmit={(f) => {
          f.preventDefault();
          signUp(auth, email, password, setTheAuthUser);
        }}
      >
        <div className="Logy">
          <label>
            <input
              className="EandP"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(f) => setEmail(f.target.value)}
              required
            ></input>
          </label>
          <label>
            <input
              className="EandP"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(f) => setPassword(f.target.value)}
              required
            ></input>
          </label>
        </div>
        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
