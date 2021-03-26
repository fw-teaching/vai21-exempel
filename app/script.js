d3.select('h2').text('Visualisering av information'); 

d3.select('body')
    .append('div')
    .text('Hej')
    .style('color', 'red')
    .style('opacity', 0)
    .transition()
    .duration(4000)
    .style('opacity', 1)
    

    
    