import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

let NavBar = () => {
  let userContext = useContext(UserContext);
  let userName = userContext.user.currentUserName;
  let loggedIn = userContext.user.isLoggedIn;
  const navigate = useNavigate();
  let onOutClick = (event) => {
    event.preventDefault();
    userContext.setUser({
      ...userContext.user,
      isLoggedIn: false,
      currentUserId: null,
      currentUserName: null,
    });
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
      <a className="navbar-brand" href="/#">
        eCommerce
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {loggedIn ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/dashboard"
                activeclassname="active"
              >
                <i className="fa fa-dashboard"></i> Dashboard
              </NavLink>
            </li>
          ) : (
            ""
          )}

          {loggedIn ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/store"
                activeclassname="active"
              >
                <i className="fa fa-shopping-bag"></i> Store
              </NavLink>
            </li>
          ) : (
            ""
          )}

          {!loggedIn ? (
            <li>
              <NavLink className="nav-link" to="/" activeclassname="active">
                Login
              </NavLink>
            </li>
          ) : (
            ""
          )}

          {!loggedIn ? (
            <li>
              <NavLink
                className="nav-link"
                to="/register"
                activeclassname="active"
              >
                Register
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>

        {/* right box starts */}
        {loggedIn ? (
          <div style={{ marginRight: 100 }}>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle m-1"></i>
                  {userName}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/#" onClick={onOutClick}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        {/* right box ends */}
      </div>
    </nav>
  );
};

export default NavBar;
