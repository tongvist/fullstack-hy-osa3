const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

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

const generateId = () => {
    const existingIds = persons.map(person => person.id);
    let newId = Math.floor(Math.random() * 500);
    
    let createNew = true;
    while (createNew) {
        if (!existingIds.includes(newId)) {
            createNew = false;
            return newId;
        }
        else {
            newId = Math.floor(Math.random() * 500);
            continue;
        }
    }
}

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

    const infoPage = 
        `<p>Phonebook has info for ${numOfPeople} people</p>
        ${time}`;

    res.send(infoPage);
});

app.post("/api/persons", (req, res) => {
    let newPerson = req.body;
    if (!newPerson.name || newPerson.name.length === 0) {
        return res.status(400).json({error: "Missing name."});
    }
    else if (!newPerson.number || newPerson.number.length === 0) {
        return res.status(400).json({error: "Missing number."});
    }

    const exists = persons.find(person => person.name === newPerson.name);
    if (exists) {
        return res.status(400).json({error: `Person with the name ${exists.name} is already in the list` });
    }

    const id = generateId();
    newPerson.id = id;

    persons = persons.concat(newPerson);
    
    res.json(newPerson);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});