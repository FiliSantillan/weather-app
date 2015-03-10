(function(){
  var WEATHER_KEY = "39a60f72855a3efdcc6c2d2cdea5210b";
  var WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + WEATHER_KEY + "&";
  var IMG_WEATHER = "http://openweathermap.org/img/w/"; 

  var cityWeather = {};
  cityWeather.country;
  cityWeather.zone;
  cityWeather.temp;
  cityWeather.temp_max;
  cityWeather.temp_min;
  cityWeather.image;
  cityWeather.state;
  cityWeather.main;

  var show_form = $(".icon-edit");
  var button_reload = $("icon-reload");

  show_form.click(function() {
    $(".search-city").slideToggle();
  });

  button_reload.on("click", reloadWeather);


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getCoords, errorFound);
  }

  else{
    alert("Por favor actualiza tu navegador");
  };

  function errorFound(error) {
    alert("Un error ocurrio: " + error.code);
    //0: Error desconocido
    //1: Permiso denegado
    //2: Posición no está disponible
    //3: Timeout
  };

  function getCoords(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $.getJSON(WEATHER_URL + 'lat=' + lat + "&lon=" + lon, getCurrentWeather);
  };

  function getCurrentWeather(data) {
    cityWeather.country = data.sys.country;
    cityWeather.zone = data.name;
    cityWeather.temp = data.main.temp - 273.15;
    cityWeather.temp_max = data.main.temp_max - 273.15;
    cityWeather.temp_min = data.main.temp_min - 273.15;
    cityWeather.image = 'svg/' + data.weather[0].icon + '.svg';
    cityWeather.state = data.weather[0].description;
    cityWeather.main = data.weather[0].main;

    renderTemplate();
    console.log(data);
  };

  function activateTemplate(id) {
    var t = document.querySelector(id);
    return document.importNode(t.content, true);
  };

  function renderTemplate() {
    var clone = activateTemplate('#template--city');

    clone.querySelector('[data-country]').innerHTML = cityWeather.country;
    clone.querySelector('[data-temp="current"]').innerHTML = cityWeather.temp.toFixed(1);
    clone.querySelector('[data-image]').src = cityWeather.image;

    //clone.querySelector('[data-time]').innerHTML = ;

    clone.querySelector('[data-temp="max"]').innerHTML = cityWeather.temp_max.toFixed(1);
    clone.querySelector('[data-temp="min"]').innerHTML = cityWeather.temp_min.toFixed(1);
    clone.querySelector('[data-state]').innerHTML = cityWeather.state;
    clone.querySelector('[data-zone]').innerHTML = cityWeather.zone;

    $('#loader').hide();
    $('body').append(clone);
  };

  function reloadWeather() {
    renderTemplate();
  }


})();