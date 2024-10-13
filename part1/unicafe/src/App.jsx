import { useState } from "react";
import PropTypes from "prop-types";

const Header = ({ text }) => <h1>{text}</h1>;
Header.propTypes = {
  text: PropTypes.string.isRequired,
};

const FeedbackButton = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
FeedbackButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
StatisticLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positivePercentage = total > 0 ? (good * 100) / total : 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine
          text="Positive"
          value={`${positivePercentage.toFixed(2)} %`}
        />
      </tbody>
    </table>
  );
};
Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGood = () => setGood(good + 1);
  const handleSetNeutral = () => setNeutral(neutral + 1);
  const handleSetBad = () => setBad(bad + 1);

  return (
    <>
      <Header text="Give Feedback" />

      <FeedbackButton text="Good" onClick={handleSetGood} />
      <FeedbackButton text="Neutral" onClick={handleSetNeutral} />
      <FeedbackButton text="Bad" onClick={handleSetBad} />

      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
