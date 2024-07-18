export const localizate = async () => {
    const url = `https://ipwho.is/`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

const key_weather = 'VN9BX7UCZ5HQQJTCJWPMWEFQ3'

export const api = async (ciudad, pais) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad},${pais}?unitGroup=metric&key=${key_weather}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};