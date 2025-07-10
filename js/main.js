let searchInp = document.getElementById('searchInp');
let searchBtn = document.getElementById('searchBtn');

window.addEventListener('load', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getLocationWeather(lat, lon);
      },
      function (error) {
        console.log("Error getting location:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

async function getLocationWeather(lat, lon) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=656198e5811a455e80a00833251007&q=${lat},${lon}&days=3`);
    if (response.ok) {
      let data = await response.json();
      displayWeather(data.forecast.forecastday, data.location.name);
    } else {
      console.log('Response error:', response.status);
    }
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

searchInp.addEventListener('input', function () {
  let city = searchInp.value.trim();
  if (city.length >= 1) {
    getWeather(city);
  }
});

searchBtn.addEventListener('click', function () {
  let city = searchInp.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=656198e5811a455e80a00833251007&q=${city}&days=3`);
    if (response.ok) {
      let data = await response.json();
      displayWeather(data.forecast.forecastday, data.location.name);
    } else {
      console.log('Response error:', response.status);
    }
  } catch (error) {
    console.log('Fetch error:', error);
  }
}
function displayWeather(forecastArray, cityName) {
  let data = '';

  for (let index = 0; index < forecastArray.length; index++) {
    let day = forecastArray[index];
    let dateObj = new Date(day.date);

    let dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    let dateString = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

    let headerBgColor = (index % 2 === 0) ? '#2D303D' : '#222530';
    let bodyBgColor = (index % 2 === 0) ? '#323544' : '#262936';

    let header = `
      <div class="d-flex justify-content-between p-2 rounded" style="background-color: ${headerBgColor}">
        <span>${dayName}</span>
        <span>${dateString}</span>
      </div>
    `;

    let cardContent = '';

    if (index === 0) {
      cardContent = `
        ${header}
        <div class="card-body d-flex flex-column justify-content-between px-2 py-3 h-100" style="background-color: ${bodyBgColor}">
          <h5 class="pb-1 text-start w-100" style="color:#BFC1C8; background-color: ${bodyBgColor}; margin: 0;">${cityName}</h5>
          <h1 class="fw-bold" style="font-size: 60px;">${day.day.avgtemp_c}°C</h1>
          <img src="https:${day.day.condition.icon}" class="w-25" alt="${day.day.condition.text}" />
          <h5 class="my-1 text-info">${day.day.condition.text}</h5>

          <div class="d-flex justify-content-between text-start mt-2" style="font-size: 14px;">
            <div><i class="fa-solid fa-droplet me-1"></i> 20%</div>
            <div><i class="fa-solid fa-wind me-1"></i> 18km/h</div>
            <div><i class="fa-solid fa-location-arrow me-1"></i> East</div>
          </div>
        </div>
      `;
    } else {
      cardContent = `
        ${header}
        <div class="card-body d-flex flex-column justify-content-center align-items-center px-2 py-3 h-100" style="background-color: ${bodyBgColor}">
          <img src="https:${day.day.condition.icon}" class="w-25 mb-2" alt="${day.day.condition.text}" />
          <h5 class="mb-1">${day.day.avgtemp_c}°C</h5>
          <div class="mb-1" style="font-size: 14px;">
            <div>Max: ${day.day.maxtemp_c}°C</div>
            <div>Min: ${day.day.mintemp_c}°C</div>
          </div>
          <h6 class="mt-2 text-info">${day.day.condition.text}</h6>
        </div>
      `;
    }

    data += `
      <div class="col-sm-12 col-md-2 col-lg-4 d-flex align-items-stretch mb-3">
        <div class="h-100 w-100 text-white text-center" style="background-color: ${bodyBgColor}; transform: translateY(-25%)">
          ${cardContent}
        </div>
      </div>
    `;
  }

  document.getElementById('row-data').innerHTML = data;
}
