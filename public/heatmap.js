
window.onload = function() {

  // We are not using KML because I have already calculated
  // the centers of the disctrics and saved them in the JSON
  // file.
  // loadDistrictsFromKML();
  loadDistrictsFromJSON();


  var retryCount = 0;
  var preloadChecker = setInterval(function() {

    // $("#status").text("Retry: " + (++retryCount) + ", election-results: " + (g_electionResultsAggregate !== undefined) + ", district-map: " +  (g_districtCenters !== undefined));
    if (g_electionResultsAggregate !== undefined &&
        g_districtCenters !== undefined) {

      clearInterval(preloadChecker);
      initMap();

    }
  }, 100);
};

var map;
var heatmapLayer;

function initMap() {

  // console.log(g_districtCenters, g_electionResultsAggregate);

  var heatmapPoints = [];

  Object.keys(g_electionResultsAggregate.district).forEach(function(key, index) {
    var womenWins = parseInt(g_electionResultsAggregate.district[key]["Woman"]);
    var latLng = g_districtCenters[key];

    for (var ii = 0; ii < womenWins; ++ii) {
      var randomOffset = Math.random()/10000 * Math.pow(-1, Math.random() >= .5 ? 0 : 1);
      // console.log("Random:", latLng.lat()+randomOffset, latLng.lng()+randomOffset);
      heatmapPoints.push(new google.maps.LatLng(latLng.lat()+randomOffset, latLng.lng()+randomOffset));
    }
  });

  // console.log(heatmapPoints);

  map = new google.maps.Map(document.getElementById("heatmap"), {
    center: {lat: 40.8502839, lng: -77.4526058},
    zoom: 6
  });

  heatmapLayer = new google.maps.visualization.HeatmapLayer({
    data: heatmapPoints,
    map: map,
    radius: 12
  });

  /*heatmapLayer.set('radius', ++heatmapLayer.get('radius'));
  heatmapLayer.set('opacity', ++heatmapLayer.get('opacity'));*/

  /*districtLayer = new geoXML3.parser({
    map: map
  });
  districtLayer.parse('2011-Revised-Final-Plan-House.kml');*/
}

function loadDistrictsFromJSON() {
  $.ajax({
    type: "GET",
    url: "house-districts-centers.json",
    dataType: "json",
    success: function(data) {

      var districtCenters = {};

      Object.keys(data).forEach(function(key) {
        districtCenters[key] = new google.maps.LatLng(data[key].lat, data[key].lng);
      });

      g_districtCenters = districtCenters;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("#status").text("There was a problem in loading district maps: " + textStatus + ", " + errorThrown);
    },
    complete: function(jqXHR, textStatus) {
      var status = $("#status").text();
      status += " My work here is done: " + textStatus;
      $("#status").text(status);
    }
  });
}

function loadDistrictsFromKML() {
  $.ajax({
    type: "GET",
    url: "2011-Revised-Final-Plan-House.kml",
    dataType: "xml",
    success: function(xml) {

      var districtCenters = {};

      $(xml).find('Placemark').each(function() {

        var districtNumber = parseInt($(this).children("name").text().split(/\s/)[1]);

        var bounds = new google.maps.LatLngBounds();

        $(this).find("coordinates").text().split(/\s/).forEach(function(line, index) {
          if (line.length === 0) {
            return;
          }

          var items = line.split(/,/);

          /*if (index === 0) {
            console.log(districtNumber, items);
          }*/

          var lng = parseFloat(items[0]);
          var lat = parseFloat(items[1]);

          bounds.extend(new google.maps.LatLng(lat, lng));
        });

        districtCenters[districtNumber] = bounds.getCenter();
      });

      g_districtCenters = districtCenters;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("#status").text("There was a problem in loading district maps: " + textStatus + ", " + errorThrown);
    },
    complete: function(jqXHR, textStatus) {
      var status = $("#status").text();
      status += " My work here is done: " + textStatus;
      $("#status").text(status);
    }
  });
}
