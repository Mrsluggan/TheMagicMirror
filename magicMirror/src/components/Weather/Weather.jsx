import React, { useState, useEffect } from 'react';
import './Weather.css';

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherHistory, setWeatherHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=59.85882&longitude=17.63889&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current_weather=true&forecast_hours=48");
                const data = await response.json();
                console.log(data);
                setWeatherData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchDataHistory = async () => {
            if (weatherData && weatherData.hourly && weatherData.hourly.temperature_2m) {
                const currentHour = new Date().getHours();
                const temperaturesNext8Hours = weatherData.hourly.temperature_2m.slice(currentHour, currentHour + 8);
                setWeatherHistory(temperaturesNext8Hours);
            }
        };

        fetchDataHistory();
    }, [weatherData]);

    return (
        <div>
            {weatherData ? (
                <div>
                    <div>Vädret är nu {weatherData.current_weather.temperature}°C</div>
                    <div>
                        Temperatur för nästa 8 timmar:
                        {weatherHistory.length > 0 ? (
                            <ul className='weatherList'>
                                {weatherHistory.map((temp, index) => (

                                    <li style={{ textAlign: '' }} key={index}>
                                        {((new Date().getHours() + index + 1) % 24).toString().padStart(2, '0')}:00 {temp}°C
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>Laddar historikdata...</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Laddar väderdata...</div>
            )}
        </div>
    );
}
