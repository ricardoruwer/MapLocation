!(function () {
  this.MapLocation = function ()
  {
    var defaults = {
      lat: 0,
      lng: 0,
      scrollwheel: false,
      zoom: 15,
      title: 'Select the company location.',
      latInput: '#lat',
      lngInput: '#lng',
      activator: false
    }

    this.el = document.querySelector(arguments[0]);
    if ( ! this.el ) return false;

    this.options = extendDefaults(defaults, arguments[1]);

    this.init();
  }

  MapLocation.prototype.init = function ()
  {
    if ( ! this.options.activator ) {
      this.initMap();
    } else {
      var self = this;
      document.querySelector(this.options.activator).onclick = function () {
        if (self.el.firstChild) return;
        self.initMap();
      }
    }
  }

  MapLocation.prototype.initMap = function ()
  {
    var latInputVal = document.querySelector(this.options.latInput).value,
        lngInputVal = document.querySelector(this.options.lngInput).value,
        lat = this.options.lat,
        lng = this.options.lng;

    if (latInputVal) lat = +latInputVal;
    if (lngInputVal) lng = +lngInputVal;

    var myLatLng = {lat:lat, lng:lng};

    this.map = new google.maps.Map(this.el, {
      scrollwheel: this.options.scrollwheel,
      zoom: this.options.zoom,
      center: myLatLng
    });

    this.marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      draggable: true,
      title: this.options.title
    });

    this.addDragEvent();
    this.addManualChangeEvent();
  }

  MapLocation.prototype.addDragEvent = function ()
  {
    var self = this;
    google.maps.event.addListener(this.marker, 'dragend', function (event) {
      document.querySelector(self.options.latInput).value = this.getPosition().lat();
      document.querySelector(self.options.lngInput).value = this.getPosition().lng();
    });
  }

  MapLocation.prototype.addManualChangeEvent = function ()
  {
    var self = this;

    document.querySelector(this.options.latInput).onchange = refreshLatLng;
    document.querySelector(this.options.lngInput).onchange = refreshLatLng;

    function refreshLatLng() {
      var lat = document.querySelector(self.options.latInput).value,
          lng = document.querySelector(self.options.lngInput).value,
          newLatLng = new google.maps.LatLng(lat, lng);

      self.marker.setPosition(newLatLng);
      self.map.panTo(newLatLng)
    }
  }

  function extendDefaults(source, properties)
  {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
}());
