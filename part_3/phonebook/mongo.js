const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://movies-admin:${password}@cluster0-movies.avyl61u.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0-movies`

const isReadMode = process.argv.length === 3
const isUpdateMode = process.argv.length === 5

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const noteSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (isReadMode) {
    Person.find({}).then(persons => {
        console.log("phonebook:")
        persons.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    });
} else if (isUpdateMode) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}