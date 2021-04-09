
//var chartData = [ 1, 5, 80, 100, 120, 105, 75, 60, 100 ];
var chartData = [0,1,4,6,19,31,54,77,88,159,303,342,468,619,689,719,710,732,788,802,818,865,961,1041,1010,1002,978,1043,987,954,1015,946,946,932,1000,948,927,907,959,893,978,942,1014,1016,960,983,959,989,987,949,883,884,884,872,916,882,880,831,825,860,777,787,751,723,672,634,605,622,601,620,592,608,580,598,630,648,617,641,641,697,689,726,679,721,695,737,757,763,716,754,729,743,720,733,685,684,733,749,688,716,747,736,676,709,659,703,624,675,657,629,589,626,610,582,608,628,614,536,584,536,536,511,525,487,441,491,456,439,0];
var height = 300;
var width = 400;
var barWidth = width/chartData.length;
var barMargin = -1;

var chart = d3.select('#chart')
    .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('background', 'LightSlateGray');


var y = d3.scaleLinear()
    .domain([0, d3.max(chartData)])
    .range([0, height-10])
    
chart.selectAll('rect')
    .data(chartData).enter() // loopar igenom chartData
        .append('rect')
            .attr('x', function(d, i) {  // .attr('x', callback-funktion som retrurnerar vårt värde)
                return i * barWidth;
            }) 
            .attr('y', function(d) {
                return height-y(d);
            }) 
            .attr('height', function(d) {
                return y(d);
            })
            .attr('width', barWidth-barMargin)
            .on('mouseover', function(d) {
                console.log(d3.event); // Funkar inte i v6
                //console.log(event)
                d3.select(this)
                    .style('fill', 'rgba(255, 100, 0, 0.5)');
            })
            .on('mouseout', function() {
                d3.select(this)
                    .style('fill', 'OrangeRed')
            })
            .style('fill', 'OrangeRed');


    

    

    