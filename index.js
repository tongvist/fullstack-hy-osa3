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
		].join(' ');
	}
	));

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;

	Person.findByIdAndRemove(id)
		.then(result => {
			if (result) {
				return res.status(204).end();
			} else {
				return res.status(404).end();
			}
		})
		.catch(error => next(error));

});

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;

	Person.findById(id)
		.then(result => {
			if (result) {
				return res.json(result);
			} else {
				return res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(result => {
			res.json(result);
		})
		.catch(error => next(error));
});

app.get('/info', (req, res, next) => {

	Person.find({})
		.then(result => {
			if (result) {
				const numOfPeople = result.length;
				const time = new Date();

				const infoPage =
                `<p>Phonebook has info for ${numOfPeople} people</p>
                ${time}`;

				return res.send(infoPage);
			} else {
				return res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
	let newPerson = { ...req.body };

	const person = new Person(newPerson);

	person.save(newPerson)
		.then(result => {
			res.json(result);
		})
		.catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	const data = req.body;

	Person.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' })
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	console.log(error);
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).send(error.message);
	}
	next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});