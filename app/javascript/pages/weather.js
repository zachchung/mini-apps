const apiKey = 'd5b6653df3ffa5e94dd9070a01b32c74';

const time = document.querySelector("#time");
const city = document.querySelector("#city");
const description = document.querySelector("#description");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temperature");

const formatDate = (data) => {
  const now = new Date();
  // now.getTimezoneOffset() => Shift in minutes from current location to GMT (HK: -480mins)
  // data.timezone => Shift in seconds from GMT to search location (HK: 28800s/ 480mins) (Tokyo: 32400s/540ms)
  const timeDiffInSeconds = (now.getTimezoneOffset() * 60) + data.timezone; // => diff in sec between current & search location
  // EG. Tokyo (GMT +9): -480+540 = 60mins (1hr ahead) --> add 60mins to current time
  // EG. Iceland (GMT: 0): -480+0 = -480mins (8hr behind) --> deduct 480mins from current time
  // new Date(Time now + time diff):
  const localDate = new Date(now.setUTCSeconds(timeDiffInSeconds));
  // console.log(timeDiffInSeconds);

  // Display the date nicely (.toLocaleDateString):
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = localDate.toLocaleDateString('en-US', options);
  return formattedDate;
};

const updateWeather = (data) => {
  // Change display info:
  city.innerText = data.name;
  description.innerText = data.weather[0].description;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // !!!!!!!!!!
  temperature.innerText = data.main.temp;
  time.innerText = formatDate(data);
};

// Get weather in a selected city:
const fetchByCity = (userInput) => {
  // fetch weather from API by city name:
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      updateWeather(data);
    });
};

// -----------------------------------------------------------------------
// Get weather in current location:
const fetchByCurrentLocation = () => {
  // Get current location!!!!!!!!!!!!!!:
  navigator.geolocation.getCurrentPosition((locationData) => {
    // console.log(locationData.coords.latitude);
    // console.log(locationData.coords.longitude);

    // fetch weather from API by geographic coordinates:
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.coords.latitude}&lon=${locationData.coords.longitude}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        updateWeather(data);
      });
  });
};

export { fetchByCity, fetchByCurrentLocation };
