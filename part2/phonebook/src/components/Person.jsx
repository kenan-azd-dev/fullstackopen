import PropTypes from "prop-types";

const Person = ({ person, onDelete }) => {
  const name = person.name;
  const number = person.number;
  const id = person.id;
  return (
    <li>
      <span>
        {name} {number}
      </span>
      <button onClick={() => onDelete(id)}>delete</button>
    </li>
  );
};

Person.propTypes = {
  person: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Person;
