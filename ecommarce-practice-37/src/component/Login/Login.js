import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
  handleSignOut,
  handleFbSignIn,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  document.title = "Login";

  let [newUser, setNewUser] = useState(false);
  let [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    picture: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((response) => {
        handleResponse(response, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((response) => {
        handleResponse(response, false);
    });
  };

  const handleResponse = (response, redirect) => {
      setUser(response);
      setLoggedInUser(response);
      if(redirect){
        history.replace(from);
      }
  }

  const fbSignIn = () => {
    handleFbSignIn().then((response) => {
        handleResponse(response, true);
    });
  };

  const handleType = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((response) => {
        handleResponse(response, true);
      });
      event.preventDefault();
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((response) => {
        handleResponse(response, true);
      });
      event.preventDefault();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Google Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Log in Using Facebook</button>
      {user.isSignedIn && (
        <div>
          <h2>
            Welcome, <span style={{ color: "green" }}>{user.name}</span>
          </h2>
          <p>
            Your email: <span style={{ color: "red" }}>{user.email}</span>
          </p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our Own Authentication</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleType}
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleType}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleType}
          id=""
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "sign In"} />
      </form>
      <p style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
        {user.error}
      </p>
      {user.success && (
        <p style={{ color: "green", fontWeight: "bold", fontSize: "25px" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
