import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  let userContext = useContext(UserContext);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  let [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  let validate = () => {
    let errorsData = {};

    //email
    errorsData.email = [];

    //email can't blank
    if (!email) {
      errorsData.email.push("Email can't be blank");
    }

    //email regex
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    //password
    errorsData.password = [];

    //password can't blank
    if (!password) {
      errorsData.password.push("Password can't be blank");
    }

    //password regex
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
        );
      }
    }

    setErrors(errorsData);
  };
  useEffect(validate, [email, password]);

  let onLoginCLick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
            currentUserId: responseBody[0].id,
            currentUserName: responseBody[0].fullName,
          });
          navigate("/dashboard");
        } else {
          setLoginMessage(
            <span className="text-danger">Invalid Login Credential</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-danger">Unable to connect to Server</span>
        );
      }
    }
  };

  let isValid = () => {
    let valid = true;

    //reading all controls from 'errors' state
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

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
                name="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              ></input>
              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>
            {/* Email Ends */}

            {/* Password Starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              ></input>
              <div className="text-danger">
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </div>
            </div>
            {/* Password Ends */}
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{loginMessage}</div>
            <div>
              <button className="btn btn-primary m-2" onClick={onLoginCLick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
