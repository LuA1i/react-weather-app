import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
//bfecf7d17588cca6bdd3f1472ca062d8

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const API_KEY = 'd234ab71d94f5f02c487dc72b72bb141'
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`

  useEffect(() => {
    const fetchLondonWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${API_KEY}`
        )
        setData(response.data)
      } catch (error) {
        console.error('Error fetching London weather:', error)
      }
    }

    fetchLondonWeather()
  }, [])

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(BASE_URL).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onKeyDown={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidty">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed.toFixed()} </p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
