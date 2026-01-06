import Weather from './Weather';

const CountryInfo = ({country}) => {
    if (country && country.show) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div>
                <div>Area {country.area}</div>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.svg} border="2"/>
                <Weather capital={country.capital[0]} geo={country.capitalInfo.latlng}/>
            </div>
        )
    }
}

export default CountryInfo