document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "988bf6b2a11d386956ec048e905058f1";
    const searchBox = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const humidityElement = document.querySelector(".info-humidity span");
    const windElement = document.querySelector(".info-wind span");
    const weatherIcon = document.getElementById('weatherIcon');

    // Event listener for the search button
    searchButton.addEventListener("click", function () {
        const location = searchBox.value;
        if (location) {
            getWeatherData(location);
        }
    });

    // Event listener for pressing Enter in the input field
    searchBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const location = searchBox.value;
            if (location) {
                getWeatherData(location);
            }
        }
    });

    // Function to fetch weather data from the API
    async function getWeatherData(location) {
        try {
            const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiEndpoint);
            const data = await response.json();

            // Update the HTML with the fetched data
            temperatureElement.innerHTML = `${Math.round(data.main.temp)} <span>°C</span>`;
            descriptionElement.innerHTML = data.weather[0].description;
            humidityElement.innerHTML = `${data.main.humidity}%`;
            windElement.innerHTML = `${data.wind.speed} Km/h`;

            // Update weather icon based on weather condition
            updateWeatherIcon(data.weather[0].main);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Function to update the weather icon based on weather condition
    function updateWeatherIcon(weatherCondition) {
        switch (weatherCondition) {
            case 'Clear':
                weatherIcon.src = 'vreme/day.svg';
                break;
            case 'Clouds':
                weatherIcon.src = 'vreme/cloudy.svg';
                break;
            case 'Rain':
                weatherIcon.src = 'vreme/rainy-1.svg';
                break;
            case 'Drizzle':
                weatherIcon.src = 'vreme/rainy-4.svg';
                break;
            case 'Snow':
                weatherIcon.src = 'vreme/snowy-1.svg';
                break;
            case 'Thunderstorm':
                weatherIcon.src = 'vreme/thunder.svg';
                break;
            default:
                weatherIcon.src = 'vreme/cloudy.svg';
        }
        weatherIcon.style.display = 'inline-block';
    }
});
