import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Card = (props) => {
  const { flags, name, population, region, capital } = props.data;
  const { toggleTheme } = useOutletContext();

  return (
    <Link
      className={`h-[400px] w-[320px] sm:w-[400px] md:w-full rounded-lg ${
        toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
      } drop-shadow-xl`}
      to={name.common}
    >
      <img
        src={flags.png}
        alt={flags.alt}
        className="h-1/2 rounded-t-lg w-full drop-shadow-md"
      />
      <div className="w-full p-5">
        <p className="font-[800] text-[18px]">{name.common}</p>
        <div className="mt-3 homepage-text flex flex-col gap-1">
          <div className="flex gap-2">
            <p className="font-[600]">Population:</p>
            <p>{population}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-[600]">Region:</p>
            <p>{region}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-[600]">Capital:</p>
            <p>{capital}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
