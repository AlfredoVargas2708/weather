import { useEffect, useState } from "react";
import { localizate, apiDatosCurrent, apiImages } from "./server/apis.js";
import "./App.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { CiMap } from "react-icons/ci";

const App = () => {
  const [localization, setLocalization] = useState(null);
  const [weatherActual, setWeatherActual] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [ciudad, setCiudad] = useState("");
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    localizate()
      .then((data) => setLocalization(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localization
      ? (apiDatosCurrent(localization.latitude, localization.longitude)
          .then((data) => setWeatherActual(data))
          .catch((err) => console.error(err)),
        apiImages(localization.latitude, localization.longitude))
          .then((data) => setImagenes(data))
          .catch((err) => console.error(err))
      : "";
  }, [localization]);

  const monstrar = () => {
    console.log(ciudad);
  };

  return (
    <>
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
      {weatherActual && localization && imagenes ? (
        <main>
          <div className="actual">
            <div className="datos">
              <h1>{localization.city}</h1>
              <p>
                Chance of rain: {Number(weatherActual.current.precip_mm) / 100}%
              </p>
              <h1>{Math.trunc(Number(weatherActual.current.temp_c))}°C</h1>
            </div>
          </div>
          <p>{imagenes.current.icon}</p>
          <p>{imagenes.current.icon_num}</p>
          <img src={weatherActual.current.condition.icon} />
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
