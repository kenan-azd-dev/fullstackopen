import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationClass = type === "error" ? "error" : "notification"; // Conditional class

  return <div className={notificationClass}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Notification;
