import {useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterStr, setFilterStr] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.map(name => name.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
    }

    const personsToShow = filterStr.trim().length > 0
        ? persons.filter(p => p.name.toLowerCase().includes(filterStr.toLowerCase()))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={(event) => setFilterStr(event.target.value)}/>
            <h3>add a new</h3>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                newNumber={newNumber}
                onNameChange={(event) => setNewName(event.target.value)}
                onNumberChange={(event) => setNewNumber(event.target.value)}
            />
            <h3>Numbers</h3>
            <Persons persons={personsToShow}/>
        </div>
    )
}

export default App