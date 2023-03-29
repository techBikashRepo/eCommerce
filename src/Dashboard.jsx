import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - eCommerce";
  }, []);
  let userContext = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{userContext.user.currentUserName}</h2>
    </div>
  );
};

export default Dashboard;
