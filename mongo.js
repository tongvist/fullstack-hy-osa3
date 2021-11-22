const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Enter password as the first argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.jhlfr.mongodb.net/contacts-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
	console.log('phonebook:');

	Person.find({}).then(result => {

		result.forEach(person => {
			return console.log(person.name, person.number);
		});

		mongoose.connection.close();

		process.exit(1);

	}).catch(error => console.log(error));

} else {
	const newUserName = process.argv[3] || null;
	const newNumber = process.argv[4] || '';

	const person = new Person({
		name: newUserName,
		number: newNumber
	});

	person.save().then(response => {
		console.log(`Added ${newUserName} number ${newNumber} to phonebook`);
		mongoose.connection.close();

	});
}
