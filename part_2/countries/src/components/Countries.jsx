import CountryInfo from "./CountryInfo.jsx";

const Countries = ({list, onShowChange}) => {
    if (list && list.length !== 0) {
        return (
            <div>
                {
                    list.map(
                        country =>
                            <div key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => onShowChange(country)}>
                                    show
                                </button>
                                <CountryInfo country={country}/>
                            </div>
                    )
                }
            </div>
        )
    }
}

export default Countries