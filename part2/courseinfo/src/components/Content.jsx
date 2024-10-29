import PropTypes from "prop-types";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
Content.propTypes = {
  parts: PropTypes.array.isRequired,
};

export default Content;
