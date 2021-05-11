

d3.json('data/graph2.json')
    .then(function (nodes) {

        const links = [];

        // Loopa alla noder och deras linkar för att bygga upp en skild array för linkarna
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].links.length; j++) {
                links.push({
                    source: nodes[i].id, 
                    target: nodes[i].links[j]
                })
            }
        }

        const d = {nodes: nodes, links: links};

        console.log(d);

        createChart(d);
    });

function createChart(data) {

    //console.log(data);

    const simulation = d3.forceSimulation(data.nodes)
        // "laddning" som (om negativ) skjuter noderna från varandra
        .force('charge', d3.forceManyBody().strength(-100))

        .force('link', d3.forceLink(data.links)
            .id(d => d.id) // Video om arrow functions: https://youtu.be/h33Srr5J9nY
            //.id(function(d) { return d.id; })  // samma sak på gammalt sätt
            .distance(50))
        
        // Placering av mittpunkten
        .force('center', d3.forceCenter(200, 200))

    const svg = d3.select("body").append("svg")
        .style('background', '#ddeeff')
        // min-x, min-y, width, height.
        .attr("viewBox", [0, 0, 600, 600]);

    const link = svg
        .selectAll('path.link')
        .data(data.links)
        .enter()
        .append('path')
            .attr('stroke', 'teal')
            .attr('stroke-width', d => {
                //console.log(d.source.volume);
                return (d.source.volume+d.target.volume)*0.05;
            })
            .attr('fill', 'none');

    const node = svg.selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
            .attr('r', d => {
                return d.volume/10+5;
            }) 
            .attr('fill', 'blue')
            .attr("fill", "white")
            .attr("stroke", "orangered")
        .on('click', (event, d) => console.log(d.name))
        .on('mouseover', tooltipOpen)
        .on('mouseout', tooltipClose)
        .call(d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                d.fx = null;
                d.fy = null;
                if (!event.active) simulation.alphaTarget(0);
            })
        )



    const lineGenerator = d3.line();

    simulation.on('tick', () => {
        node.attr('cx', d => d.x);
        node.attr('cy', d => d.y);
        link.attr('d', d => lineGenerator([
            [d.source.x, d.source.y],
            [d.target.x, d.target.y]])
        )
    });

    const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    function tooltipOpen(event, d) {
        tooltip.style("opacity", 0.9);
        tooltip.html(d.name)
            .style("left", (event.pageX -20)+ "px")
            .style("top", (event.pageY -30) + "px");
    }
    function tooltipClose(event, d) {
        console.log("tooltipClose")
    }

    
}

