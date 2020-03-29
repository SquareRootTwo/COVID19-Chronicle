var mapData = d3.map();

const THRESHOLD_POPUP = 300;

let drag = false;

document.addEventListener('mousedown', () => drag = false);
document.addEventListener('mousemove', () => drag = true);

const getColor = (cases) => {
    if (cases > 100000) {
        return "#9E2A2A";
    } else if (cases > 50000) {
        return "#C14040";
    } else if (cases > 10000) {
        return "#F55050";
    } else if (cases > 5000) {
        return "#F57150";
    } else if (cases > 2500) {
        return "#F59450";
    } else if (cases > 1000) {
        return "#F5A850";
    } else if (cases > 500) {
        return "#F5BE50";
    } else if (cases > 250) {
        return "#F5CB50";
    } else if (cases > 100) {
        return "#F5DF50";
    } else {
        return "#E7E7E7"
    }
}

let width = window.innerWidth,
    height = window.innerHeight,
    rotate = 0,        // so that [-60, 0] becomes initial center of projection
    maxlat = 83;        // clip northern and southern poles (infinite in mercator)
    
let projection = d3.geo.mercator()
    .rotate([-40,0])
    .scale(1)           // we'll scale up to match viewport shortly.
    .translate([width/2, height/2]);

// find the top left and bottom right of current projection
function mercatorBounds(projection, maxlat) {
    let yaw = projection.rotate()[0],
        xymax = projection([-yaw+180-1e-6,-maxlat]),
        xymin = projection([-yaw-180+1e-6, maxlat]);
    
    return [xymin,xymax];
}

// set up the scale extent and initial scale for the projection
let b = mercatorBounds(projection, maxlat),
    s = width/(b[1][0]-b[0][0]),
    scaleExtent = [s, 10*s];

projection
    .scale(scaleExtent[0]);

let zoom = d3.behavior.zoom()
    .scaleExtent(scaleExtent)
    .scale(projection.scale())
    .translate([0,0])               // not linked directly to projection
    .on("zoom", redraw);
    
let path = d3.geo.path()
    .projection(projection);

let svg = d3.selectAll('.map')
    .append('svg')
        .attr('width',width)
        .attr('height',height)
        .call(zoom);

function mapOnResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    document.querySelector("svg").setAttribute("width",width);
    document.querySelector("svg").setAttribute("height",height);
}

function getPopUpPosX (mouseX) {
    let w = window.innerWidth;
    let x;
    
    if (Math.abs(w - mouseX) < THRESHOLD_POPUP) {
        x = (mouseX - 250) + 'px';
    } else {
        x = mouseX + 'px';
    }
    return x;
}

function getPopUpPosY (mouseY) {
    let h = window.innerHeight;
    let y;
    if (Math.abs(h - mouseY) < THRESHOLD_POPUP) {
        y = (mouseY - 250) + 'px';
    } else {
        y = mouseY + 'px';
    }
    return y;
}

function popUpOpen (d) {
    if (!drag) {
        let country = csvData.find(function(el) {
            return el.id == d.id
        });

        let name = country.name;
        let date = printDate();
        let infected = country[currentDay+'_i'];
        let deaths = country[currentDay+'_d'];
        let recovered = country[currentDay+'_r'];

        let popUpText = "<span class='popup_country'>"+ name + "<br></span>"+
                    "<span class='popup_date'>" + date + "<br></span>"+
                    "<span class='popup_infected popup_text'>Infected: <strong>" + infected + "</strong><br></span>"+ 
                    "<span class='popup_deaths popup_text'>Deaths: <strong>" + deaths + "</strong><br></span>"+ 
                    "<span class='popup_recovered popup_text'>Recovered: <strong>" + recovered + "</strong></span>";

        d3.select("#countryInfo")
            .html("")
            .append('div')
            .classed("popUp", true)
            .style('left', getPopUpPosX(d3.mouse(this)[0]))
            .style('top', getPopUpPosY(d3.mouse(this)[1]))
            .html(popUpText);
    }
}

function clearPopUp (d) {
    d3.select("#countryInfo")
        .html("")
        .classed("popUp", false);
}

d3.selection.prototype.moveToFront = function() {  
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

function initMap() {
    d3.json("https://enjalot.github.io/wwsd/data/world/world-110m.geojson", function ready(error, topo) {  
        svg.selectAll("path")
            .data(topo.features)
            .enter().append("path")
                .attr("d", path)
                .classed("country",true)
                .on("mouseup", popUpOpen)
                .on('mouseover', function(d) {
                    d3.select(this).moveToFront();
                })
        
        updateDay();
        redraw();       // update path data
    });
}

// track last translation and scale event we processed
let tlast = [0,0], 
    slast = null;

function updateDay() {
    //update total numbers
    document.getElementById("slider").value = currentDay;
    document.querySelector("#scoreConfirmed").innerText = csvData[0][currentDay+'_i'];
    document.querySelector("#scoreDeaths").innerText = csvData[0][currentDay+'_d'];
    document.querySelector("#scoreRecovered").innerText = csvData[0][currentDay+'_r'];
    document.querySelector(".date").innerText = printDate();

    //update individual countries
    csvData.forEach(function(entry) {
        mapData.set(entry.id, entry[currentDay+'_i']);
    });
    svg.selectAll("path").transition()
        .style("fill", function (d){
            let total = mapData.get(d.id) || 0;
            return getColor(total);
        });
}

function redraw() {
    if (d3.event) { 
        let scale = d3.event.scale,
            t = d3.event.translate;                
        
        // if scaling changes, ignore translation (otherwise touch zooms are weird)
        if (scale != slast) {
            projection.scale(scale);
        } else {
            let dx = t[0]-tlast[0],
                dy = t[1]-tlast[1],
                yaw = projection.rotate()[0],
                tp = projection.translate();
        
            // use x translation to rotate based on current scale
            projection.rotate([yaw+360.*dx/width*scaleExtent[0]/scale, 0, 0]);
            // use y translation to translate projection, clamped by min/max
            let b = mercatorBounds(projection, maxlat);
            if (b[0][1] + dy > 0) dy = -b[0][1];
            else if (b[1][1] + dy < height) dy = height-b[1][1];
            projection.translate([tp[0],tp[1]+dy]);
        }
        // save last values.  resetting zoom.translate() and scale() would
        // seem equivalent but doesn't seem to work reliably?
        slast = scale;
        tlast = t;
    }

    svg.selectAll('path')       // re-project path data
        .attr('d', path)
}

d3.select("body").on("mousedown", clearPopUp);
d3.select("body").on("wheel", clearPopUp);

window.addEventListener('resize', mapOnResize);