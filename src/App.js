import "./App.css";
import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Store from "./Store";
import ProductsList from "./ProductsList";
import { UserContext } from "./UserContext";

let initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};
// Reducer
let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };

    case "logou":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state;
  }
};

const App = () => {
  let [user, dispatch] = useReducer(reducer, initialUser);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <NavBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
