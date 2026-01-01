import {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterStr, setFilterStr] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                setPersons(res.data)
            })
    }, [])

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