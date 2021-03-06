/* Javascript */

            
$(document).ready(function(){
    
    // Determine correct weather icon
        // Icons: Credit to umutavci on deviantart - http://umutavci.deviantart.com/art/weather-icon-set-165476034
    function getIcon(iconCode){
        var icon;
        j= iconCode;
        switch(j){

                // Thunderstorm
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
            case 960:
            case 961:
                icon = '<img src="media/thunderstorms01.png" alt="" class="iconSize"/>';
                break;

                // Showers
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 520:
            case 521:
            case 522:
            case 531:
                icon = '<img src="media/flurries.png" alt="" class="iconSize"/>';
                break;

                // Rain
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 906:
                icon = '<img src="media/rain03.png" alt="" class="iconSize"/>';
                break;

                // Snow
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                icon = '<img src="media/snow.png" alt="" class="iconSize"/>';
                break;

                // Fog, Mist, Haze, etc.
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
                icon = '<img src="media/fog.png" alt="" class="iconSize"/>';
                break;

                // Clouds
            case 800:
                icon = '<img src="media/clear.png" alt="" class="iconSize"/>';
                break;
            case 801:
                icon = '<img src="media/mostlysunny.png" alt="" class="iconSize"/>';
                break;
            case 802:
                icon = '<img src="media/scatteredclouds.png" alt="" class="iconSize"/>';
                break;
            case 803:
            case 804:
                icon = '<img src="media/partlysunny.png" alt="" class="iconSize"/>';
                break;

                // Strong winds, Hurricane, Tornado
            case 771:
            case 781:
            case 900:
            case 901:
            case 902:
            case 905:
            case 952:
            case 953:
            case 954:
            case 955:
            case 956:
            case 957:
            case 958:
            case 959:
            case 962:
                icon = '<img src="media/windy.png" alt="" class="iconSize"/>';
                break;

                // Cold
            case 903:
                icon = '<img src="media/freezingsnow.png" alt="" class="iconSize"/>';
                break;

                // Hot
            case 904:
                icon = '<img src="media/hot02.png" alt="" class="iconSize"/>';
                break;

                // Calm, Settling, and unaccounted for
            default: 
                icon = '<img src="media/unknown.png" alt="" class="iconSize"/>';
                break;
        }
        return(icon);
    }
    
    
        // Functions for unit conversion
        function toF(cel){
            F = cel * 9/5 + 32;
            return F;
        }
        
        function toC(fh){
            C = (fh - 32) * 5/9;
            return C;
        }
    
        function toKMH(mph){
            KMH = mph * 1.609;
            return KMH;
        }
    
        function toMPH(kmh){
            MPH = kmh * 0.621;
            return MPH;
        }
        
    
        // Function converts the unix time stamp to human readable format and compensates for local time zone
    function timeConversion(TIME){
        var newDate = new Date();
        newDate.setTime(TIME*1000);
        timeTaken = newDate;
        var timeString = timeTaken.toString();
        var cTime = timeString.split(" "); 
        return cTime[0]+' '+ cTime[2]+' '+ cTime[1]+' '+ cTime[3]+' '+ cTime[4];
    }
    
        // Convert wind direction in degrees to Cardinal Direction                          
    function compass(windDeg){
        if(windDeg >=0 && windDeg <11.25){
            return 'N';
        }else if(windDeg >=12.25 && windDeg <33.75){
            return 'NNE';
        }else if(windDeg >=33.75 && windDeg <56.25){
            return 'NE';
        }else if(windDeg >=56.25 && windDeg <78.75){
            return 'ENE';
        }else if(windDeg >=78.75 && windDeg <101.25){
            return 'E';
        }else if(windDeg >=101.25 && windDeg <123.75){
            return 'ESE';
        }else if(windDeg >=123.75 && windDeg <146.25){
            return 'SE';
        }else if(windDeg >=146.25 && windDeg <168.75){
            return 'SSE';
        }else if(windDeg >=168.75 && windDeg <191.25){
            return 'S';
        }else if(windDeg >=191.25 && windDeg <213.75){
            return 'SSW';
        }else if(windDeg >=213.75 && windDeg <236.25){
            return 'SW';
        }else if(windDeg >=236.25 && windDeg <258.75){
            return 'WSW';
        }else if(windDeg >=258.75 && windDeg <281.25){
            return 'W';
        }else if(windDeg >=281.25 && windDeg <303.75){
            return 'WNW';
        }else if(windDeg >=303.75 && windDeg <326.25){
            return 'NW';
        }else if(windDeg >=326.25 && windDeg <348.75){
            return 'NNW';
        }else if(windDeg >=348.75 && windDeg <=360){
            return 'N';
        }
    }
    
        // Capitalises the first letter of each word. Solution from StackOverflow
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } 
    
        // Causes the homepage to reload allowing GPS to be run a second time
    $('.homeBtn').on('click', function(){
        $.mobile.changePage('#homepage');
        window.location.reload('true');
    });
    
    $('#submitForm').on('click', function(){
        $('#popup').popup('open');
    });
    
         // GPS AREA

    $('#gps').on('pageinit', function(){
              
        navigator.geolocation.getCurrentPosition(showPosition);
        function showPosition(position){
            console.log(position);
            var x = position.coords.latitude;
            var y = position.coords.longitude;
            console.log(x +',' + y);
            localStorage.lat = x;
            localStorage.lon = y;
            
            $.ajax({
            url: "http://openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y,
            data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                    units : "metric"},
            dataType: 'jsonp',
            type: "POST",
            success: function(data){
                console.log('SUCCESS');
                console.log(data);
            },
            error: function(){
                console.log('ERROR');
                alert('It appears an error has occured. Please try again later.');
            },
            complete: function(data){
                console.log('COMPLETE');
                console.log(data);
                $.mobile.changePage("#gpsWeather");

                // Temperatures Current / Min / Max
                var gpsT = Math.round(data.responseJSON.main.temp * 10)/10;
                var gpsTMax = Math.round(data.responseJSON.main.temp_max * 10)/10;
                var gpsTMin = Math.round(data.responseJSON.main.temp_min * 10)/10;


                // Use the function to produse a readable date
                var dataTime = data.responseJSON.dt;
                var sunriseTime = data.responseJSON.sys.sunrise;
                var sunsetTime = data.responseJSON.sys.sunset;
                currentTime = timeConversion(dataTime);
                upTime = timeConversion(sunriseTime);     
                downTime = timeConversion(sunsetTime);   

                // Remove the Date data from Time stamp to be left with a Time only
                var riseTime = upTime.split(' ');
                riseTime = riseTime[4];
                var setTime = downTime.split(' ');
                setTime = setTime[4];


                // Wind Speed and Direction
                var windDir = data.responseJSON.wind.deg;
                windD = compass(windDir);
                var windSpd = data.responseJSON.wind.speed;
                windS = Math.round(windSpd * 3.6 *10)/10;

                var cond = data.responseJSON.weather[0].description;
                cond = toTitleCase(cond);
                
                                
                 // The output area
                $('.gpsLocation').hide().html(data.responseJSON.name).show();
                $('.gpsTemp').hide().html(gpsT).show();
                $('.gpsTime').hide().html(currentTime).show();
                $('.gpsMax').hide().html(gpsTMax).show();
                $('.gpsMin').hide().html(gpsTMin).show();
                $('.gpsSunrise').hide().html(riseTime).show();
                $('.gpsSunset').hide().html(setTime).show();
                $('.gpswindDir').hide().html(windD).show();
                $('.gpswindSpd').hide().html(windS).show();
                $('.gpsCond').hide().html(cond).show();
                $('.icon').hide().html(getIcon(data.responseJSON.weather[0].id)).show();
                $('.direction').css('transform', 'rotate('+windDir+'deg)');
                
                
                $('.flip').slider().on('change', function(){
                    console.log('clicked');
                    metimp = $('.flip').val();
                    console.log(metimp);
                    if(metimp == "imperial"){
                        gpsT = Math.round(toF(gpsT)*10)/10;
                        gpsTMax = Math.round(toF(gpsTMax)*10)/10;
                        gpsTMin = Math.round(toF(gpsTMin)*10)/10;
                        windS = Math.round(toMPH(windS) *100)/100;
                        
                        $('.gpsTemp').hide().html(gpsT).show();
                        $('.gpsMax').hide().html(gpsTMax).show();
                        $('.gpsMin').hide().html(gpsTMin).show();
                        $('.tempUnits').hide().html('F').show();
                        $('.gpswindSpd').hide().html(windS).show();
                        $('.speedUnit').hide().html('mph').show();
                        
                        localStorage.metimp = "imperial";
                    }else if(metimp == "metric"){
                        gpsT = Math.round(toC(gpsT)*10)/10;
                        gpsTMax = Math.round(toC(gpsTMax)*10)/10;
                        gpsTMin = Math.round(toC(gpsTMin)*10)/10;
                        windS = Math.round(toKMH(windS) *100)/100;
                        
                        $('.gpsTemp').hide().html(gpsT).show();
                        $('.gpsMax').hide().html(gpsTMax).show();
                        $('.gpsMin').hide().html(gpsTMin).show();
                        $('.tempUnits').hide().html('C').show();
                        $('.gpswindSpd').hide().html(windS).show();
                        $('.speedUnit').hide().html('km/h').show();
                        
                        localStorage.metimp = "metric";
                    }
                });
                   

                $('#forecast').on('pageinit', function(){
                    // Forecast count set to 6 as at time of trialing current day is present in forecast data.
                    $.ajax({
                        url: "http://openweathermap.org/data/2.5/forecast/daily?lat="+x+"&lon="+y,
                        data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                            units : "metric",
                            cnt : "6"
                        },
                        dataType: 'jsonp',
                        type: "POST",
                        success: function(data){
                            console.log('SUCCESS');;
                        },
                        error: function(){
                            console.log('ERROR');
                            alert('It appears an error has occured. Please try again later.');
                        },
                        complete: function(data){
                            console.log('COMPLETE');
                            console.log(data);
                            
                            
                            function pullForecast(i){
                                //Extract the needed Day data
                                dayData = timeConversion(data.responseJSON.list[i].dt).split(' ');
                                foreDay = dayData[0]+' '+dayData[1]+' '+dayData[2]+' '+dayData[3];
                                // Extract the forecast data - Round temps to one decimal place
                                foreMax = Math.round(data.responseJSON.list[i].temp.max *10)/10;
                                foreMin =  Math.round(data.responseJSON.list[i].temp.min *10)/10;
                                foreCond = data.responseJSON.list[i].weather[0].description;
                                foreCond = toTitleCase(foreCond);
                                // Return the data as an array for access
                                forecastData = new Array(foreDay, foreMax, foreMin, foreCond); 
                                return forecastData; 
                           }
                            
                            console.log(pullForecast(1));
                            console.log(pullForecast(2));
                            console.log(pullForecast(3));
                            console.log(pullForecast(4));
                            console.log(pullForecast(5));
                            
                            // Output loop for forecast data
                            function forecast (){
                                for (i=1; i<=5; i++){
                                    $('#fore'+i).hide().html(pullForecast(i)[0]).show();
                                    if(localStorage.metimp == "imperial"){
                                        $('#max'+i).hide().html(Math.round(toF(pullForecast(i)[1])*10)/10).show();
                                        $('#min'+i).hide().html(Math.round(toF(pullForecast(i)[2])*10)/10).show();
                                    }else if(localStorage.metimp == "metric"){
                                        $('#max'+i).hide().html(pullForecast(i)[1]).show();
                                        $('#min'+i).hide().html(pullForecast(i)[2]).show();
                                    }
                                    $('#cond'+i).hide().html(pullForecast(i)[3]).show();
                                }
                            }
                        forecast();


                        }

                    });
                });
            }});
        }});

         // ADDRESS AREA     

     $('#address').on('pageinit', function(){
         
         $('#submit').on('click', function(){
             var sNumber = document.forms['address']['stNumber'].value;
             var sName = document.forms['address']['stName'].value;
             var sub = document.forms['address']['suburb'].value;
             var st = document.forms['address']['state'].value;
             var cnty = document.forms['address']['country'].value;
             $.mobile.changePage("#addressLoad");
             $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+sNumber+'+'+sName+'+'+sub+'+'+st+'+'+cnty+'&sensor=true',
                dataType: 'json',
                type: "POST",
                error: function(){
                    console.log('ERROR');
                    alert('An error has occured. Please try again later.');
                },
                success: function(data){
                console.log('SUCCESS');
                console.log(data);
                localStorage.lat = data.results[0].geometry.location.lat;
                localStorage.lon = data.results[0].geometry.location.lng;
                x = localStorage.lat;
                y = localStorage.lon;
                
                $.ajax({
                    url: "http://openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y,
                    data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                            units : "metric"},
                    dataType: 'jsonp',
                    type: "POST",
                    success: function(data){
                        console.log('SUCCESS');
                        console.log(data);
                    },
                    error: function(){
                        console.log('ERROR');
                        alert('It appears an error has occured. Please try again later.');
                    },
                    complete: function(data){
                        console.log('COMPLETE');
                        console.log(data);
                        $.mobile.changePage("#gpsWeather");

                        // Temperatures Current / Min / Max
                        var gpsT = Math.round(data.responseJSON.main.temp * 10)/10;
                        var gpsTMax = Math.round(data.responseJSON.main.temp_max * 10)/10;
                        var gpsTMin = Math.round(data.responseJSON.main.temp_min * 10)/10;


                        // Use the function to produse a readable date
                        var dataTime = data.responseJSON.dt;
                        var sunriseTime = data.responseJSON.sys.sunrise;
                        var sunsetTime = data.responseJSON.sys.sunset;
                        currentTime = timeConversion(dataTime);
                        upTime = timeConversion(sunriseTime);     
                        downTime = timeConversion(sunsetTime);   

                        // Remove the Date data from Time stamp to be left with a Time only
                        var riseTime = upTime.split(' ');
                        riseTime = riseTime[4];
                        var setTime = downTime.split(' ');
                        setTime = setTime[4];


                        // Wind Speed and Direction
                        var windDir = data.responseJSON.wind.deg;
                        windD = compass(windDir);
                        var windSpd = data.responseJSON.wind.speed;
                        windS = Math.round(windSpd * 3.6 *10)/10;

                        var cond = data.responseJSON.weather[0].description;
                        cond = toTitleCase(cond);


                         // The output area
                        $('.gpsLocation').hide().html(data.responseJSON.name).show();
                        $('.gpsTemp').hide().html(gpsT).show();
                        $('.gpsTime').hide().html(currentTime).show();
                        $('.gpsMax').hide().html(gpsTMax).show();
                        $('.gpsMin').hide().html(gpsTMin).show();
                        $('.gpsSunrise').hide().html(riseTime).show();
                        $('.gpsSunset').hide().html(setTime).show();
                        $('.gpswindDir').hide().html(windD).show();
                        $('.gpswindSpd').hide().html(windS).show();
                        $('.gpsCond').hide().html(cond).show();
                        $('.icon').hide().html(getIcon(data.responseJSON.weather[0].id)).show();
                        $('.direction').css('transform', 'rotate('+windDir+'deg)');
                
                        $('.flip').slider().on('change', function(){
                            console.log('clicked');
                            metimp = $('.flip').val();
                            console.log(metimp);
                            if(metimp == "imperial"){
                                gpsT = Math.round(toF(gpsT)*10)/10;
                                gpsTMax = Math.round(toF(gpsTMax)*10)/10;
                                gpsTMin = Math.round(toF(gpsTMin)*10)/10;
                                windS = Math.round(toMPH(windS) *100)/100;

                                $('.gpsTemp').hide().html(gpsT).show();
                                $('.gpsMax').hide().html(gpsTMax).show();
                                $('.gpsMin').hide().html(gpsTMin).show();
                                $('.tempUnits').hide().html('F').show();
                                $('.gpswindSpd').hide().html(windS).show();
                                $('.speedUnit').hide().html('mph').show();

                                localStorage.metimp = "imperial";
                            }else if(metimp == "metric"){
                                gpsT = Math.round(toC(gpsT)*10)/10;
                                gpsTMax = Math.round(toC(gpsTMax)*10)/10;
                                gpsTMin = Math.round(toC(gpsTMin)*10)/10;
                                windS = Math.round(toKMH(windS) *100)/100;

                                $('.gpsTemp').hide().html(gpsT).show();
                                $('.gpsMax').hide().html(gpsTMax).show();
                                $('.gpsMin').hide().html(gpsTMin).show();
                                $('.tempUnits').hide().html('C').show();
                                $('.gpswindSpd').hide().html(windS).show();
                                $('.speedUnit').hide().html('km/h').show();

                                localStorage.metimp = "metric";
                            }
                        });
                        
                        
                        $('#forecast').on('pageinit', function(){
                            // Forecast count set to 6 as at time of trialing current day is present in forecast data.
                            $.ajax({
                                url: "http://openweathermap.org/data/2.5/forecast/daily?lat="+x+"&lon="+y,
                                data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                                    units : "metric",
                                    cnt : "6"
                                },
                                dataType: 'jsonp',
                                type: "POST",
                                success: function(data){
                                    console.log('SUCCESS');;
                                },
                                error: function(){
                                    console.log('ERROR');
                                    alert('It appears an error has occured. Please try again later.');
                                },
                                complete: function(data){
                                    console.log('COMPLETE');
                                    console.log(data);


                                    function pullForecast(i){
                                        //Extract the needed Day data
                                        dayData = timeConversion(data.responseJSON.list[i].dt).split(' ');
                                        foreDay = dayData[0]+' '+dayData[1]+' '+dayData[2]+' '+dayData[3];
                                        // Extract the forecast data - Round temps to one decimal place
                                        foreMax = Math.round(data.responseJSON.list[i].temp.max *10)/10;
                                        foreMin =  Math.round(data.responseJSON.list[i].temp.min *10)/10;
                                        foreCond = data.responseJSON.list[i].weather[0].description;
                                        foreCond = toTitleCase(foreCond);
                                        // Return the data as an array for access
                                        forecastData = new Array(foreDay, foreMax, foreMin, foreCond); 
                                        return forecastData;
                                    }

                                    console.log(pullForecast(1));
                                    console.log(pullForecast(2));
                                    console.log(pullForecast(3));
                                    console.log(pullForecast(4));
                                    console.log(pullForecast(5));

                                    // Output loop for forecast data
                                    function forecast (){
                                        for (i=1; i<=5; i++){
                                            $('#fore'+i).hide().html(pullForecast(i)[0]).show();
                                            if(localStorage.metimp == "imperial"){
                                                $('#max'+i).hide().html(Math.round(toF(pullForecast(i)[1])*10)/10).show();
                                                $('#min'+i).hide().html(Math.round(toF(pullForecast(i)[2])*10)/10).show();
                                            }else if(localStorage.metimp == "metric"){
                                                $('#max'+i).hide().html(pullForecast(i)[1]).show();
                                                $('#min'+i).hide().html(pullForecast(i)[2]).show();
                                            }
                                            $('#cond'+i).hide().html(pullForecast(i)[3]).show();
                                        }
                                    }

                                forecast();


                                }

                            });
                        });
                    }});               
                }});
            });
        });
         
         
         // HISTORY AREA
     
     $('#history').on('pageinit', function(){
         x = localStorage.lat;
         y = localStorage.lon;
         $.ajax({
            url: "http://openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y,
            data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                    units : "metric"},
            dataType: 'jsonp',
            type: "POST",
            success: function(data){
                console.log('SUCCESS');
                console.log(data);
            },
            error: function(){
                console.log('ERROR');
                alert('It appears an error has occured. Please try again later.');
            },
            complete: function(data){
                console.log('COMPLETE');
                console.log(data);
                $.mobile.changePage("#gpsWeather");

                // Temperatures Current / Min / Max
                var gpsT = Math.round(data.responseJSON.main.temp * 10)/10;
                var gpsTMax = Math.round(data.responseJSON.main.temp_max * 10)/10;
                var gpsTMin = Math.round(data.responseJSON.main.temp_min * 10)/10;


                // Use the function to produse a readable date
                var dataTime = data.responseJSON.dt;
                var sunriseTime = data.responseJSON.sys.sunrise;
                var sunsetTime = data.responseJSON.sys.sunset;
                currentTime = timeConversion(dataTime);
                upTime = timeConversion(sunriseTime);     
                downTime = timeConversion(sunsetTime);   

                // Remove the Date data from Time stamp to be left with a Time only
                var riseTime = upTime.split(' ');
                riseTime = riseTime[4];
                var setTime = downTime.split(' ');
                setTime = setTime[4];


                // Wind Speed and Direction
                var windDir = data.responseJSON.wind.deg;
                windD = compass(windDir);
                var windSpd = data.responseJSON.wind.speed;
                windS = Math.round(windSpd * 3.6 *10)/10;

                var cond = data.responseJSON.weather[0].description;
                cond = toTitleCase(cond);
                
                                
                 // The output area
                $('.gpsLocation').hide().html(data.responseJSON.name).show();
                $('.gpsTemp').hide().html(gpsT).show();
                $('.gpsTime').hide().html(currentTime).show();
                $('.gpsMax').hide().html(gpsTMax).show();
                $('.gpsMin').hide().html(gpsTMin).show();
                $('.gpsSunrise').hide().html(riseTime).show();
                $('.gpsSunset').hide().html(setTime).show();
                $('.gpswindDir').hide().html(windD).show();
                $('.gpswindSpd').hide().html(windS).show();
                $('.gpsCond').hide().html(cond).show();
                $('.icon').hide().html(getIcon(data.responseJSON.weather[0].id)).show();
                $('.direction').css('transform', 'rotate('+windDir+'deg)');
                
                
                $('.flip').slider().on('change', function(){
                    console.log('clicked');
                    metimp = $('.flip').val();
                    console.log(metimp);
                    if(metimp == "imperial"){
                        gpsT = Math.round(toF(gpsT)*10)/10;
                        gpsTMax = Math.round(toF(gpsTMax)*10)/10;
                        gpsTMin = Math.round(toF(gpsTMin)*10)/10;
                        windS = Math.round(toMPH(windS) *100)/100;
                        
                        $('.gpsTemp').hide().html(gpsT).show();
                        $('.gpsMax').hide().html(gpsTMax).show();
                        $('.gpsMin').hide().html(gpsTMin).show();
                        $('.tempUnits').hide().html('F').show();
                        $('.gpswindSpd').hide().html(windS).show();
                        $('.speedUnit').hide().html('mph').show();
                        
                        localStorage.metimp = "imperial";
                    }else if(metimp == "metric"){
                        gpsT = Math.round(toC(gpsT)*10)/10;
                        gpsTMax = Math.round(toC(gpsTMax)*10)/10;
                        gpsTMin = Math.round(toC(gpsTMin)*10)/10;
                        windS = Math.round(toKMH(windS) *100)/100;
                        
                        $('.gpsTemp').hide().html(gpsT).show();
                        $('.gpsMax').hide().html(gpsTMax).show();
                        $('.gpsMin').hide().html(gpsTMin).show();
                        $('.tempUnits').hide().html('C').show();
                        $('.gpswindSpd').hide().html(windS).show();
                        $('.speedUnit').hide().html('km/h').show();
                        
                        localStorage.metimp = "metric";
                    }
                });
                   

                $('#forecast').on('pageinit', function(){
                    // Forecast count set to 6 as at time of trialing current day is present in forecast data.
                    $.ajax({
                        url: "http://openweathermap.org/data/2.5/forecast/daily?lat="+x+"&lon="+y,
                        data: { APIID : "bdef299bf14d1581239b8c941072c63c",
                            units : "metric",
                            cnt : "6"
                        },
                        dataType: 'jsonp',
                        type: "POST",
                        success: function(data){
                            console.log('SUCCESS');;
                        },
                        error: function(){
                            console.log('ERROR');
                            alert('It appears an error has occured. Please try again later.');
                        },
                        complete: function(data){
                            console.log('COMPLETE');
                            console.log(data);
                            
                            
                            function pullForecast(i){
                                //Extract the needed Day data
                                dayData = timeConversion(data.responseJSON.list[i].dt).split(' ');
                                foreDay = dayData[0]+' '+dayData[1]+' '+dayData[2]+' '+dayData[3];
                                // Extract the forecast data - Round temps to one decimal place
                                foreMax = Math.round(data.responseJSON.list[i].temp.max *10)/10;
                                foreMin =  Math.round(data.responseJSON.list[i].temp.min *10)/10;
                                foreCond = data.responseJSON.list[i].weather[0].description;
                                foreCond = toTitleCase(foreCond);
                                // Return the data as an array for access
                                forecastData = new Array(foreDay, foreMax, foreMin, foreCond); 
                                return forecastData; 
                           }
                            
                            console.log(pullForecast(1));
                            console.log(pullForecast(2));
                            console.log(pullForecast(3));
                            console.log(pullForecast(4));
                            console.log(pullForecast(5));
                            
                            // Output loop for forecast data
                            function forecast (){
                                for (i=1; i<=5; i++){
                                    $('#fore'+i).hide().html(pullForecast(i)[0]).show();
                                    if(localStorage.metimp == "imperial"){
                                        $('#max'+i).hide().html(Math.round(toF(pullForecast(i)[1])*10)/10).show();
                                        $('#min'+i).hide().html(Math.round(toF(pullForecast(i)[2])*10)/10).show();
                                    }else if(localStorage.metimp == "metric"){
                                        $('#max'+i).hide().html(pullForecast(i)[1]).show();
                                        $('#min'+i).hide().html(pullForecast(i)[2]).show();
                                    }
                                    $('#cond'+i).hide().html(pullForecast(i)[3]).show();
                                }
                            }
                        forecast();


                        }

                    });
                });
            }});
     });

});
