async function search() {
  const city = document.getElementById("searchInput").value;
  const apiKey = "6ecbd5c6c41ec3f890bb64d1cdd92396"; // Replace with your OpenWeatherMap API key

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const location = data.name;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById("weatherResult").innerHTML = `
        <p><strong>${location}</strong></p>
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
        <p>🌡️ Temperature: ${temp} °C</p>
        <p>☁️ Condition: ${weather}</p>
      `;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Failed to fetch weather data.</p>`;
    console.error("Error:", error);
  }
}
