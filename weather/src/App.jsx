import { useEffect, useState } from "react";
import { localizate, apiDatosCurrent, apiDatosHisoric } from "./server/apis.js";
import "./App.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { CiMap } from "react-icons/ci";

const App = () => {
  const [localization, setLocalization] = useState(null);
  const [weatherActual, setWeatherActual] = useState(null);
  const [weatherHistoric, setWeatherHistoric] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const fecha_actual = new Date().toJSON().slice(0, 10);
  const fecha_final = new Date();
  fecha_final.setDate(fecha_final.getDate() + 1);

  useEffect(() => {
    localizate()
      .then((data) => setLocalization(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localization
      ? apiDatosCurrent(localization.city)
          .then((data) => setWeatherActual(data))
          .catch(
            (err) => console.error(err),
            apiDatosHisoric(
              localization.city,
              fecha_actual,
              fecha_final.toJSON().slice(0, 10)
            )
              .then((data) => setWeatherHistoric(data))
              .catch((err) => console.error(err))
          )
      : "";
  }, [localization]);

  const monstrar = () => {
    console.log(weatherHistoric);
  };

  return (
    <>
      {/*       {localization.latitude},{localization.longitude} */}
      <header>
        <input
          placeholder="Search for cities"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <aside>
          <button>
            <div className="svg">
              <TiWeatherPartlySunny />
            </div>
            Weather
          </button>
          <button>
            <div className="svg">
              <FaList />
            </div>
            Cities
          </button>
          <button>
            <div className="svg">
              <CiMap />
            </div>
            Map
          </button>
        </aside>
      </header>
      <button onClick={monstrar}>Mostrar</button>
      {weatherActual && localization && weatherHistoric ? (
        <main>
          <div className="actual">
            <div className="datos">
              <h1>{localization.city}</h1>
              <p>Chance of rain: {Number(weatherActual.data[0].precip)}%</p>
              <h1>{Math.trunc(Number(weatherActual.data[0].temp))}°C</h1>
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
                {/* {weatherHistoric.data.map((hora) =>
                  Number(hora.datetime.slice(11, 13)) === 6 ? (
                    <>
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${hora.weather.icon}.png`}
                      />
                      <p>
                        <span>{Math.trunc(Number(hora.temp))}°C</span>
                      </p>
                    </>
                  ) : (
                    ""
                  )
                )} */}
              </div>
              <hr />
              <div className="hora">
                <p>9:00 AM</p>
              </div>
              <hr />
              <div className="hora">
                <p>12:00 PM</p>
              </div>
              <hr />
              <div className="hora">
                <p>3:00 PM</p>
              </div>
              <hr />
              <div className="hora">
                <p>6:00 PM</p>
              </div>
              <hr />
              <div className="hora">
                <p>9:00 PM</p>
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
