import { useState } from "react";
import './weatherStyle.scss';

function Weather({data}) {
    const [temperature, setTemperature] = useState();
    const [windspeed, setWindspeed] = useState();
    const [weathercode, setWeathercode] = useState();
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current_weather=true`).then(res => res.json()).then(data => {
        setTemperature(data.current_weather.temperature)
        setWindspeed(data.current_weather.windspeed)
        setWeathercode(parseInt(data.current_weather.weathercode, 10))
    });
    let weatherIcon = 'fa-exclamation-triangle'
    if (weathercode === 0) {weatherIcon = 'fa-sun yellow'}
    if (weathercode === 1) {weatherIcon = 'fa-sun-cloud yellow'}
    if (weathercode === 2 || weathercode === 3) {weatherIcon = 'fa-clouds'}
    if (weathercode === 45 || weathercode === 48) {weatherIcon = 'fog'}
    if (weathercode === 51 || weathercode === 53) {weatherIcon = 'cloud-drizzle'}
    if (weathercode > 54 && weathercode < 58) {weatherIcon = 'cloud-drizzle'}
    if (weathercode === 61) {weatherIcon = 'fa-cloud-rain blue'}
    if (weathercode === 63) {weatherIcon = 'fa-cloud-showers blue'}
    if (weathercode === 65) {weatherIcon = 'fa-cloud-showers-heavy'}
    if (weathercode > 79 && weathercode < 83) {weatherIcon = 'fa-cloud-showers-heavy'}
    if (weathercode === 71 || weathercode === 73 || weathercode === 74  || weathercode === 77) {weatherIcon = 'fa-snowflake blue'}
    if (weathercode === 85 || weathercode === 86) {weatherIcon = 'fa-cloud-snow blue'}
    if (weathercode === 95 || weathercode === 96 || weathercode === 99) {weatherIcon = 'fa-thunderstorm'}
    const title = data.display_name
    return (
        <div className="result">
            {weathercode !== undefined && (
                <div className="weathericon"><i className={`fad ${weatherIcon}`}></i></div>
            )} 
            <div className="temp">
                <div><i className="fad fa-thermometer-half"></i> {temperature}ºC</div>
                <div><i className="fad fa-wind"></i> {windspeed}km/h</div>
            </div>
            <p><i className="fad fa-map-marker-alt"></i> {title}</p>
        </div>
    )
}
export default Weather