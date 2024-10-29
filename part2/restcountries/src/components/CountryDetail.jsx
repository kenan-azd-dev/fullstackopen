import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

function CountryDetail({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital) {
      weatherService
        .getWeather(country.capital[0])
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
    }
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

CountryDetail.propTypes = {
  country: PropTypes.object.isRequired,
};

export default CountryDetail;
