import React from "react";
import { FiMoon } from "react-icons/fi";

const Header = ({ activeMode, toggleTheme }) => {
  return (
    <div
      className={`${
        toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
      } h-[100px] fixed top-0 left-0 z-20 w-full drop-shadow-xl flex items-center justify-between py-5 px-5 md:px-20`}
    >
      <p className="font-[800] text-[18px] md:text-3xl">Where in the world?</p>
      <div
        className="flex gap-2 items-center justify-center cursor-pointer"
        onClick={activeMode}
      >
        <FiMoon className="text-[20px]" />
        <p className=" font-[700]">Dark Mode</p>
      </div>
    </div>
  );
};

export default Header;
