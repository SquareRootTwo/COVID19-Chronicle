var mapData = d3.map();
var csvData;
var articleData;

d3.csv("https://raw.githubusercontent.com/SquareRootTwo/COVID19-Chronicle/master/data/Covid_Data.csv", function(error, data) {
    csvData = data;
    lastDay = ((Object.keys(csvData[0]).length - 3) / 7) - 1;
    document.getElementById("slider").max = lastDay;
    currentDay = lastDay;
    initMap();
});

d3.json("https://raw.githubusercontent.com/SquareRootTwo/COVID19-Chronicle/master/data/articles.json", function(error, data) {
    articleData = data;
});