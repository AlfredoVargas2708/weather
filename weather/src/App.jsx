import { useEffect, useState } from "react";
import {
  localizate,
  apiDatosCurrent,
  apiDatosHistoricHourly,
  apiDatosHistoricDaily,
} from "./server/apis.js";
import "./App.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaList, FaThermometerHalf, FaSun } from "react-icons/fa";
import { CiMap } from "react-icons/ci";
import { FiWind } from "react-icons/fi";
import { IoWater } from "react-icons/io5";

const App = () => {
  const [localization, setLocalization] = useState(null);
  const [weatherActual, setWeatherActual] = useState(null);
  const [weatherHistoricHour, setWeatherHistoricHour] = useState(null);
  const [weatherHistoricDaily, setWeatherHistoricDaily] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const fecha_actual = new Date();
  fecha_actual.setDate(fecha_actual.getDate() - 1);
  const fecha_final_hora = new Date();
  const fecha_final_dia = new Date();
  fecha_final_dia.setDate(fecha_final_dia.getDate() + 7);

  useEffect(() => {
    localizate()
      .then((data) => setLocalization(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localization
      ? (apiDatosCurrent(localization.city)
          .then((data) => setWeatherActual(data))
          .catch((err) => console.error(err)),
        apiDatosHistoricHourly(
          localization.city,
          fecha_actual.toJSON().slice(0, 10),
          fecha_final_hora.toJSON().slice(0, 10)
        )
          .then((data) => setWeatherHistoricHour(data))
          .catch((err) => console.error(err)),
        apiDatosHistoricDaily(localization.city)
          .then((data) => setWeatherHistoricDaily(data))
          .catch((err) => console.error(err)))
      : "";
  }, [localization]);

  const monstrar = () => {
    console.log(weatherHistoricDaily);
  };

  return (
    <>
      {<button onClick={monstrar}></button>}
      <header>
        <aside className="barra">
          <button>
            <div className="svg">
              <TiWeatherPartlySunny />
              <p>Weather</p>
            </div>
          </button>
          <button>
            <div className="svg">
              <FaList />
              <p>Cities</p>
            </div>
          </button>
          <button>
            <div className="svg">
              <CiMap />
              <p>Map</p>
            </div>
          </button>
        </aside>
        <input
          placeholder="Search for cities"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <aside className="dias">
          <p>7-DAY FORECAST</p>
          {weatherHistoricDaily
            ? weatherHistoricDaily.data.map((dia, index) =>
                index < 6 ? (
                  <div key={dia.datetime} className="dia">
                    <p>
                      {Number(dia.datetime.slice(8, 10)) ===
                      new Date().getDate()
                        ? "Today"
                        : dia.datetime.slice(5, 10).replace("-", "/")}
                    </p>
                    <img
                      src={`https://www.weatherbit.io/static/img/icons/${dia.weather.icon}.png`}
                    />
                    <span>{dia.weather.description}</span>
                    <p>
                      <span>{Math.round(Number(dia.max_temp))}</span>/
                      {Math.round(Number(dia.min_temp))}
                    </p>
                  </div>
                ) : (
                  ""
                )
              )
            : ""}
        </aside>
      </header>
      {weatherActual && localization && weatherHistoricHour ? (
        <main>
          <div className="actual">
            <div className="datos-actual">
              <h1>{localization.city}</h1>
              <p>Chance of rain: {Number(weatherActual.data[0].precip)}%</p>
              <h1>{Math.round(Number(weatherActual.data[0].temp))}°C</h1>
            </div>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weatherActual.data[0].weather.icon}.png`}
            />
          </div>
          <div className="horas">
            <p>TODAY&apos;S FORECAST</p>
            <div className="horario">
              <div className="hora">
                <p>6:00 AM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 6 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.round(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <hr />
              <div className="hora">
                <p>9:00 AM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 9 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.round(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <hr />
              <div className="hora">
                <p>12:00 PM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 12 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.round(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <hr />
              <div className="hora">
                <p>3:00 PM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 15 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.round(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <hr />
              <div className="hora">
                <p>6:00 PM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 18 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.round(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <hr />
              <div className="hora">
                <p>9:00 PM</p>
                {weatherHistoricHour.data.map((hora) =>
                  Number(hora.timestamp_local.slice(11, 13)) === 21 ? (
                    <div key={hora.timestamp_local}>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.trunc(Number(hora.app_temp))}°C</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
          <div className="air">
            <p>AIR CONDITIONS</p>
            <div className="datos-air">
              <div className="datos-air">
                <div className="svg-air">
                  <FaThermometerHalf />
                </div>
                <div>
                  <p>Real Fell</p>
                  <span>
                    {Math.round(Number(weatherActual.data[0].app_temp))}°C
                  </span>
                </div>
              </div>
              <div className="datos-air">
                <div className="svg-air">
                  <FiWind />
                </div>
                <div>
                  <p>Wind</p>
                  <span>
                    {Math.round(Number(weatherActual.data[0].wind_spd))} km/h
                  </span>
                </div>
              </div>
            </div>
            <div className="datos-air">
              <div className="datos-air">
                <div className="svg-air">
                  <IoWater />
                </div>
                <div>
                  <p>Chance of rain</p>
                  <span>{Number(weatherActual.data[0].precip)}%</span>
                </div>
              </div>
              <div className="datos-air">
                <div className="svg-air">
                  <FaSun />
                </div>
                <div>
                  <p>UV index</p>
                  <span>
                    {Math.round(Number(weatherActual.data[0].uv))} of 11
                  </span>
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
