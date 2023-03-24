import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
