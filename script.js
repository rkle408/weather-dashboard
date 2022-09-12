// Test connection:
// alert("hello");

// TO DO:
// Need to fetch weather API
// NEED TO RENDER THE WEATHER!!!
// Need to do local storage for user's search history - done
// Need a functional search bar
// Need list of city history
// Create buttons for previous cities in .searchHistoryList

// Add time to header
var timeEl = $('.timeNow');
var userCities = $('#citySearch');
var searchButton = $('#citySearchButton');
var searchHistory= $('#searchHistoryList');
var cityName =$('#city-name');
var weatherData = $('.weather');

var dateData = $('#dateData');
var iconData = $('#iconData');
var temperatureData = $('#temperatureData');
var humidityData = $('#humidityData');
var windSpeedData = $('#windSpeedData');
var uvIndexData =$('#uvIndexData');

function displayTime () {
    var timeNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeEl.text(timeNow);
    // Use to test connection
    //alert("hello");
}

// Declare time function
setInterval(displayTime, 1000);


// Search button saves to local storage
searchButton.on('click', function (event) { 
    event.preventDefault();

    console.log(userCities.val());
    localStorage.setItem("searchedCity", userCities.val());
    
    // Need to make sure API is fetched
    getCityData();
});

// NEED TO FIGURE OUT HOW TO SAVE ALL INDIVIDUAL SEARCHES AND DISPLAY AS BUTTONS
// Display past searches
var storedCities = localStorage.getItem("searchedCity");
searchHistory.text(storedCities);



// Need function to get the weather and to display data:


//Need a function to convert city name to lat and lon due to One Call
function getCityData() {
    var openWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userCities.val()+"&limit=5&appid=90f20119a63b80bc6e3ec3b202bae4ee";

    // Need to figure out how to get user's desired input in the lat and long in the URL above

    // Fetch API using the browswer fetch method (no need to worry about linking jquery with AJAX)
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        // Need to convert
        .then(function (data) {
            console.log(data);
            var longitude = data[0].lon;
            var latitude = data[0].lat;
            getOneCall(latitude, longitude);

        });
};

//Call from the correct API??
function getOneCall (latitude, longitude) {
    var oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=90f20119a63b80bc6e3ec3b202bae4ee";
                
        fetch(oneCallUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    var cityNameData = $('<p>');
                    cityNameData.textContent = object.data[0].name;
                    weatherData.append(cityNameData);
                };
            });
};