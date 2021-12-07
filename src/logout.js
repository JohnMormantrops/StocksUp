import React from "react";
import { getAuth } from "firebase/auth";

const SignOut = ({ setTheAuthUser }) => {
  // Signout function
  const logout = () => {
    // sign out the user at firebase
    getAuth().signOut();
    // set this user to null
    // user is not authenticated.
    setTheAuthUser(null);
  };
  return (
    <div className="App">
      <h2>Are you sure you want to logout?</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default SignOut;
