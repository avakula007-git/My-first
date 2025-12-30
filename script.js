const apiKey = "95cfd6ba7452ec583f4039dc76889a28";

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherMain = data.weather[0].main.toLowerCase();

            document.getElementById("location").innerText =
                `Location: ${data.name}, ${data.sys.country}`;

            document.getElementById("condition").innerText =
                `Weather: ${data.weather[0].description}`;

            // Rain status
            if (weatherMain.includes("rain")) {
                document.getElementById("rainStatus").innerText = "🌧 It is currently raining.";
                document.getElementById("forecast").innerText = "Rain is expected.";
            } else {
                document.getElementById("rainStatus").innerText = "☀ No rain currently.";
                document.getElementById("forecast").innerText = "No rain expected.";
            }

            // Change background
            changeBackground(weatherMain);
        })
        .catch(() => {
            alert("City not found. Please try again.");
        });
}

function changeBackground(weather) {
    document.body.className = ""; // Reset previous classes

    if (weather.includes("clear")) {
        document.body.classList.add("clear");
    } else if (weather.includes("rain")) {
        document.body.classList.add("rain");
    } else if (weather.includes("cloud")) {
        document.body.classList.add("clouds");
    } else if (weather.includes("snow")) {
        document.body.classList.add("snow");
    } else if (weather.includes("thunderstorm")) {
        document.body.classList.add("thunderstorm");
    } else {
        document.body.classList.add("mist");
    }
}
