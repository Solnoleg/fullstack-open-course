import {useEffect, useState} from 'react'
import Countries from './components/Countries'
import Country from './components/Country'
import Notification from './components/Notification'
import countriesService from './services/countries'

function App() {
    const [notification, setNotification] = useState(null)
    const [countries, setCountries] = useState(null)
    const [newCountry, setNewCountry] = useState(null)
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (newCountry) {
            countriesService.find(newCountry).then(countries => {
                if (countries.length > 10) {
                    setNotification('Too many matches, specify another filter')
                    setCountries(null)
                    setCountry(null)
                } else if (countries.length === 1) {
                    countriesService.findOne(countries[0].name.common).then(country => {
                            setCountry(country)
                            setCountries(null)
                            setNotification(null)
                        }
                    )
                } else {
                    setCountries(countries)
                    setCountry(null)
                    setNotification(null)
                }
            });
        }
    }, [newCountry])

    const onChange = (event) => {
        setNewCountry(event.target.value)
    }

    return (
        <>
            <div>
                find countries <input onChange={onChange}/>
            </div>
            <Notification value={notification}/>
            <Countries list={countries}/>
            <Country country={country}/>
        </>
    )
}

export default App
