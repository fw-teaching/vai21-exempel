

d3.json('data/eth-avg.json')
    .then(function(d) {

    createChart(d);
});

function createChart(rawData) {

    var chartData = [];
    var dates = [];

    var chartDataCombo = [];
    for (let i = 0; i < rawData.length; i++) {
        chartData.push(rawData[i].avg);
        dates.push(new Date(rawData[i].date));

        chartDataCombo.push({
            date: new Date(rawData[i].date).toISOString().substring(0, 10),
            value: rawData[i].avg
        });
    }

    //console.log(chartDataCombo);

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
        .ticks(d3.timeWeek);
        //.ticks(d3.timeDay.every(3));
    
    chart.append("path")
        .datum(chartData)
            .attr('fill', 'none')
            .attr('stroke', 'crimson')
            .attr('stroke-width', 3)
            .attr('d', d3.line()
                .x(function(d) {
                    return x(d);
                })
                .y(function(d) {
                    return height-y(d);
                })
            );

    var tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    chart.selectAll("dot")
        // .data(chartData) // <-- v5
        .data(chartDataCombo)
        .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) {
                return x(d.value);
            })
            .attr("cy", function(d) {
                return height-y(d.value);
            })
            .attr("fill", "white")
            .attr("stroke", "orangered")
            //v5:
            /* .on("mouseover", function(d, i) {
                console.log(d3.event);
                tooltip.html(dates[i].toISOString().substring(0, 10) + "<br>" + d)
                    .style("opacity", 0.8)
                    .style("left", (d3.event.pageX)+10 + "px")
                    .style("top", (d3.event.pageY)+5 + "px");
                
            }) */
            //v6
            .on("mouseover", function(event, d) {
                tooltip.html(d.date + "<br>" + d.value + " €")
                    .style("opacity", 0.8)
                    .style("left", (event.pageX)+10 + "px")
                    .style("top", (event.pageY)+5 + "px");

                    d3.select(this).attr("r", 7);
                
            })
            .on("mouseout", function(d) {
                tooltip.style("opacity", 0);

                d3.select(this).attr("r", 5);
            });


    d3.select('#chart svg').append('g')
            .attr('transform', 'translate('+(leftMargin)+',0)')
            .call(yTicks);
    
    d3.select('#chart svg').append('g')
            .attr('transform', 'translate('+leftMargin+','+(height-bottomMargin)+')')
            .call(xTicks);
}
    
