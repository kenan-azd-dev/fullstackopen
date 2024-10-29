import PropTypes from "prop-types";

function SearchInput({ query, onQueryChange }) {
  return (
    <input
      type="text"
      placeholder="Enter country name"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
}

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default SearchInput;
