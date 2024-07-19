export const localizate = async () => {
    const url = `https://ipwho.is/`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const key_weather = '9bc1401e353d48f5947297b7c476c64b'

export const apiDatosCurrent = async (ciudad) => {
    const url = `https://api.weatherbit.io/v2.0/current?city=${ciudad}&key=${key_weather}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const apiDatosHistoricHourly = async (ciudad, fecha_inicio, fecha_final) => {
    const url = `https://api.weatherbit.io/v2.0/history/hourly?city=${ciudad}}&start_date=${fecha_inicio}&end_date=${fecha_final}&key=${key_weather}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const apiDatosHistoricDaily = async (ciudad) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${ciudad}&key=${key_weather}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};