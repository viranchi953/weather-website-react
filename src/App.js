import React, { useEffect, useState } from 'react';
import axios from 'axios';

import sunnyIcon from './icons/sunny.png';
import cloudyIcon from './icons/cloudy.png';
import defaultIcon from './icons/sun.gif';

const App = () => {
  const [city, setCity] = useState('Nagpur');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=current&key=8W4N7TWVVDAV27TGEZXP2EK9V&contentType=json`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  const getWeatherImage = (condition) => {
    const imageMapping = {
      'clear-day': sunnyIcon,
      'partly-cloudy-day': cloudyIcon,
    };

    return imageMapping[condition] || defaultIcon;
  };

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>
      <div style={styles.inputContainer}>
        <label htmlFor="cityInput" style={styles.label}>
          Enter City:
        </label>
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => setCity(city)} style={styles.button}>
          Search
        </button>
      </div>
      {weatherData && (
        <div style={styles.weatherContainer}>
          <h2 style={styles.location}>{weatherData.resolvedAddress}</h2>
          <p style={styles.info}>Current Temperature: {weatherData.currentConditions.temp}°C</p>
          <p style={styles.info}>Conditions: {weatherData.currentConditions.conditions}</p>
          <p style={styles.info}>Wind Speed: {weatherData.currentConditions.windspeed} m/s</p>
          <img
            src={getWeatherImage(weatherData.currentConditions.icon)}
            alt="Weather Icon"
            style={styles.weatherIcon}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    padding: '8px',
    marginRight: '10px',
  },
  button: {
    padding: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  weatherContainer: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  },
  location: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  info: {
    fontSize: '1.2rem',
    marginBottom: '8px',
  },
  weatherIcon: {
    width: '100px',
    height: '100px',
  },
};

export default App;
