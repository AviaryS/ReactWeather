import Weather from "./components/Weather/Weather";
import Info from "./components/Info/Info";
import Form from "./components/Form/Form";
import {useState} from "react";

import './App.css'

function App() {
    const [temp, setTemp] = useState(undefined);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState(undefined);
    const [sunrise, setSunrise] = useState(undefined);
    const [sunset, setSunset] = useState(undefined);
    const [error, setError] = useState(undefined);



    const API_KEY = 'aec9599d2eb2f783290997ee8dd0bbe1';
    const gettingWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        if (city) {
            const api_url = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await api_url.json();
            setTemp(data.main.temp);
            setCity(data.name);
            setCountry(data.sys.country);
            setSunrise(changeSun(data.sys.sunrise));
            setSunset(changeSun(data.sys.sunset));
            setError(undefined);
        } else {
            setTemp(undefined);
            setCity(undefined);
            setCountry(undefined);
            setSunrise(undefined);
            setSunset(undefined);
            setError("Введите город");
        }
    };

    function changeSun(sun) {
        let date = new Date();
        date.setTime(sun)
        let sun_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return sun_date;
    }

    return (
        <div className="weather">
            <div className="weather__imgBlock">
                <Info className="weather__info" />
            </div>
            <div className="weather__textBlock">
                <Form weatherMethod={gettingWeather} />
                <Weather
                    temp={temp}
                    city={city}
                    country={country}
                    sunrise={sunrise}
                    sunset={sunset}
                    error={error}
                />
            </div>
        </div>
    );
}

export default App;
