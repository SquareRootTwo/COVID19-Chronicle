var mapData = d3.map();
var csvData;

d3.csv("https://raw.githubusercontent.com/SquareRootTwo/COVID19-Chronicle/master/Covid_Data.csv", function(error, data) {
    csvData = data;
    initMap();
});