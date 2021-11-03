import React, { useState } from "react";

const Login = () => {
  const handleLogin = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const credentials = {
      username: username,
      password: password,
    };

    fetch("https://parallaxawards.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        window.localStorage.setItem("isLoggedIn", true);
        window.location.href = "/";
      } else {
        alert("Invalid credentials");
      }
    });
  };

  if (!window.localStorage.getItem("isLoggedIn")) {
    return (
      <div className="loginForm">
        <label>Username</label>
        <input type="text" name="username" id="username"></input>
        <label>Password</label>
        <input type="password" name="password" id="password"></input>
        <input
          type="submit"
          id="submitForm"
          onClick={() => handleLogin()}
          value="Login"
        ></input>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Login;
