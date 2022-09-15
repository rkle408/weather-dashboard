// Test connection:
// alert("hello");

// TO DO:
// Need to fetch weather API -- Done
// NEED TO RENDER THE WEATHER!!! -- Done
// Need to do local storage for user's search history -- Done
// Need a functional search bar -- Done
// Need list of city history -- Done
// Create buttons for previous cities in .searchHistoryList -- Needs to be functional buttons!
// Add time to header -- Done

var timeEl = $('.timeNow');
var userCities = $('#citySearch');
var searchButton = $('#citySearchButton');
var searchHistory = $('#searchHistoryList');
var cityName =$('#city-name');
var weatherData = $('#weather');
var futureForecast = $('#futureForecast');

// Get time from moment.js, already linked in HTML to be able to use here
function displayTime () {
    var timeNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeEl.text(timeNow);
    // Use to test connection
    //alert("hello");
}

// Declare time function on page load
setInterval(displayTime, 1000);


// Search button saves to local storage AND calls the functions to work once button is clicked
searchButton.on('click', function (event) { 
    event.preventDefault();
    displayPastSearches();
    // Need to make sure Geocoding API is fetched, which will then call the getOneCall function
    getCityData();
    weatherData.empty();
    futureForecast.empty();
});

// Create variable that holds event.target, which is going to tell which element triggered the event
// Hopefully will be a button!
// Create another variable that will use variable with event.target, will reach in and get the attribute set earlier
// First variable is getting the element that triggered event = button
// Second variable is getting datasearch of that button, which should be the city name
// Using second variable, can call your functions that display the data

// Local Storage 
var previousSearch = JSON.parse(localStorage.getItem("previousSearches")) || [];

//Need a function to convert city name to lat and lon due to One Call
function getCityData() {
    var openWeatherUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+userCities.val()+"&limit=5&appid=187ae0e1907618a73a372dd383d6fdda";

    // Fetch API using the browswer fetch method (no need to worry about linking jquery with AJAX)
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        // Need to convert
        .then(function (data) {
            console.log(data);

            var cityNameData = document.createElement("h2");
            cityNameData.textContent = data[0].name;
            weatherData.append(cityNameData);

            var longitude = data[0].lon;
            var latitude = data[0].lat;

            // Insert the values from Geocoding into the One Call API to get the data from here into the other function!!
            getOneCall(latitude, longitude);
            
        });
};

//Call from the correct One Call API to get our weather data!! 
function getOneCall (latitude, longitude) {
    var oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=187ae0e1907618a73a372dd383d6fdda";
                
        fetch(oneCallUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data); 
                // Display date            
                // NEED TO CONVERT THIS TO REGULAR HUMAN DATE: "dt"
                // Was using jQuery to createElement, but it didn't render the text to page, only the element

                var dateData = document.createElement("p");
                var unixDateData = data.current.dt;
                var date = moment.unix(unixDateData).format("MM/DD/YYYY");
                dateData.textContent = date;
                weatherData.append(dateData);
                
                // Get and display icon
                // NEED TO CONVERT TO THE IMAGE...
                var iconData = document.createElement("img");
                var iconImage = data.current.weather[0].icon;
                iconData.src = "http://openweathermap.org/img/wn/"+iconImage+".png";
                weatherData.append(iconData);

                // Get and display temp
                var temperatureData = document.createElement("p");
                temperatureData.textContent = "Temperature: " + data.current.temp + " °F";
                weatherData.append(temperatureData);
                // console.log("hi!");

                // Get and display humidity
                var humidityData = document.createElement("p")
                humidityData.textContent = "Humidity: " + data.current.humidity + "%";
                weatherData.append(humidityData);

                // Get and display wind speed
                var windSpeedData = document.createElement("p");
                windSpeedData.textContent = "Wind Speed: " + data.current.wind_speed + " mph";
                weatherData.append(windSpeedData);

                // Get and display UV index
                var uvIndexData = document.createElement("p");
                uvIndexData.textContent = "UV Index: " + data.current.uvi;
                weatherData.append(uvIndexData);

                // NEED TO STYLE UV color with IF -- done
                if (data.current.uvi <= 2 ) {
                    $(uvIndexData).addClass("green");
                } else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                    $(uvIndexData).addClass("yellow");
                } else if (data.current.uvi > 5 && data.current.uvi <= 7) {
                    $(uvIndexData).addClass("orange");
                } else if (data.current.uvi > 7 && data.current.uvi <= 10) {
                    $(uvIndexData).addClass("red");
                } else {
                    $(uvIndexData).addClass("violet");
                }

                //5 Day forecast -- data.daily
                // This is an object, doesn't have length property, need to do for-loop for daily array
                var dailyForecast = data.daily;
                    for (index = 1; index < 6; index++) {
                        // Create a div here, then append to p this div, then div into the HTML
                        // Add class to div to style
                        var separateWeather = document.createElement("section");
                        separateWeather.classList.add("separate");

                        // Date
                        var dateForecast = document.createElement("p");
                        var unixDateForecast = data.daily[index].dt;
                        var date = moment.unix(unixDateForecast).format("MM/DD/YYYY");
                        dateForecast.textContent = date +": ";
                        separateWeather.append(dateForecast);

                        // Icon
                        var iconForecast = document.createElement("img");
                        var iconForecastImage = data.daily[index].weather[0].icon;
                        //console.log(iconForecastImage);
                        iconForecast.src = "http://openweathermap.org/img/wn/"+iconForecastImage+".png";
                        separateWeather.append(iconForecast);
                        
                        // Temperature
                        var tempForecast = document.createElement("p");
                        tempForecast.textContent = "Temperature: " + data.daily[index].temp.day + " °F";
                        separateWeather.append(tempForecast);

                        // Humidity
                        var humidityForecast = document.createElement("p");
                        humidityForecast.textContent = "Humidity: " + data.daily[index].humidity + "%";
                        separateWeather.append(humidityForecast);

                        // Wind Speed
                        var windSpeedForecast = document.createElement("p");
                        windSpeedForecast.textContent = "Wind Speed: " + data.daily[index].wind_speed + " mph";
                        separateWeather.append(windSpeedForecast);

                        futureForecast.append(separateWeather);
                    }
            });
};

function displayPastSearches () {
    // Display previous searches when searchButton is clicked, need info from localStorage
    var newCity = $('#citySearch').val().trim();
    // Test: console.log($('#citySearch').val());
    // Unshift() adds new information to the beginning of the array
    previousSearch.unshift(newCity);
    // Test: console.log(previousSearch);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearch));
    var previousBtn = document.createElement("button");
    // Should have a setAttribute on the button
    previousBtn.setAttribute("data-search", newCity);
    previousBtn.setAttribute("class", "previous");
    previousBtn.textContent = newCity;
    searchHistory.append(previousBtn);

    previousBtn.addEventListener('click', function(event) {
        var clickPrevButton = event.target;
        console.log(clickPrevButton);
        var namePrevCity = clickPrevButton.getAttribute('data-search');
        console.log(namePrevCity);
        // Need to empty data to show previous cities!
        weatherData.empty();
        futureForecast.empty();
        
        // Need to create a function that allows previousBtn value to be inserted into the URL to be called...
        function getCityData2() {
            var openWeatherUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+namePrevCity+"&limit=5&appid=187ae0e1907618a73a372dd383d6fdda";
        
            fetch(openWeatherUrl)
                .then(function (response) {
                    return response.json();
                })
                // Need to convert
                .then(function (data) {
                    console.log(data);
        
                    var cityNameData = document.createElement("h2");
                    cityNameData.textContent = data[0].name;
                    weatherData.append(cityNameData);
        
                    var longitude = data[0].lon;
                    var latitude = data[0].lat;

                    getOneCall(latitude, longitude);
                    
                });
           
        };
        getCityData2();
   });

}