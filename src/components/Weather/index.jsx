import { useState } from "react";
import './weatherStyle.scss';

function Weather({data}) {
    const [temperature, setTemperature] = useState();
    const [windspeed, setWindspeed] = useState();
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current_weather=true`).then(res => res.json()).then(data => {
      setTemperature(data.current_weather.temperature)
      setWindspeed(data.current_weather.windspeed)
    });
    const title = data.display_name
    return (
        <div className="result">
            <div className="temp">
                <div><i class="fad fa-thermometer-half"></i> {temperature}ºC</div>
                <div><i class="fad fa-wind"></i> {windspeed}km/h</div>
            </div>
            <p><i class="fad fa-map-marker-alt"></i> {title}</p>
        </div>
    )
}
export default Weather