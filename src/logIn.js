import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import firebaseApp from "./firebase-config";
import app from "./App";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import avatar from "./images/LogInAvatar.jpg";

const addNewBalance = async (user) => {
  //  e.preventDefault();
  console.log("setting balance for user");
  console.log(user);
  await addDoc(collection(db, "Stockies"), {
    balance: 1000,
    userID: user.email
  });
};

const signUp = (auth, email, password, setTheAuthUser, setPage) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      console.log("HELLO");
      console.log(user);
      console.log("ID?????");
      console.log(user.uid);
      setTheAuthUser(user);
      addNewBalance(user);
      setPage("home");

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

const signIn = (auth, email, password, setTheAuthUser, setPage) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      console.log("HERE SIGNED IN USER");
      console.log(user);
      console.log(user);
      setTheAuthUser(user);
      setPage("home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not valid");
      console.log(errorMessage);
      const user = null;
      console.log(user);
      alert(errorMessage);
    });
};

export default function ({ setTheAuthUser, setBalance, balance, setPage }) {
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
      {/* <img
        className="background"
        src={avatar}
        alt="Login Avatar"
        width="100%"
        height="500px"
      /> */}
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
          signUp(auth, email, password, setTheAuthUser, setPage);
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
