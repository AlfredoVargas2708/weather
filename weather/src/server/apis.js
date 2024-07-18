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

const key_weather = 'hMlg0gM6skEGKDDnHgvyCqj7x1NUNUji'

export const api = async (lat, lon) => {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${key_weather}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};