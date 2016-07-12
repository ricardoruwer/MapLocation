# Google Maps: Location Picker
- Built in Vanilla JS.
- Uses Google Maps JS API.

## Instalation

```html
<div id="map" style="height:400px"></div>
<input type="text" id="lat">
<input type="text" id="lng">

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script src="maplocation.js"></script>
<script>
    var maplocation = new MapLocation('#map');
</script>
```
- You can get your API KEY at: https://console.developers.google.com

## Options

```html
<script>
var options = {
  lat: 0, //default latitude
  lng: 0, //default longitude
  scrollwheel: false, //disable zoom when scroll
  zoom: 15,
  title: 'Select the company location.', //the title of marker
  latInput: '#lat', //the input for latitude
  lngInput: '#lng', //the input for longitude
  activator: '#showMap' //default: false
  //to load the map by clicking in a button, useful when you want to load a map inside tabs or modal (initiated hidden)
};

var maplocation = new MapLocation('#map', options);
</script>
```

## Tip

If you have an input for Zip Code on your form you can also add something like:

```html
<script>
document.querySelector('input[name=zipcode]').onchange = function () {
  var zip = this.value.replace('-', ''),
      url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zip+'&key=YOUR_API_KEY';

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function ()
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = JSON.parse(xmlhttp.responseText);
      if (response.status != "OK") return;

      var data = response.results[0].geometry.location;
      document.querySelector('#lat').value = data.lat;
      document.querySelector('#lng').value = data.lng;

      document.querySelector('#lat').dispatchEvent(new Event('change'));
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
</script>
```

To put the marker near the place you want.
