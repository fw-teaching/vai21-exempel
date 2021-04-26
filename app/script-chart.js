
var data = [
    { label: "Windows", share: 76 },
    { label: "OSX", share: 16 },
    { label: "Linux", share: 2 },
    { label: "Other", share: 8 }
];

var height = 500, width = 500, margin = 100;
var radius = Math.min(height, width)/2 - margin;

var link = '<href="">';

var svg = d3.select('#chart')
    .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#efe')
    .append('g') // Skapa en grupp så att allt innehåll kan flyttas med translate
        // Cirkelns mittpunkt ska i det här fallet vara samma som svg:ns mittpunkt translate(225,222)
        .attr('transform', "translate("+width/2+","+height/2+")");

// scaleOrdinal använder vi när vi vill ha en skala som själv är en array med element som motsvarar våra dataelement (t.ex. färger)
var color = d3.scaleOrdinal()
    .domain(data)
    .range(["red", "blue", "lime", "orange", "cyan"]);

// d3.pie() räknar ut positionen för varje datapunkt och genererar
// nya värden som innehåller det som behövs för att rita diagrammet (t.ex. vinklarna för tårtbitarna)
var generateSlices = d3.pie()
    .value(function(d) {
        return d.value.share;
    }); 
// Vi skickar in våra ursprungliga data till pie-generatorn
var pieData = generateSlices(d3.entries(data));

svg.selectAll('slices')
    .data(pieData)
    .enter().append('path') // svg-path används för att rita t.ex böjda konturer
        .attr('d', d3.arc() // Skapa "båge", alltså sektorn för kakbiten. startAngle och endAngle kommer från pieData
            .innerRadius(radius/2)
            .outerRadius(radius)
        )
        .attr('fill', function(d) {
            console.log(d);
            return color(d.data.key)
        })
        .attr('stroke', 'black')
        .style('stroke-width', "2px");

/** Text-labels: 
 * 
*/
// Vi behöver en skild arc-generator för att placera ut texterna på rätt ställen
var textArcGenerator = d3.arc()
        .innerRadius(radius+30) // Vi använder diagrammets yttre radie (plus lite till) som innerRadius för att få texterna utanför cirkeldiagrammet
        .outerRadius(radius+60);

svg.selectAll('slices')
        .data(pieData) // Samma data så får vi lika stora kakbitar
        .enter().append('text') // svg-text-element
            .text(function(d) {
                // Själva texten
                return d.data.value.label + " " + d.data.value.share + "%";
            })
            .attr('transform', function(d) {
                // Vi använder arc-generatorn för att placera varje text rätt
                return "translate(" + textArcGenerator.centroid(d) + ")"; 
            })
            .style("text-anchor", "middle")
            .style("font-size", "13px");

