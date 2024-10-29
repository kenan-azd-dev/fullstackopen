import PropTypes from "prop-types";

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      <p>
        <b>total of {total} exercises</b>
      </p>
    </>
  );
};
Total.propTypes = {
  parts: PropTypes.array.isRequired,
};

export default Total;
