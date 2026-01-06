import weatherService from '../services/weather'
import {useEffect, useState} from "react";

const Weather = ({capital, geo}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.weatherByGeo(geo).then(result => {
            setWeather(result)
        })
    }, [])

    if (weather) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div>Temperature {weather.current.temp} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                     alt="Weather icon"/>
                <div>Wind {weather.current.wind_speed} m/s</div>
            </div>
        );
    }
}

export default Weather