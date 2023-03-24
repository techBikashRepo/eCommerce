import { useEffect } from "react";

const NoMatchPage = () => {
  useEffect(() => {
    document.title = "404";
  }, []);
  return (
    <div>
      <h2>Page Not Found Component</h2>
    </div>
  );
};

export default NoMatchPage;
