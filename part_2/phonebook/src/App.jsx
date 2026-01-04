import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import personService from "./services/persons.js"
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterStr, setFilterStr] = useState('')
    const [messageInfo, setMessageInfo] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.map(p => p.name.trim()).includes(newName.trim())) {
            if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personToReplace = persons.find(p => p.name === newName)
                personService
                    .update(personToReplace.id, {name: newName, number: newNumber})
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== personToReplace.id ? p : updatedPerson))
                        setMessageInfo(`Updated ${newName}`)
                        setNewName('')
                        setNewNumber('')

                        setTimeout(() => setMessageInfo(null), 3000)
                    })
            } else {
                console.log('person not added')
                setNewName('')
                setNewNumber('')
            }
        } else {
            personService
                .create({name: newName, number: newNumber})
                .then(createdPerson => {
                    setPersons(persons.concat(createdPerson))
                    setMessageInfo(`Added ${newName}`)
                    setNewName('')
                    setNewNumber('')

                    setTimeout(() => setMessageInfo(null), 3000)
                })
        }
    }

    const personsToShow = filterStr.trim().length > 0
        ? persons.filter(p => p.name.toLowerCase().includes(filterStr.toLowerCase()))
        : persons

    const getOnDelete = (person) => {
        if (confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(deletedPerson =>
                    setPersons(persons.filter(p => p.name !== deletedPerson.name))
                )
                .catch(error => {
                        alert(
                            `the person '${person.name}' was already deleted from server`
                        )
                        setPersons(persons.filter(p => p.name !== person.name))
                    }
                )
        } else {
            console.log('deletion cancelled')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={messageInfo} />
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
            <Persons persons={personsToShow} onDelete={getOnDelete}/>
        </div>
    )
}

export default App