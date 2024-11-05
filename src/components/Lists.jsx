import React, {useState} from 'react'
import axios from 'axios';

function Lists() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const fetchWeather = async () => {
        if (!city) return;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=614acf182908c70dc96c5773595de3ee`);
            setWeather(response.data);
            setCity("");
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeather(null);
        }        
    };

    const handleGetWeather = () => {
        fetchWeather();
    };
    return (
    <div className='flex items-center justify-center 
        min-h-screen bg-sky-400'>
        <div className='bg-green-300 shadow-lg rounded-lg p-6 max-w-lg w-full'>
            <div className='flex justify-center items-center py-5 text-xl'>
                <div className='flex max-w-md items-center w-full'>

                    <input  type="search"  placeholder='Search Weather' 
                    className='flex-grow rounded-l-md outline-none h-14 px-6'
                    value={city}  onChange={handleCityChange}/>
                    <button  className='bg-yellow-600 text-white rounded-r-md w-[75px] h-14' 
                    onClick={handleGetWeather}> Search </button>
                </div>
            </div>
            <div className='text-center'>
                {weather && (
                <>
                    <h2 className='text-3xl font-bold'>{weather.name}</h2>
                    <div className='flex justify-center text-xl py-4 space-x-10'>
                        <p><span className='text-fuchsia-900'>Temperature</span> :<span className='text-red-600'> {(weather.main.temp - 273.15).toFixed(2)}°C </span></p>
                                    
                        <p><span className='text-fuchsia-900'>Max Temperature</span> : <span className='text-red-600'>{(weather.main.temp_max - 273.15).toFixed(2)}°C </span></p>
                    </div>
                    <div className='flex justify-center text-xl mt-5 space-x-10'>
                        <p><span className='text-fuchsia-900'>Weather</span>: <span     className='text-red-600'>{weather.weather[0].description}</span>
                        </p>
                        <p><span className='text-fuchsia-900'>Humidity</span>: <span className='text-red-600'>{weather.main.humidity}%</span></p>
                    </div>
                    <div className='flex justify-center text-xl mt-5'>
                        <p><span className='text-fuchsia-900'>Wind Speed</span>: <span className='text-red-600'>{weather.wind.speed} Km/h</span></p>
                    </div>
                </>
                    )}
                    {weather === null && city && (
                    <p className='text-red-600 text-center mt-2 text-xl'>City not found, please try again.</p>
                    )}
            </div>
        </div>
    </div>
  )
}

export default Lists