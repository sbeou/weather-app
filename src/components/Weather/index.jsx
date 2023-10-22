import { useEffect, useState } from "react";
import './weatherStyle.scss';
import moment from "moment/moment";

function Weather({data}) {
    const [weathercode, setWeathercode] = useState();
    const [currentWeather, setCurrentWeather] = useState();
    const [daily, setDaily] = useState();
    const [location, setLocation] = useState();
    useEffect(() => {
        const getWeather = async () => {
                await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=is_day&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=6`).then(res => res.json()).then(data => {
            setCurrentWeather(data.current_weather)
            setWeathercode(parseInt(data.current_weather.weathercode, 10))
            setDaily(data.daily)
        });
        }
        getWeather();
    }, [data])
    useEffect(() => {
        const getApiLocation = async () => {
            await fetch(`https://geocode.maps.co/reverse?lat=${data.lat}&lon=${data.lon}`).then(res => res.json().then(data => {
                const getCity = () => {
                    if(data.address.city) {
                        return `${data.address.city},`
                    }
                    if(data.address.municipality) {
                        return `${data.address.municipality},`
                    }
                    if(data.address.city_district) {
                        return `${data.address.city_district},`
                    }
                    return ''
                }
                setLocation(`${getCity()} ${data.address.state}`)
            }))
        }
        getApiLocation();
    },[data])
    const weatherIcon = {
        0: 'fa-sun yellow',
        1: 'fa-sun-cloud yellow',
        2: 'fa-clouds',
        3: 'fa-clouds',
        45: 'fa-fog',
        48: 'fa-fog',
        51: 'fa-cloud-drizzle',
        53: 'fa-cloud-drizzle',
        55: 'fa-cloud-drizzle',
        56: 'fa-cloud-drizzle',
        57: 'fa-cloud-drizzle',
        61: 'fa-cloud-rain blue',
        63: 'fa-cloud-showers blue',
        71: 'fa-snowflake blue',
        73: 'fa-snowflake blue',
        74: 'fa-snowflake blue',
        77: 'fa-snowflake blue',
        80: 'fa-cloud-showers-heavy',
        81: 'fa-cloud-showers-heavy',
        82: 'fa-cloud-showers-heavy',
        85: 'fa-cloud-snow blue',
        86: 'fa-cloud-snow blue',
        95: 'fa-thunderstorm',
        96: 'fa-thunderstorm',
        99: 'fa-thunderstorm'
    }
    const weekDay = [
        "SEG",
        "TER",
        "QUA",
        "QUI",
        "SEX",
        "SAB",
        "DOM"
    ]
    return (
        <div className="result">
            <h2>{location}</h2>
            {weathercode !== undefined && (
                <div className="weathericon"><i className={`fad ${weatherIcon[weathercode]}`}></i></div>
            )} 
            <div className="temp">
                <div><i className="fad fa-thermometer-half"></i> {currentWeather?.temperature}ºC</div>
                <div><i className="fad fa-wind"></i> {currentWeather?.windspeed}km/h</div>
            </div>
            <ul className="dailyWeather">
                {daily && (   
                    daily.time.map((date,index) => (
                        <li key={date}><p>{weekDay[moment(date).day()]}</p>
                        <p><i className={`fad fs-xl ${weatherIcon[daily.weathercode[index]]}`}></i></p>
                        <p>{daily.temperature_2m_max[index]}ºC</p>
                        
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
export default Weather