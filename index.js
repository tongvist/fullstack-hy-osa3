require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// Attach a 'data' token to POST requests to log the request body
// Returns a function with the name of the first parameter
// To get the value, needs to be called with (req, res)
morgan.token('data', function getBody (req, res) {
    return req.method === 'POST' ? JSON.stringify(req.body) : null;
});

app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens.data(req, res) // tokens.data -function defined above with morgan.token('name', cb)
        ].join(' ')
    }
))

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

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));

});

app.get("/api/persons/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const person = persons.find(person => {
        return person.id === id});
    if (person) {
        return res.json(person);
    } 

    res.status(404).end();
});

app.get("/api/persons", (req, res, next) => {
    Person.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error));
});

app.get("/info", (req, res, next) => {
    const numOfPeople = persons.length;
    const time = new Date();

    const infoPage = 
        `<p>Phonebook has info for ${numOfPeople} people</p>
        ${time}`;

    res.send(infoPage);
});

app.post("/api/persons", (req, res, next) => {
    let newPerson = {...req.body};
    
    if (!newPerson.name || newPerson.name.length === 0) {
        return res.status(400).json({error: "Missing name."});
    }
    else if (!newPerson.number || newPerson.number.length === 0) {
        return res.status(400).json({error: "Missing number."});
    }

    const person = new Person(newPerson);

    person.save(newPerson)
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown endpoint"});
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    next(error);
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});