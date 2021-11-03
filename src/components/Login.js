import React from "react";

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
    })
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="loginForm">
      <label>Username</label>
      <input type="text" name="name" id="name"></input>
      <label>Password</label>
      <input type="password" name="firstname" id="firstname"></input>
      <input
        type="submit"
        id="submitForm"
        onClick={() => handleLogin()}
        value="Login"
      ></input>
    </div>
  );
};

export default Login;
