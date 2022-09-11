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
var cityName = $('city-name')

function displayTime () {
    var timeNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeEl.text(timeNow);
    // Use to test connection
    //alert("hello");
}

// Declare time function
setInterval(displayTime, 1000);

// Search button saves to local storage
// NEED TO FIGURE OUT HOW TO SAVE ALL INDIVIDUAL SEARCHES AND DISPLAY AS BUTTONS
searchButton.on('click', function (event) { 
    event.preventDefault();

    console.log(userCities.val());
    localStorage.setItem("searchedCity", userCities.val());
});

var storedCities = localStorage.getItem("searchedCity");
searchHistory.text(storedCities);

// Need function to get the weather and to display data:
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=90f20119a63b80bc6e3ec3b202bae4ee";

    // Need to figure out how to get uer's desired input in the lat and long in the URL above

    // Fetch API using the browswer fetch method (no need to worry about linking jquery with AJAX)
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        // Need to convert
        .then(function (data) {
            console.log(data)
        });
