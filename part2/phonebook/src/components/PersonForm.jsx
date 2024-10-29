import PropTypes from "prop-types";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handlePersonSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handlePersonSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handlePersonSubmit: PropTypes.func.isRequired,
};

export default PersonForm;
