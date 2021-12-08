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
var currentCityContainer = document.querySelector("selectedCityCurrentWeather")


//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    getSearchedCityWeather();
})

var getSearchedCityWeather = function() {
    fetch(api.openweathermap.org/data/2.5/onecall);
}


//from the javascript section of the website
//api.openweathermap.org/data/2.5/onecall?lat=38.8&lon:12.09&callback=test;

//with my api key
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=2e2ca0507dda47fa6f94fa93790f0ec0
