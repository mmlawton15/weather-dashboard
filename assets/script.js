// DONE - GIVEN a weather dashboard with form inputs
// DONE - WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var cityUserSearchesFor = document.querySelector("#city");
var currentCityContainer = document.querySelector("selectedCityCurrentWeather");
var myApiKey = "2e2ca0507dda47fa6f94fa93790f0ec0";
var currentDateAndTime = document.getElementById("cityAndDate").textContent += moment().format('dddd (MM/DD/YY) h:mm a');
var cityName;
var currentWeather;
var currentUVIndex;
var lat;
var lon;

//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    cityName = cityUserSearchesFor.value;
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})

//CODE FOR CITY BUTTONS ON THE LEFT
document.querySelector("#austin").addEventListener('click', function() {
    cityName = "Austin";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#chicago").addEventListener('click', function() {
    cityName = "Chicago";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#newYork").addEventListener('click', function() {
    cityName = "New York";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#orlando").addEventListener('click', function() {
    cityName = "Orlando";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#sanFrancisco").addEventListener('click', function() {
    cityName = "San Francisco";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#seattle").addEventListener('click', function() {
    cityName = "Seattle";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#denver").addEventListener('click', function() {
    cityName = "Denver";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#atlanta").addEventListener('click', function() {
    cityName = "Atlanta";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})

//REFERENCE THE API WHEN THE BUTTON IS CLICKED BASED ON THE CITYNAME
var getSearchedCityWeather = function() {
    var currentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${myApiKey}`)
    .then(function(cityName) {
        if (cityName.status !==200) {
            console.log("there was a problem, status code:" + cityName.status);
            return;
        }
        cityName.json().then(function(data) {//Examine the text in the response
            console.log(data); //console log the array of weather data
            lat = data.coord.lat; //when the search button is clicked, grab the longitude from the data and set it to this variable
            lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
            document.querySelector("#temperature").textContent = ("Temperature: " + data.main.temp + "°F"); //get into the array, select the secion you want the data from and put it intp the text content
            document.querySelector("#wind").textContent = ("Wind Speed: " + data.wind.speed + " mph");
            document.querySelector("#humidity").textContent = ("Humidity: " + data.main.humidity + "%");
            getSearchedCityUVIndex(lat, lon);
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
    console.log(currentWeather);
}

//CODE FOR THE UV INDEX
var getSearchedCityUVIndex = function(lat, lon) {
    var currentUVIndex = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}`)
    .then(function(cityName) {
        //console.log(cityName.body);
        if (cityName.status !==200) {
            console.log("there was a problem, status code: " + cityName.status);
            return;
        }
        cityName.json().then(function(data) {//Examine the text in the response
            document.querySelector("#uvIndexBox").textContent = (data.current.uvi)
            if (data.current.uvi > 7) {
                document.querySelector("#uvIndexBox").className = "uvIndexBoxHigh";
            } if (data.current.uvi > 3) {
                document.querySelector("#uvIndexBox").className = "uvIndexBoxMedium";
            } else {
                document.querySelector("#uvIndexBox").className = "uvIndexBox";
            }
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
}



//CODE FOR 5 DAY FORECAST
var getSearchedCityForecast = function() {
    var forecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${myApiKey}`)
    .then(function(cityName) {
        if (cityName.status !==200) {
            console.log("there was a problem, status code: " + cityName.status);
            return;
        }
        cityName.json().then(function(data) {
            for (var i = 0; i<=data.list.length; i++){ //for variable i, increase by 8 (the 5 day forecast shows 3 hour increments for the data so by doing it every 8 i can skip days)
                console.log(data.list[i]);//look at the data currently assigned to i
                document.querySelectorAll("#miniDate").textContent = (data.list[i].dt_txt); //set the text content for any element with a id of miniTemp to te date
            };
        })  
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
}

// document.querySelectorAll("#miniTemp").textContent = ("Temp: " + data.main.temp + "°F");
// document.querySelectorAll("#miniWind").textContent = ("Wind: " + data.wind.speed + "mph");
// document.querySelectorAll("#miniHumidity").textContent = ("Humidity: " + data.main.humidity + "%");