require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server running on port', PORT));

app.get('/info', (req, res) => {
        let peoplesSize = 0
        Person
            .find({})
            .then(persons =>
                res.send(
                    `
                    <h2>Phonebook has into for ${persons.length}</h2>
                    <div>${new Date()}</div>
                  `
                )
            )
    }
)

app.get('/api/persons', (req, res, next) => {
    Person
        .find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).json({error: 'person not found'})
            } else {
                return res.json(person)
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({error: 'content missing'})
    }

    Person
        .findOne({name: req.body.name})
        .then(duplicate => {
            if (duplicate) {
                return res.status(400).json({error: 'name must be unique'})
            }

            const person = new Person({
                name: req.body.name,
                number: req.body.number
            });

            person.save().then(savedPerson => res.json(savedPerson))
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)