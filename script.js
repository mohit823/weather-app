const apiKey = "634c9a6caec74e0991694326262003";

async function getWeather() {
  let city = document.getElementById("city").value.trim();

  if (!city) {
    document.getElementById("result").innerHTML = "<p>⚠️ Please enter a city</p>";
    return;
  }

  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    document.getElementById("result").innerHTML = "<p>Loading... ⏳</p>";

    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("City not found ❌");
    }

    let data = await res.json();

    document.getElementById("result").innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p>🌡 Temp: ${data.current.temp_c}°C</p>
      <p>🌥 Weather: ${data.current.condition.text}</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <img src="${data.current.condition.icon}" alt="weather icon">
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
  }
}