import { useEffect, useState } from "react";
import { api, localizate } from "./server/apis";

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
      ? api(localization.latitude, localization.longitude)
          .then((data) => setWeather(data))
          .catch((err) => console.error(err))
      : "";
  }, [localization]);

  return (
    <div>
      {/* <p>{weather.timelines.daily[0].values.cloudBaseAvg}</p> */}
      {/* <button onClick={mostrar}>Mostrar</button> */}
    </div>
  );
};

export default App;
