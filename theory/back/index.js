require('dotenv').config()
const express = require('express');
const app = express();
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    Note
        .find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => response.json(note))
})

app.delete('/api/notes/:id', (request, response) => {
    Note.deleteOne({_id: request.params.id})
        .then(result => response.json({'deleted': result.deletedCount > 0}))
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log('Server running on port', PORT));