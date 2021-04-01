


var shape = d3.select('#shapes')
    .append('svg')
        .attr('height', 300)
        .attr('width', 300)
        .style('background', 'LightSlateGray');

    shape.append('rect')
        .attr('x', 30)
        .attr('y', 30) // Obs y-axeln börjar uppifrån
        .attr('height', 240)
        .attr('width', 240)
        .style('fill', 'SandyBrown');
    

    d3.select('#toggle-circle').on('click', function() {
        toggleCircle();
    });        

    function toggleCircle() {

    // D3: if (!shape.select('circle').node()) {
    // jQuery: if (!$('#shapes circle').length) {
        if (!document.getElementById('circle-1')) {

            shape.append('circle')
                .attr('id', 'circle-1')
                .attr('cx', 150)
                .attr('cy', 150)
                .attr('r', 90)
                .style('fill', 'orangered')
                .style('opacity', 0.5);

        } else {
            shape.selectAll('circle').remove();  
        }

        
    }

    shape.append("line")
      .attr("x1", 20)
      .attr("y1", 20)
      .attr("x2", 280)
      .attr("y2", 280)
      .attr("stroke", "silver")
      .style("stroke-width", 5)

    shape.append("polyline")
      .attr('points', '150,80 80,220 220,220 150,80')
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .style("fill", "PaleGreen")

      toggleCircle();


    
    

