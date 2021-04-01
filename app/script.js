d3.select('h2').text('Visualisering av information'); 

d3.select('body')    // Välj  elementet 'body'
    .append('div')   // Lägg till en div sist inom body
    .text('Hej')     // Sätt in en text i vår nya div
    .style('color', 'red') // ändra färg med style()
    .style('opacity', 0)   // Gör elementet osynligt
    .transition()          // Skapa en animation till nästa
    .duration(4000)        // Låt den ta 4 sek
    .style('opacity', 1)   // Elementet blir långsmt synligt
    

    
    