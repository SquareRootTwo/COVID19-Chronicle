var mapData = d3.map();

d3.csv("https://raw.githubusercontent.com/SquareRootTwo/COVID19-Chronicle/master/Covid_Data.csv", function(error, data) {
    console.log(data);
    data.forEach(function(entry) {
        mapData.set(entry.id, entry['66_i']);
    });
    initMap();
});