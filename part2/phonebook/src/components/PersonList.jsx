import PropTypes from "prop-types";

import Person from "./Person";

const PersonList = ({ persons, onDelete }) => {
  return persons.length === 0 ? (
    <div>No numbers found</div>
  ) : (
    persons.map((person) => (
      <Person key={person.name} person={person} onDelete={onDelete} />
    ))
  );
};

PersonList.propTypes = {
  persons: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PersonList;
