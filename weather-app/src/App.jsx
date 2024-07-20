import { FaBullseye, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import { IoIosClose, IoIosArrowForward } from "react-icons/io";
import "./App.css";
import { useEffect, useState } from "react";
import BtnDegrees from "./components/BtnDegrees";
import {
  location,
  weatherCelcius,
  weatherCelciusForecast,
  weatherFahrenheit,
  weatherFahrenheitForecast,
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

  const [activeSearch, setActiveSearch] = useState(false);
  const search = () => {
    setActiveSearch(!activeSearch);
  };

  const [ciudad, setCiudad] = useState("");
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    if (localizate) {
      setCiudades([localizate.city]);
    }
  }, [localizate]);
  const cambiarCiudad = () => {
    if (ciudad) {
      setCiudades((prevCiudades) => [...prevCiudades, ciudad]);
    }
    setActiveSearch(false);
    setCiudad("");
  };

  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    if (localizate) {
      const fetchWeatherData = async () => {
        try {
          const data =
            active === "°C"
              ? await weatherCelcius(localizate.city)
              : await weatherFahrenheit(localizate.city);
          setWeatherData(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchWeatherData();
    }
  }, [localizate, active]);

  const [weatherDataDays, setWeatherDataDays] = useState(null);
  useEffect(() => {
    if (localizate) {
      const fetchWeatherDataDays = async () => {
        try {
          const data =
            active === "°C"
              ? await weatherCelciusForecast(localizate.city)
              : await weatherFahrenheitForecast(localizate.city);
          setWeatherDataDays(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchWeatherDataDays();
    }
  }, [localizate, active]);

  const selectCity = () => {
    setActiveSearch(false);
  };

  return (
    <>
      {localizate && weatherData && weatherDataDays ? (
        <main>
          {activeSearch ? (
            <div className="search">
              <div>
                <IoIosClose onClick={search} />
              </div>
              <div className="city">
                <input
                  placeholder="search location"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                />
                <button onClick={cambiarCiudad}>Search</button>
              </div>
              <div className="ciudades">
                {ciudades.map((ciudad) => (
                  <div className="ciudad" key={ciudad}>
                    <div className="select-city" onClick={selectCity}>
                      <p>{ciudad}</p>
                      <IoIosArrowForward />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <aside>
              <div className="localizate">
                <button onClick={search}>Search for places</button>
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
          )}
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
                <div className="dia" key={dias.datetime}>
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
                <div className="dia" key={dias.datetime}>
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
                  <p>
                    {weatherData.data.map((dia) => Math.round(Number(dia.vis)))}
                  </p>
                  <p>{active === "°C" ? "Km" : "miles"}</p>
                </div>
              </div>
              <div className="stat">
                <p>Air Pressure</p>
                <div className="stat-text">
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
