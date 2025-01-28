import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const API_URL = "https://restcountries.com/v3.1/all";

const Details = () => {
  const [country, setCountry] = useState(null);
  const { slug } = useParams();
  const [borderCountries, setBorderCountries] = useState([]);
  const { toggleTheme } = useOutletContext();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const selectedCountries = data.find(
          (item) => item.name.common.toLowerCase() === slug.toLowerCase()
        );
        setCountry(selectedCountries);

        if (selectedCountries && selectedCountries.borders) {
          const borderData = await Promise.all(
            selectedCountries.borders.map(async (borderCode) => {
              const borderCountry = data.find(
                (item) => item.cca3 === borderCode
              );
              return borderCountry ? borderCountry.name.common : null;
            })
          );
          setBorderCountries(borderData.filter(Boolean)); // Filter out null values
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchCountry();
  }, [slug]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const {
    name,
    population,
    region,
    subregion,
    capital,
    currencies,
    languages,
    tld,
    flags,
  } = country;

  return (
    <div className=" px-5 pb-10 pt-35 md:px-20 detailpage-text">
      <Link to="/">
        <div
          className={`flex mb-10 gap-2 rounded-sm drop-shadow-xl py-3 w-[140px] items-center justify-center ${
            toggleTheme ? "bg-[var(--White)]" : "bg-[var(--Dark-Blue)]"
          } `}
        >
          <FaLongArrowAltLeft className="text-[25px]" />
          <p>Back</p>
        </div>
      </Link>
      <div className="flex gap-10 w-full flex-col lg:flex-row">
        <div className="h-[400px] w-full">
          <img
            src={flags.svg}
            alt={flags.alt}
            className="rounded-lg w-full h-full drop-shadow-md"
          />
        </div>
        <div className="w-full">
          <p className="font-[800] text-[25px] mb-5">{name.common}</p>
          <div className="flex justify-between gap-7 xl:gap-0 lg:flex-row flex-col">
            <div className="">
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Native Name:</span>
                <p>{name.nativeName?.fra?.common || "N/A"}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Population:</span>
                <p>{population.toLocaleString()}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Region:</span>
                <p>{region}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Sub Region:</span>
                <p>{subregion}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Capital:</span>
                <p>{capital}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Top Level Domain:</span>
                <p>{tld}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Currencies:</span>
                {Object.values(currencies || {}).map((currency, index) => (
                  <p key={index}>{currency.name || "N/A"}</p>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="font-[600]">Languages:</span>
                <div className="flex flex-wrap w-[200px] gap-2">
                  {Object.values(languages || {}).map((language, index) => (
                    <p key={index}>{language || "N/A"},</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-center mt-[80px] mb-10 ">
            <p className="font-[600]">Border Countries:</p>
            <div className="flex items-center flex-wrap gap-3 justify-center">
              {borderCountries.length > 0
                ? borderCountries.map((border, index) => (
                    <p
                      className={` w-[150px] rounded-sm py-3 drop-shadow-xl text-center ${
                        toggleTheme
                          ? "bg-[var(--White)]"
                          : "bg-[var(--Dark-Blue)]"
                      }`}
                      key={index}
                    >
                      {border}
                    </p>
                  ))
                : "No borders"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
