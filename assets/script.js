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
var latitude;
var longitude;

//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    cityName = cityUserSearchesFor.value;
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();

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
            latitude = data.coord.lat; //when the search button is clicked, grab the longitude from the data and set it to this variable
            longitude = data.coord.lon;
            console.log(latitude);
            console.log(longitude);
            document.querySelector("#temperature").textContent = ("Temperature: " + data.main.temp + "°F"); //get into the array, select the secion you want the data from and put it intp the text content
            document.querySelector("#wind").textContent = ("Wind Speed: " + data.wind.speed + " mph");
            document.querySelector("#humidity").textContent = ("Humidity: " + data.main.humidity + "%");
            // document.querySelector("#uvIndex").textContent = (currentUVIndex.uvi) //UV Index isn't on this API sok imght have to switch to lat and long  for this
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
    console.log(currentWeather);
    //getSearchedCityUVIndex();
}

//CODE FOR THE UV INDEX
// var getSearchedCityUVIndex = function() {
//     var currentUVIndex = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${myApiKey}`)
//     .then(function(cityName) {
//         if (cityName.status !==200) {
//             console.log("there was a problem, status code: " + cityName.status);
//             return;
//         }
//         cityName.json().then(function(data) {//Examine the text in the response
//             console.log(data); //console log the array of weather data
//         });
//     })
//     .catch(function(err) {
//         console.log("Fetch error :-S", err);
//     });

//     console.log(currentUVIndex);
// }


//WEBSITE FOR 5 DAY FORECAST
//(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myApiKey}`)

//FOR LOOP FOR LOOPING THROUGH 5 DAY FORECAST
//for(var i=0; i+=8; i <= data.list.length){
    //console.log(data.list[i]) //show me that object
//}
//i+=8 lets us increment our iterating variable up by 8, rather than the common i++ incrementing by 1!
//You could even start off at i = 1-4 and it would probably do well