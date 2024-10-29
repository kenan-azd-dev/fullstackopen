import { useState, useEffect } from "react";
import countryService from "./services/countryService";

import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import SearchInput from "./components/SearchInput";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const hook = () => {
    if (query.length > 0) {
      countryService
        .getAllCountries()
        .then((data) => {
          const filteredCountries = data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          if (filteredCountries.length > 10) {
            setCountries([]);
            setErrorMessage("Too many matches, specify another filter");
          } else {
            setCountries(filteredCountries);
            setErrorMessage("");
          }
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setErrorMessage("Error fetching data");
        });
    } else {
      setCountries([]);
      setErrorMessage("");
    }
  };

  useEffect(hook, [query]);

  if (!countries) {
    return null;
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      find Countries <SearchInput query={query} onQueryChange={setQuery} />
      {errorMessage && <p>{errorMessage}</p>}
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : countries.length === 1 ? (
        <CountryDetail country={countries[0]} />
      ) : (
        countries.length > 1 &&
        countries.length <= 10 && (
          <CountryList
            countries={countries}
            onShowCountry={handleShowCountry}
          />
        )
      )}
    </div>
  );
}

export default App;
