import { useEffect, useState } from "react";
import { api, localizate } from "./server/apis";
import "./App.css";

const App = () => {
  const [localization, setLocalization] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    localizate()
      .then((data) => setLocalization(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localization
      ? api(localization.city, localization.country_code)
          .then((data) => setWeather(data))
          .catch((err) => console.error(err))
      : "";
  }, [localization]);

  useEffect(() => {
    if (weather) {
      const conditionStyles = {
        snow: "linear-gradient(white, lightblue)",
        rain: "linear-gradient(blue, gray)",
        fog: "linear-gradient(lightgray, gray)",
        wind: "linear-gradient(lightyellow, lightgreen)",
        cloudy: "linear-gradient(gray, darkgray)",
        "partly-cloudy-day": "linear-gradient(lightblue, lightgray)",
        "partly-cloudy-night": "linear-gradient(darkblue, darkgray)",
        "clear-day": "linear-gradient(lightblue, yellow)",
        "clear-night": "linear-gradient(darkblue, black)",
      };

      const applyStyle = (condition) => {
        const elements = document.getElementsByClassName(condition);
        if (elements.length > 0) {
          document.getElementById("root").style.background =
            conditionStyles[condition];
        }
      };

      Object.keys(conditionStyles).forEach((condition) =>
        applyStyle(condition)
      );
    }
  }, [weather]);

  const monstrar = () => {};

  return localization && weather ? (
    <>
      <header>
        <div className="fecha">
          <p>
            {new Date().toDateString()} | Local time:{" "}
            {Number(localization.timezone.current_time.slice(11, 13)) > 12
              ? `${
                  Number(localization.timezone.current_time.slice(11, 13)) - 12
                }${localization.timezone.current_time.slice(13, 16)} PM`
              : "AM"}
          </p>
          <h3>
            {localization.city}, {localization.country_code}
          </h3>
        </div>
        <div className={weather.currentConditions.icon}>
          <p>
            {weather.currentConditions.icon.charAt(0).toUpperCase() +
              weather.currentConditions.icon.slice(1)}
          </p>
          <div className="temp">
            <img
              src={`../WeatherIcons/PNG/1st Set - Color/${weather.currentConditions.icon}.png`}
            />
            <p>
              {weather.days.map((dia) =>
                dia.hours.map((hora) =>
                  Number(hora.datetime.slice(0, 2)) === new Date().getHours() &&
                  dia.datetime.slice(8, 11) ===
                    new Date().toLocaleString().slice(2, 4)
                    ? Math.round(Number(hora.temp))
                    : ""
                )
              )}
              °C
            </p>
            <div className="stats">
              <p>
                Real felt:{" "}
                <span>
                  {" "}
                  {weather.days.map((dia) =>
                    dia.hours.map((hora) =>
                      Number(hora.datetime.slice(0, 2)) ===
                        new Date().getHours() &&
                      dia.datetime.slice(8, 11) ===
                        new Date().toLocaleString().slice(2, 4)
                        ? Math.round(Number(hora.feelslike))
                        : ""
                    )
                  )}
                </span>
                °C
              </p>
              <p>
                Humidity:{" "}
                <span>
                  {weather.days.map((dia) =>
                    dia.hours.map((hora) =>
                      Number(hora.datetime.slice(0, 2)) ===
                        new Date().getHours() &&
                      dia.datetime.slice(8, 11) ===
                        new Date().toLocaleString().slice(2, 4)
                        ? Math.round(Number(hora.humidity))
                        : ""
                    )
                  )}
                </span>
                %
              </p>
              <p>
                Wind:
                <span>
                  {weather.days.map((dia) =>
                    dia.hours.map((hora) =>
                      Number(hora.datetime.slice(0, 2)) ===
                        new Date().getHours() &&
                      dia.datetime.slice(8, 11) ===
                        new Date().toLocaleString().slice(2, 4)
                        ? Math.round(Number(hora.windspeed))
                        : ""
                    )
                  )}
                </span>
                km/h
              </p>
            </div>
          </div>
          <div className="sun">
            <p>
              Rise:{" "}
              {weather.days.map((dia) =>
                dia.datetime.slice(8, 11) ===
                new Date().toLocaleString().slice(2, 4)
                  ? `${dia.sunrise.slice(0, 5)} AM`
                  : ""
              )}
            </p>
            <p>|</p>
            <p>
              Set:{" "}
              {weather.days.map((dia) =>
                dia.datetime.slice(8, 11) ===
                new Date().toLocaleString().slice(2, 4)
                  ? `${
                      Number(dia.sunset.slice(0, 2) - 12) +
                      dia.sunset.slice(2, 5)
                    } PM`
                  : ""
              )}
            </p>
            <p>|</p>
            <p>
              High:{" "}
              {weather.days.map((dia) =>
                dia.datetime.slice(8, 11) ===
                new Date().toLocaleString().slice(2, 4)
                  ? `${Math.round(Number(dia.tempmax))} °C`
                  : ""
              )}
            </p>
            <p>|</p>
            <p>
              Low:{" "}
              {weather.days.map((dia) =>
                dia.datetime.slice(8, 11) ===
                new Date().toLocaleString().slice(2, 4)
                  ? `${Math.round(Number(dia.tempmin))} °C`
                  : ""
              )}
            </p>
          </div>
        </div>
      </header>
      <section className="hora">
        <h4>HOURLY FORECAST</h4>
        <hr></hr>
        <div className="horas"></div>
      </section>
      <section className="dia">
        <h4>DAILY FORECAST</h4>
        <hr></hr>
        <div className="dias">
          {weather.days.map((dia, index) =>
            index < 5 ? (
              <div key={dia.datetime}>
                <p>{new Date(dia.datetime).toDateString().slice(0, 3)}</p>
                <img
                  src={`../WeatherIcons/PNG/1st Set - Color/${dia.icon}.png`}
                />
                <p>{Math.round(Number(dia.tempmax))}°C</p>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </section>
    </>
  ) : (
    ""
  );
};

export default App;
