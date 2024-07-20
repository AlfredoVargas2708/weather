export const location = async () => {
    const url = 'https://ipwho.is/'
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error;
    }
}

const api_key = '0934183f671641349d8c23ab355619ab'

export const weatherCelcius = async (city) => {
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${api_key}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error;
    }
}

export const weatherFahreheit = async (city) => {
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&units=I&key=${api_key}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error;
    }
}

export const weatherCelciusForecast = async (city) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=6&key=${api_key}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error;
    }
}

export const weatherFahreheitForecast = async (city) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=6&units=I&key=${api_key}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error;
    }
}