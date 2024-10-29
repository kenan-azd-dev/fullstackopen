import PropTypes from "prop-types";

function CountryList({ countries, onShowCountry }) {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  onShowCountry: PropTypes.func.isRequired,
};

export default CountryList;
