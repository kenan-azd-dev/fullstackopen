import { useEffect, useState } from "react";

import "./index.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";

import personsService from "./services/persons";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("notification"); // New state for type

  function showTemporaryNotification(
    message,
    type = "notification",
    duration = 5000
  ) {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, duration);
  }

  const hook = () => {
    console.log("effect");

    const eventHandler = (initialPersons) => {
      setPersons(initialPersons);
    };

    const promise = personsService.getAll();
    promise.then(eventHandler);
  };

  useEffect(hook, []);

  if (!persons) {
    return null;
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handlePersonSubmit(event) {
    event.preventDefault();
    if (newName === "") {
      showTemporaryNotification("Name cannot be empty", "error");
      return;
    }
    if (newNumber === "") {
      showTemporaryNotification("Number cannot be empty", "error");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      const updatedPerson = {
        name: newName,
        number: newNumber,
        id: persons.find((person) => person.name === newName).id,
      };
      personsService
        .update(
          persons.find((person) => person.name === newName).id,
          updatedPerson
        )
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          showTemporaryNotification(`Updated ${newName}`, "notification");
          setNewName("");
          setNewNumber("");
        });
      return;
    }

    if (persons.some((person) => person.number === newNumber)) {
      showTemporaryNotification(
        `${newNumber} is already added to phonebook under name ${newName}.`,
        "error"
      );
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      showTemporaryNotification(`Added ${newName}`, "notification");
      setNewName("");
      setNewNumber("");
    });
  }

  const handlePersonDelete = (id) => {
    if (
      confirm(
        `Are you sure you want to delete ${
          persons.find((person) => person.id === id).name
        }?`
      )
    ) {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showTemporaryNotification(
            `Deleted ${persons.find((person) => person.id === id).name}`,
            "notification"
          );
        })
        .catch(() => {
          setPersons(newPersons);
          showTemporaryNotification(
            `${
              persons.find((person) => person.id === id).name
            } has already been removed from the phonebook.`,
            "error"
          );
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />{" "}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handlePersonSubmit={handlePersonSubmit}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} onDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
