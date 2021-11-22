const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log('Connecting to ', url);
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
    number: {type: String, required: true, unique: true}
});

personSchema.plugin(uniqueValidator);

// Modify personSchemas toJSON method to return the id as a string in a new field 'id' 
// It is an object by default even though it looks like a string
// Also delete original _id and __v properties
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);