//Geolocation


$('#submit-btn').click( ()=> getPosition() );

  function getPosition() {
    let zip = $('#zip').val(),
    key="0RPiShisa4GGeZNcC8OauGReCnjSsysi"
    zipApi=`https://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${zip}&thumbMaps=false&outFormat=json`;
    // console.log(zipApi);
    $.get(zipApi, (data) => {
      const info = data.results[0].locations[0];
      // console.log(JSON.stringify(info))
      if(info == null) {
        $('#weather-container').html(`<h1>Try again mate..</h1>`);
        return false;

      }else {
        // console.log(info.adminArea1)
        info.adminArea6 !== "" && info.adminArea6 !== undefined && info.adminArea6 !== null ?  $('#loc6').html(`${info.adminArea6} `) : $('#loc6').text(""); 
        info.adminArea5 !== "" && info.adminArea5 !== undefined && info.adminArea5 !== null ?  $('#loc5').html(`${info.adminArea5} `) : $('#loc5').text("");
        info.adminArea4 !== "" && info.adminArea4 !== undefined && info.adminArea4 !== null ?  $('#loc4').html(`${info.adminArea4} `) : $('#loc4').text("");
        info.adminArea3 !== "" && info.adminArea3 !== undefined && info.adminArea3 !== null ?  $('#loc3').html(`${info.adminArea3} `) : $('#loc3').text("");
        info.adminArea1 !== "" && info.adminArea1 !== undefined && info.adminArea1 !== null ?  $('#loc1').html(`${info.adminArea1} `) : $('#loc1').text("");

        // console.log("inside getPosition")
    var lat = info.latLng.lat;
    var lon = info.latLng.lng;
  
    $("#coord").html("lat: " + lat.toFixed(2) + " | lon: " + lon.toFixed(2));
  
    var api =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=b177b37ff422e147c302ba4b75a1482e";
    // console.log(api)
    $.get(api, function(data) {
      var kelvin = data.main.temp;
      var city = data.name;
      var wind = data.wind.speed;
      var windImperial = (data.wind.speed * 2.23).toFixed(1);
      var dir = Math.round(data.wind.deg);
      // console.log( "dir = " + dir );
      var hum = data.main.humidity;
      var fahrenheit = Math.round(data.main.temp * (9 / 5) - 459.67);
      var celsius = kelvin - 273.15 + "&#8451;";
      var weather = data.weather[0].main;
      var weatherDescription = data.weather[0].description;
      var icon = data.weather[0].icon;
      var viz;
      var cloudCover;
      var skycons = new Skycons({ color: "white" });
      
      
      //Pulls icon data from weather api and chooses skycon
      var skyconChoice = (function(weather) {
        var answer;
        switch (weather) {
          case "01d":
            answer = "clear-day";
            break;
          case "01n":
            answer = "clear-night";
            break;
          case "02d":
          case "03d":
          case "04d":
            answer = "partly-cloudy-day";
            break;
          case "02n":
          case "03n":
          case "04n":
            answer = "partly-cloudy-night";
            break;
          case "09d":
          case "10d":
          case "11d":
          case "09n":
          case "09d":
          case "10d":
          case "11d":
            answer = "rain";
            break;
          case "13d":
          case "13n":
            answer = "snow";
            break;
          case "50d":
          case "50n":
            answer = "fog";
            break;
        }
        return answer;
      })(icon);
      
      
      //Function to return Varible if direction is undefined
      function getWindDirection(dir) {
        var result;
        
        if (dir >= 0 && dir <= 360 )
          result = dir;
        else
          result = "Variable";
        return result;
      }
      
     var windDirection = getWindDirection( dir );
      
   
      
      // Function to translate cloud cover percentage to string
      function getViz(clouds) {
        var result;
        if (clouds > 0 && clouds < 10) {
          return (result = "Clear skies. Go outside!");
        } else if (clouds >= 10 && clouds < 20) {
          return (result = "Skies Fair. Yay!");
        } else if (clouds >= 20 && clouds < 30) {
          return (result = "Mostly sunny. Woohoo!");
        } else if (clouds >= 40 && clouds < 70) {
          return (result = "Partly cloudy. Still OK tho.");
        } else if (clouds >= 70 && clouds < 90) {
          return (result = "Mostly cloudy. Meh.");
        } else if (clouds >= 90 && clouds < 100) {
          return (result = "Skies Broken. Boo!");
        } else if (clouds == 100) {
          return (result = "Overcast :( ");
        } else {
          return (result = "Data unavailable");
        }
        //console.log(result + " func return inside getViz func def");
        return result;
      }
  
      viz = getViz(data.clouds.all);
      //console.log("Viz = " + viz);
      
      //RegEx to capitalize the first letter of each word in the api weather data
      var re = /(\b[a-z](?!\s))/g;
      weatherDescription = weatherDescription.replace(re, function(x){return x.toUpperCase();});
      
      
      $("#loc").html(city);
      $("#temp").html("Temperature: " + fahrenheit + "° F");
      $("#hum").html("Humidity: " + hum + "%");
      $("#cover").html("Visibility: " + viz);
      $("#wind").html("Winds: " + windImperial + " Miles per hour" + " @ " + windDirection + "&deg;");
      $("#comments").html("Conditions: " + weatherDescription);
  
      skycons.add("icon", skyconChoice);
      skycons.play();
  
      // Change temp scale func definition
      function changeTempScale($this) {
        var i = parseInt($this.attr("tempVal"));
        var t = $this.attr("tempUnit");
  
        if (t == "fahrenheit") {
          $this.html("Temperature: " + Math.round(data.main.temp - 273.15) + "° C");
          $this.attr("tempUnit", "celsius");
        } else {
          $this.html( "Temperature: " + Math.round(data.main.temp * (9 / 5) - 459.67) + "° F");
  
          $this.attr("tempUnit", "fahrenheit");
        }
      }
  
      // Change temp scale function call
      $("#temp").on("click", function() {
        if (data) changeTempScale($(this));
      });
  
      // Change wind scale func definition
      function changeWindScale($this) {
        var i = parseInt($this.attr("windVal"));
        var t = $this.attr("windUnit");
  
        if (t == "imperial") {
          $this.html(
            "Winds: " + data.wind.speed + " Meters per second" + " @ " + windDirection + "&deg;"
          );
          $this.attr("windUnit", "metric");
        } else {
          $this.html(
            "Winds: " + (data.wind.speed * 2.23).toFixed(1) +
              " Miles per hour" +
              " @ " +
              dir +
              "&deg;"
          );
  
          $this.attr("windUnit", "imperial");
        }
      }
      
      // Change wind scale func call
      $("#wind").on("click", function() {
        if (data) changeWindScale($(this));
      });
    });



      }

    }).fail(data => {
      console.log("Fail" + JSON.stringify(data.info.statuscode))
    })
    
}
  