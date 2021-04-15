

// https://people.arcada.fi/~welandfr/demo/vai/eth-avg.json

d3.json('data/eth-avg.json')
    .then(function(d) {

    createChart(d);
});

function createChart(rawData) {

    var chartData = [];
    var dates = [];
    for (let i = 0; i < rawData.length; i++) {
        chartData.push(rawData[i].avg);
        dates.push(new Date(rawData[i].date));
    }

    console.log(dates);

    var leftMargin = 40;
    var bottomMargin = 20;
    var height = 300;
    var width = 500;

    var chart = d3.select('#chart')
        .append('svg')
            .attr('height', height)
            .attr('width', width)
            .style('background', '#ddeeff')
            .append('g')
                .attr('transform', 'translate('+leftMargin+',0)')

    /** Y-axeln */
    var y = d3.scaleLinear()
        .domain([d3.min(chartData)*0.95, d3.max(chartData)*1.05]) // Variationen inom vår datamängd
        .range([0, height]);  // "Utrymmet", var domain 0 och max ska vara

    var yGuideScale = d3.scaleLinear()
        .domain([d3.min(chartData)*0.95, d3.max(chartData)*1.05]) 
        .range([height, 0]); 

    var yTicks = d3.axisLeft(yGuideScale)
        .ticks(10);

    /** X-axeln */ 
    var x = d3.scaleBand()
        .domain(chartData)
        .range([0, width-leftMargin]);

    var xGuideScale = d3.scaleTime()
        .domain([dates[0], dates[dates.length-1]])
        .range([0, width-leftMargin]);

    var xTicks = d3.axisBottom(xGuideScale)
        .ticks(d3.timeWeek)
        //.ticks(d3.timeDay.every(3));
    
    chart.append("path")
        .datum(chartData)
            .attr('fill', 'none')
            .attr('stroke', 'OrangeRed')
            .attr('stroke-width', 3)
            .attr('d', d3.line()
                .x(function(d) {
                    return x(d);
                })
                .y(function(d) {
                    return height-y(d);
                })
            );
    
    d3.select('#chart svg').append('g')
            .attr('transform', 'translate('+leftMargin+',0)')
            .call(yTicks);
    
    d3.select('#chart svg').append('g')
            .attr('transform', 'translate('+leftMargin+','+(height-bottomMargin)+')')
            .call(xTicks);
}
    
