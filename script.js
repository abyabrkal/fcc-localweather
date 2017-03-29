    /*document.addEventListener('DOMContentLoaded', function() {
        alert("Ready!");
    }, false);*/


    //Global variables
    var cTemp = "";
    var city = "";
    var country = "";
    var countryISO2 = "";
    var dayType = "";
    var winSpd = "";
    var winDir = "";
    var humid = "";
    var sunRiseTime = "";
    var sunSetTime = "";
    var meridian = "am";







    // Get City and Country data from IP address
    function getLocation() {

        $.getJSON('http://ipinfo.io/geo', function(response){
          console.log(response.city, response)

          city = response.city;
          $('#city').text(response.city);

          getWeather(response.city);

        });

    		//console.log("CITY  INSIDE - " + response.city);
    	console.log("CITY  OUTSIDE - " + city);
    }



    function getTime(unix_timestamp) {

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);

        // Hours part from the timestamp
        var hours = date.getHours();
        meridian = " am";


        if (hours > 12) {
            hours = hours - 12;
            meridian = " pm";
        }

        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30  format
        var formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime;
     }



    // Get weather data from OpenWeatherMap: https://openweathermap.org
    function getWeather(myCity){

        //URL variables
        var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
        var unitMTR = "&units=metric";
        var callBACK = "&callback=?";
        var apID = "&appid=49feecc2cd382186ed0d59d785a42457";

        var finalURL = baseURL + myCity + unitMTR + apID + callBACK;


        $.ajax({
             url: finalURL,
             data: {
                    format: 'json'
             },
             error: function(error) {
                    //$('#info').html('<p>An error has occurred</p>');
                    console.log("ERROR - " + error.message);
             },
             dataType: 'jsonp',
             success: function(data) {
                    console.log("SUCCESS");
                    console.log(data);

                    // load returned weather data to respective variables
                    parseWeather(data);

             },
             type: 'GET'
        });

    }


	// Load weather data for display
	function parseWeather(data) {

		cTemp = Math.round(data.main.temp);
		$('#temp').text(cTemp);

		dayType = data.weather[0].main;
		$('#dayType').text(data.weather[0].main);

        //ICON
        var icon = ("<img class=\"icn\" src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
        $('#icon').html(icon);

		winSpd = data.wind.speed;
		//winDir = data.wind.deg;
		$('#windSpeed').text(data.wind.speed + ' m/s');
		//$('#windDirection').add(data.wind.deg);

		humid = data.main.humidity;
		$('#humidity').text(data.main.humidity);

		sunRiseTime = getTime(data.sys.sunrise);
        $('#sunrise').text(sunRiseTime + meridian);
		sunSetTime = getTime(data.sys.sunset);
		$('#sunset').text(sunSetTime + meridian);
	}

    function changeTemp(){
        var fH = ((cTemp * 9)/5) + 32;
        document.getElementById("temp").innerHTML = fH;
        document.getElementById("metric").innerHTML = F;
    }



    /*---------- GET READY ------------------*/

    $(document).ready(function(){

        getLocation();

    });





/*

$.getJSON("http://country.io/names.json");
*/
