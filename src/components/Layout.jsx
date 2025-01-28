import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const [toggleTheme, setToggleTheme] = useState(false);

  const activeMode = async () => {
    setToggleTheme(!toggleTheme);
    if (toggleTheme === true) {
      await localStorage.setItem("Theme", "dark_mode");
      document.body.classList.add("dark_mode");
      document.body.classList.remove("light_mode");
    }
    if (toggleTheme === false) {
      await localStorage.setItem("Theme", "light_mode");
      document.body.classList.add("light_mode");
      document.body.classList.remove("dark_mode");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Theme") === "dark_mode") {
      document.body.classList.add("dark_mode");
    } else if (localStorage.getItem("Theme") === "light_mode") {
      document.body.classList.add("light_mode");
      setToggleTheme(!toggleTheme);
    }
  }, []);

  return (
    <div className="">
      <main className="container">
        <Header activeMode={activeMode} toggleTheme={toggleTheme} />
        <Outlet context={{ toggleTheme, activeMode }} />
      </main>
    </div>
  );
};

export default Layout;
