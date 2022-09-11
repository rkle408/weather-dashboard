// Test connection:
// alert("hello");

// TO DO:
// Need to fetch weather API
// Need to do local storage for user's search history
// Need a search bar
// Need list of city history

// Add time to header
var timeEl = $('.timeNow');

function displayTime () {
    var timeNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    timeEl.text(timeNow);
    // Use to test connection
    //alert("hello");
}

// Declare time function
setInterval(displayTime, 1000);


// link API using
var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={90f20119a63b80bc6e3ec3b202bae4ee}";

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