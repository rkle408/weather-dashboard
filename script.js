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
var weatherData = $('#weather');
console.log(weatherData);


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

// store as an array, then do a for-loop

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

//Call from the correct One Call API!! 
function getOneCall (latitude, longitude) {
    var oneCallUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+API_key;
                
        fetch(oneCallUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data); // This is an object, doesn't have length property, need to do for-loop for array
                // forloop to get info here
                //for (i=0; i < data.current.length; i++) {
                    var temperatureData = document.createElement("h2");
                    temperatureData.textContent = "Temperature:" + data.current.temp;
                    weatherData.append(temperatureData);
                    console.log("hi!");
                //}
            });
};