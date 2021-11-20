const express = require('express');
const app = express();

const PORT = 3001;

let persons = [
      {
        name: "Arto Hellas",
        number: "040-9876543",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendick",
        number: "39-23-6423122",
        id: 4
      }
    ]

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find(person => {
        return person.id === id});
    if (person) {
        return res.json(person);
    } 

    res.status(404).end();
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    const numOfPeople = persons.length;
    const time = new Date();
    // console.log(numOfPeople, time);

    const infoPage = 
        `<p>Phonebook has info for ${numOfPeople} people</p>
        ${time}`;

    res.send(infoPage);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});