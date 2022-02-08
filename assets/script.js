// set key value on line 36, remove lines 34 and 35 (24 and 25 now)
//IE, cityUserSearchesFor.value
//set the vity name and create a new button with each city that is stored in local storage
//create a loop that goes through all items in local storage


var cityUserSearchesFor = document.querySelector("#city");
var currentCityContainer = document.querySelector("selectedCityCurrentWeather");
var myApiKey = "2e2ca0507dda47fa6f94fa93790f0ec0";
var currentDateAndTime = document.getElementById("cityAndDate").textContent += moment().format('dddd (MM/DD/YY) h:mm a');
var cityName;
var currentWeather;
var currentUVIndex;
var lat;
var lon;
var searchedCitiesArray = [];

//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    cityName = cityUserSearchesFor.value;
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();

    //CODE TO SET LOCAL STORAGE TO CITY
    cityNameStringified = JSON.stringify(cityName)
    searchedCitiesArray.push(cityNameStringified); //NEED TO WORK ON ADDING MULTIPLE CITIES TO LOCAL STORAGE ARRAY
    //localStorage.setItem("city", "city)
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
            document.querySelector("#weatherImage").innerHTML = (data.weather.icon);
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
    .then(function(response) {
        if (response.status !==200) {
            console.log("there was a problem, status code: " + response.status);
            return;
        }
        response.json().then(function(data) {
            for (var i = 4; i<=data.list.length; i = i + 8){ //for variable i, increase by 8 (the 5 day forecast shows 3 hour increments for the data so by doing it every 8 i can skip days)
                console.log(i);//look at the data currently assigned to i
                console.log(data.list[i]);
                var dateValueStringFromAPI = (data.list[i].dt_txt)
                var stringDateValue = (dateValueStringFromAPI.slice(0,10));
                document.querySelector(`#miniForecastDay${i} .miniDate`).textContent = (stringDateValue);
                document.querySelector(`#miniForecastDay${i} .miniTemp`).textContent = ("Temp: " + data.list[i].main.temp + "°F");
                document.querySelector(`#miniForecastDay${i} .miniWind`).textContent = ("Wind Speed: " + data.list[i].wind.speed + " mph")
                document.querySelector(`#miniForecastDay${i} .miniHumidity`).textContent = ("Humidity: " + data.list[i].main.humidity + "%");
            };
        })  
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
}

//variable that holds 1 the first time, and increments. holds 2 the second time, etc

// document.querySelectorAll("#miniTemp").textContent = ("Temp: " + data.main.temp + "°F");
// document.querySelectorAll("#miniWind").textContent = ("Wind: " + data.wind.speed + "mph");
// document.querySelectorAll("#miniHumidity").textContent = ("Humidity: " + data.main.humidity + "%");