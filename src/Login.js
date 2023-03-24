import React, { useState, useEffect } from "react";

const Login = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login - eCommerce";
  }, []);

  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>
          <div className="card-body border-bottom border-success">
            {/* Email Starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            {/* Email Ends */}

            {/* Password Starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            {/* Password Ends */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
