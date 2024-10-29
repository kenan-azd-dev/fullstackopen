import PropTypes from "prop-types";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);
Course.propTypes = {
  course: PropTypes.object.isRequired,
};

export default Course;
