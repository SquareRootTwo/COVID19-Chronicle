var mapData = d3.map();

d3.csv("corona2.csv", function(error, data) {
    data.forEach(function(entry) {
        mapData.set(entry.id, entry.infected);
    });
    initMap();
});