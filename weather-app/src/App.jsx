import { FaBullseye, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
import BtnDegrees from "./components/BtnDegrees";
import {
  location,
  weatherCelcius,
  weatherCelciusForecast,
  weatherFahreheit,
  weatherFahreheitForecast,
} from "./server/apiServer";

const App = () => {
  const [active, setActive] = useState("°C");
  const activar = (e) => {
    setActive(e.target.innerText);
  };
  const [localizate, setLocalizate] = useState(null);
  useEffect(() => {
    location()
      .then((data) => setLocalizate(data))
      .catch((err) => console.error(err));
  }, []);
  const [weatherData, setweatherData] = useState(null);
  useEffect(() => {
    localizate
      ? active === "°C"
        ? weatherCelcius(localizate.city)
            .then((data) => setweatherData(data))
            .catch((err) => console.error(err))
        : weatherFahreheit(localizate.city)
            .then((data) => setweatherData(data))
            .catch((err) => console.error(err))
      : "";
  }, [localizate, active]);
  const [weatherDataDays, setweatherDataDays] = useState(null);
  useEffect(() => {
    localizate
      ? active === "°C"
        ? weatherCelciusForecast(localizate.city)
            .then((data) => setweatherDataDays(data))
            .catch((err) => console.error(err))
        : weatherFahreheitForecast(localizate.city)
            .then((data) => setweatherDataDays(data))
            .catch((err) => console.error(err))
      : "";
  }, [localizate, active]);
  return (
    <>
      {localizate && weatherData && weatherDataDays ? (
        <main>
          <aside>
            <div className="localizate">
              <button>Search for places</button>
              <button>
                <FaBullseye />
              </button>
            </div>
            {weatherData.data.map((hoy) => (
              <div className="actual" key={hoy.datetime}>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${hoy.weather.icon}.png`}
                />
                <p>
                  {Math.round(Number(hoy.temp))}
                  <sub>{active}</sub>
                </p>
                <div>
                  <span>{hoy.weather.description}</span>
                </div>
              </div>
            ))}
            <div className="fecha">
              <p>
                Today <sup>.</sup> {new Date().toUTCString().slice(0, 10)}
              </p>
              <FaMapMarkerAlt />
              <span>{localizate.city}</span>
            </div>
          </aside>
          <div className="degrees">
            <BtnDegrees active={active} activar={activar} texto="°C" />
            <BtnDegrees active={active} activar={activar} texto="°F" />
          </div>
          <div className="dias">
            {weatherDataDays.data.map((dias) =>
              Number(dias.datetime.slice(8, 10)) === new Date().getDate() ? (
                <div hidden key={dias.datetime}></div>
              ) : Number(dias.datetime.slice(8, 10)) ===
                new Date().getDate() + 1 ? (
                <div className="dia">
                  <p>Tomorrow</p>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${dias.weather.icon}.png`}
                  />
                  <div className="temps">
                    <p>
                      {Math.round(Number(dias.app_max_temp))}
                      {active}
                    </p>
                    <p>
                      {Math.round(Number(dias.app_min_temp))}
                      {active}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="dia">
                  <p>{new Date(dias.datetime).toUTCString().slice(0, 10)}</p>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${dias.weather.icon}.png`}
                  />
                  <div className="temps">
                    <p>
                      {Math.round(Number(dias.app_max_temp))}
                      {active}
                    </p>
                    <p>
                      {Math.round(Number(dias.app_min_temp))}
                      {active}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div>
            <h2>Today&#39;s Highlights</h2>
            <div className="stats">
              <div className="stat">
                <p>Wind</p>
                <div className="stat-text">
                  {" "}
                  <p>
                    {weatherData.data.map((dia) =>
                      Math.round(Number(dia.wind_spd))
                    )}
                  </p>
                  <p>{active === "°C" ? "m/s" : "mph"}</p>
                </div>
                <div className="dir_wind">
                  <FaLocationArrow />
                  <p>{weatherData.data.map((dia) => dia.wind_cdir)}</p>
                </div>
              </div>
              <div className="stat">
                <p>Precipitation</p>
                <div className="stat-text">
                  {" "}
                  <p>
                    {weatherData.data.map((dia) =>
                      Math.round(Number(dia.precip))
                    )}
                  </p>
                  <p>{active === "°C" ? "mm" : "in"}</p>
                </div>
                <div>
                  <div className="stat-prep">
                    <p>0</p>
                    <p>250</p>
                    <p>500</p>
                  </div>
                  <input
                    type="range"
                    value={weatherData.data.map((dia) =>
                      Math.round(Number(dia.precip))
                    )}
                    min="0"
                    max="500"
                  />
                </div>
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <p>Visibility</p>
                <div className="stat-text">
                  {" "}
                  <p>
                    {weatherData.data.map((dia) => Math.round(Number(dia.vis)))}
                  </p>
                  <p>{active === "°C" ? "Km" : "miles"}</p>
                </div>
              </div>
              <div className="stat">
                <p>Air Pressure</p>
                <div className="stat-text">
                  {" "}
                  <p>
                    {weatherData.data.map((dia) =>
                      Math.round(Number(dia.pres))
                    )}
                  </p>
                  <p>mb</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
