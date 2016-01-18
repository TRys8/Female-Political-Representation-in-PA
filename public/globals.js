var g_electionResultsAggregate = undefined;
var g_districtCenters = undefined;

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
  }
});
