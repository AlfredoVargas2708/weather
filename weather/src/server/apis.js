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

const key_weather = '75bfd16d30d2499a99f162613241807'

export const apiDatosCurrent = async (lat, lon) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key_weather}&q=${lat},${lon}&aqi=no`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

const key_images = 'cwztj7orycmdggexfepvavvjpipiwyffl7t1gupi'

export const apiImages = async (lat, lon) => {
    const url = `https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${lon}&sections=current%2Chourly&language=en&units=auto&key=${key_images}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};