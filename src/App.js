import './App.css';
import Fetch from './API/Fetch';
import { useState } from 'react';

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({})

  const getValue = (e) => {
    setCity(e.target.value);
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const data = await Fetch(city)
      setWeather(data)
      setCity('')
      console.log('Data from handleKeyPress in App.js : ', data);
    }
  }

  return (
    <div className="main-container">
      <input
        type={'text'}
        value={city}
        onChange={getValue}
        placeholder='Search here'
        className='search-inp'
        onKeyPress={handleKeyPress}
      />
      {
        weather.main && (
          <div className='weather-container-city'>
            <h2 className='city-name'>
              <span>
                {weather.name}
              </span>
              <sup>
                {weather.sys.country}
              </sup>
            </h2>
            <div>
              {Math.round(weather.main.temp)}<sup>&deg;C</sup>
            </div>
            <div className="info">
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
