import React, { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dynamic background images based on weather code
  const getBackgroundImage = (weatherCode) => {
    switch (true) {
      case weatherCode === 0: // Clear sky
        return "url('https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 1 && weatherCode <= 3: // Mainly clear to partly cloudy
        return "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 45 && weatherCode <= 48: // Fog
        return "url('https://images.unsplash.com/photo-1504253163759-c23fccaebb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 51 && weatherCode <= 67: // Drizzle/Rain
        return "url('https://images.unsplash.com/photo-1438449805896-8e7f318e8eb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 71 && weatherCode <= 77: // Snow
        return "url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 80 && weatherCode <= 82: // Rain showers
        return "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      case weatherCode >= 95 && weatherCode <= 99: // Thunderstorm
        return "url('https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      default:
        return "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
    }
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode === 0) return <WiDaySunny size={50} />;
    if (weatherCode >= 1 && weatherCode <= 3) return <WiCloudy size={50} />;
    if (weatherCode >= 45 && weatherCode <= 48) return <WiCloudy size={50} />;
    if (weatherCode >= 51 && weatherCode <= 67) return <WiRain size={50} />;
    if (weatherCode >= 71 && weatherCode <= 77) return <WiSnow size={50} />;
    if (weatherCode >= 80 && weatherCode <= 82) return <WiRain size={50} />;
    if (weatherCode >= 85 && weatherCode <= 86) return <WiSnow size={50} />;
    if (weatherCode >= 95 && weatherCode <= 99)
      return <WiThunderstorm size={50} />;
    return <WiDaySunny size={50} />;
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }
    setLoading(true);
    try {
      // First, get city coordinates
      const geoResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country_code } =
        geoResponse.data.results[0];
      setLocation({ name, country_code });

      // Then fetch weather
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      setWeather(weatherResponse.data.current_weather);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="weather-app-container"
      style={{
        backgroundImage: weather
          ? getBackgroundImage(weather.weathercode)
          : "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "20px",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div
        className="weather-app"
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "30px",
          textAlign: "center",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#333" }}>Weather App</h1>
        <div className="search-box" style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              padding: "12px",
              width: "70%",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            style={{
              padding: "12px 20px",
              marginLeft: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        {error && <p style={{ color: "#ff4444", margin: "15px 0" }}>{error}</p>}
        {weather && location && (
          <div className="weather-info">
            <h2 style={{ marginBottom: "15px", color: "#222" }}>
              {location.name}, {location.country_code}
            </h2>
            <div className="weather-icon" style={{ margin: "20px 0" }}>
              {getWeatherIcon(weather.weathercode)}
              <p style={{ marginTop: "10px", fontSize: "18px" }}>
                {(() => {
                  switch (true) {
                    case weather.weathercode === 0:
                      return "Clear sky";
                    case weather.weathercode >= 1 && weather.weathercode <= 3:
                      return "Partly cloudy";
                    case weather.weathercode >= 45 && weather.weathercode <= 48:
                      return "Foggy";
                    case weather.weathercode >= 51 && weather.weathercode <= 67:
                      return "Rainy";
                    case weather.weathercode >= 71 && weather.weathercode <= 77:
                      return "Snowy";
                    case weather.weathercode >= 80 && weather.weathercode <= 82:
                      return "Rain showers";
                    case weather.weathercode >= 95 && weather.weathercode <= 99:
                      return "Thunderstorm";
                    default:
                      return "Fair weather";
                  }
                })()}
              </p>
            </div>
            <div style={{ textAlign: "left", marginLeft: "20%" }}>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                🌡️ Temperature: {weather.temperature}°C
              </p>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                🌬️ Wind: {weather.windspeed} km/h
              </p>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                🧭 Wind Direction: {weather.winddirection}°
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
