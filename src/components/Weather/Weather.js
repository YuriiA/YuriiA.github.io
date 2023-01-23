import { useState } from "react";

export function Weather() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  const temp = Math.round(weather.main?.temp - 273.15) + "°C";

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ce00d5af23318547cbe6eff82761659`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeather(res);
        setCity("");
      });
  }
  console.log(weather);

  function getCardinalDirection(angle) {
    const directions = [
      "↑ N",
      "↗ NE",
      "→ E",
      "↘ SE",
      "↓ S",
      "↙ SW",
      "← W",
      "↖ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  }

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className={weather.main?.temp < 288 ? " app " : "app warm"}>
      <main>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />
        </form>

        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys?.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <ul className="weather-box">
              <li>Temp: {temp}</li>

              <li>Humidity: {weather.main.humidity} %</li>

              <li className="weatherDescritpion">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                  alt={weather.weather?.[0].description}
                />
                <div>{weather.weather?.[0].description}</div>
              </li>

              <li>
                Wind direction: {getCardinalDirection(weather?.wind.deg)},
                speed: {weather?.wind.speed} m/s
              </li>
            </ul>
          </>
        ) : (
          " "
        )}
      </main>
    </div>
  );
}
