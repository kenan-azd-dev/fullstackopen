import { useState } from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const Title = ({ text }) => <h1>{text}</h1>;
Title.propTypes = {
  text: PropTypes.string.isRequired,
};

const Anecdote = ({ text }) => <q>{text}</q>;
Anecdote.propTypes = {
  text: PropTypes.string.isRequired,
};

const Votes = ({ votes }) => <p>Has {votes} votes</p>;
Votes.propTypes = {
  votes: PropTypes.number.isRequired,
};

const Quote = ({ anecdote, votes }) => (
  <div>
    <Anecdote text={anecdote} />
    <Votes votes={votes} />
  </div>
);
Quote.propTypes = {
  anecdote: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const incrementVotes = () => {
    setVotes((prevVotes) => {
      const newVotes = [...prevVotes];
      newVotes[selected] += 1;
      return newVotes;
    });
  };

  return (
    <>
      <Title text="Anecdote of the day" />
      <Quote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" onClick={incrementVotes} />
      <Button text="Next Anecdote" onClick={nextAnecdote} />
      <Title text="Anecdote with most votes" />
      <Quote
        anecdote={anecdotes[votes.indexOf(Math.max(...votes))]}
        votes={votes[votes.indexOf(Math.max(...votes))]}
      />
    </>
  );
};

export default App;
