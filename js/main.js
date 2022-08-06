d3.select("h1").style("color", "black");

const svg = d3.select("#svg-container")
  .append("svg")
    .attr("viewBox", "0 0 600 300");
    // .style("border", "1px solid gray");

svg.append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 300)
  .attr("height", 25)
  .attr("fill", "plum")