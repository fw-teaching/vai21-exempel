
var chartData = [ 80, 100, 120, 105, 75, 60, 100 ];

var height = 200;
var width = 300;
var barWidth = width/chartData.length;

var chart = d3.select('#chart')
    .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('background', 'LightSlateGray');

    
chart.selectAll('rect')
    .data(chartData).enter() // loopar igenom chartData
        .append('rect')
            .attr('x', function(d, i) {  // .attr('x', callback-funktion som retrurnerar vårt värde)
                return i * barWidth;
            }) 
            .attr('y', function(d) {
                return height-d;
            }) 
            .attr('height', function(d) {
                return d;
            })
            .attr('width', barWidth-5)
            .style('fill', 'OrangeRed');


    

    

    