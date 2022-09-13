// Test connection:
// alert("hello");

// TO DO:
// Need to fetch weather API
// NEED TO RENDER THE WEATHER!!!
// Need to do local storage for user's search history
// Need a functional search bar - DONE
// Need list of city history
// Create buttons for previous cities in .searchHistoryList
// Add time to header

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
    // Need to make sure API is fetched
    getCityData();
    displayPastSearches();
});

// Local Storage 
var previousSearch = JSON.parse(localStorage.getItem("previousSearches")) || [];

// Display past searches
function displayPastSearches () {
    var newCity = $('#citySearch').val().trim();
    // Test: console.log($('#citySearch').val());
    // Unshift() adds new information to the beginning of the array
    previousSearch.unshift(newCity);
    // Test: console.log(previousSearch);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearch));
    
    for (index = 0; index < previousSearch.length; index++) {
        let previousSearches = previousSearch[index];
        console.log(previousSearches);
        var previous = document.createElement("button");
        previous.textContent = previousSearches;
        searchHistory.append(previous);
    }
}

//Need a function to convert city name to lat and lon due to One Call
function getCityData() {
    var openWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userCities.val()+"&limit=5&appid="+API_key;

    // Fetch API using the browswer fetch method (no need to worry about linking jquery with AJAX)
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        // Need to convert
        .then(function (data) {
            console.log(data);

            // for (i=0; i < data.length; i++) {
            //     var cityNameData = $('<h2>');
            //     cityNameData.textContent = data[0].name;
            //     weatherData.append(cityNameData);
            //     }

            var longitude = data[0].lon;
            var latitude = data[0].lat;

            // Insert the values from Geocoding into the One Call API to get the data from here into the other function!!
            getOneCall(latitude, longitude);
            
        });
};

//Call from the correct One Call API to get our weather data!! 
function getOneCall (latitude, longitude) {
    var oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+API_key;
                
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
                
                // Get and display temp
                var temperatureData = document.createElement("p");
                temperatureData.textContent = "Temperature: " + data.current.temp + " °F";
                weatherData.append(temperatureData);
                // console.log("hi!");
                
                // Get and display icon
                // NEED TO CONVERT TO THE IMAGE...
                var iconData = document.createElement("p");
                iconData.textContent = data.current.weather[0].icon;
                weatherData.append(iconData);

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
                if (data.current.uvi < 3) {
                    $(uvIndexData).addClass("green");
                } else if (data.current.uvi > 2 && data.current.uvi < 6) {
                    $(uvIndexData).addClass("yellow");
                } else if (data.current.uvi > 5 && data.current.uvi < 8) {
                    $(uvIndexData).addClass("orange");
                } else if (data.current.uvi > 7 && data.current.uvi <11) {
                    $(uvIndexData).addClass("red");
                } else {
                    $(uvIndexData).addClass("violet");
                }

                //5 Day forecast -- data.daily
                // This is an object, doesn't have length property, need to do for-loop for daily array

                var dailyForecast = data.daily;
                    for (index = 1; index < 5; index++) {
                        // Date
                        var dateForecast = document.createElement("p");
                        var unixDateForecast = data.daily[index].dt;
                        var date = moment.unix(unixDateForecast).format("MM/DD/YYYY");
                        dateForecast.textContent = date;
                        futureForecast.append(dateForecast);

                        // Icon
                        var iconForecast= document.createElement("p");
                        iconForecast.textContent = data.daily[index].weather.icon;
                        futureForecast.append(iconForecast);
                        
                        // Temperature
                        var tempForecast = document.createElement("p");
                        tempForecast.textContent = "Temperature: " + data.daily[index].temp.day + " °F";
                        futureForecast.append(tempForecast);

                        // Wind Speed
                        var windSpeedForecast = document.createElement("p");
                        windSpeedForecast.textContent = "Wind Speed: " + data.daily[index].wind_speed + " mph";
                        futureForecast.append(windSpeedForecast);

                        // Humidity
                        var humidityForecast = document.createElement("p");
                        humidityForecast.textContent = "Humidity: " + data.daily[index].humidity + "%";
                        futureForecast.append(humidityForecast);
                    }
            });
};