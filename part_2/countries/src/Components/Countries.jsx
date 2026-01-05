const Countries = ({list}) => {
    if (list && list.length !==0) {
        return (
            <div>
                {list.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </div>
        )
    }
}

export default Countries