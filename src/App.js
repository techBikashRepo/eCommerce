import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Store from "./Store";
import { UserContext } from "./UserContext";
import { useState } from "react";

const App = () => {
  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
