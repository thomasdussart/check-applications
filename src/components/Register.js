import React from "react";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();

    const username = document.getElementById("exampleInputUsername").value;
    const password = document.getElementById("exampleInputPassword").value;

    const data = {
      username,
      password,
    };

    fetch("https://parallaxawards.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <form>
        <div className="register-form-group">
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            aria-describedby="passwordHelp"
            placeholder="Enter password"
          />
          <input type="submit" value="Register" onClick={handleRegister} />
        </div>
      </form>
    </div>
  );
};

export default Register;
