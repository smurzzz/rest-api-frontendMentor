import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Card from "../components/Card";
import { data, useOutletContext } from "react-router-dom";

const API_URL = "https://restcountries.com/v3.1/all";

const Home = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { toggleTheme } = useOutletContext();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const searchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.log("error fetching");
    }
  };

  useEffect(() => {
    searchCountries("Grenada");
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <section className="py-5 mt-25 px-5 md:px-20">
      <div className="flex md:items-center gap-5 lg:gap-0 justify-between flex-col lg:flex-row my-5">
        <div
          className={`${
            toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
          } cursor-pointer flex items-center gap-5  py-5 px-10 rounded-lg drop-shadow-xl w-full md:w-[500px]`}
        >
          <FaSearch className="text-[20px]" />
          <input
            className={`border-none outline-none w-full ${
              toggleTheme
                ? "placeholder:text-[var(--Very-Dark-Blue)]"
                : "placeholder:text-[var(--White)]"
            }`}
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <div
            className={`p-5 flex items-center justify-between cursor-pointer ${
              toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
            } drop-shadow-xl rounded-lg font-[600] w-[250px]`}
          >
            <p>Filter by Region</p>
            <IoIosArrowDown className="text-[20px]" onClick={handleToggle} />
          </div>
          {toggle ? (
            <div
              className={`absolute top-[80px] z-10 overflow-y-auto h-[200px] w-[250px] ${
                toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
              } drop-shadow-xl rounded-lg font-[600] p-5`}
            >
              {filteredCountries.map((country) => (
                <p className="mt-2" key={country.alpha2Code}>
                  {country.name.common}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {countries?.length > 0 ? (
        <div className="grid place-items-center mt-15 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-15">
          {filteredCountries.map((country) => (
            <Card key={country.name.common} data={country} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Home;
