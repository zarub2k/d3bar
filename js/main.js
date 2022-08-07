d3.select("h1").style("color", "black");

const svg = d3.select("#svg-container")
  .append("svg")
    .attr("viewBox", "0 0 600 700");
    // .style("border", "1px solid gray");

// svg.append("rect")
//   .attr("x", 10)
//   .attr("y", 10)
//   .attr("width", 300)
//   .attr("height", 25)
//   .attr("fill", "plum")

  const loadCsv = function() {
    d3.csv("../data/data.csv", d => {
      return {
        technology: d.technology,
        count: +d.count
      };
    }).then(data => {
      console.log(data.length)
      data.sort((a, b) => b.count - a.count)
      // console.log(data)
      // d3.max(data, d => console.log(d.count))
      // d3.min(data, d => console.log(d.count))
      // d3.extent(data, d => console.log(d.count))
      createVisualization(data)
    })
  }()

  const height = 15
  const createVisualization = (data) => {
    console.log("Enters createVisualization()")

    const xScale = d3.scaleLinear()
      .domain([0, 1078])
      .range([0, 450])

    const yScale = d3.scaleBand()
      .domain(data.map((d => d.technology)))
      .range([0, 700])
      .paddingInner(0.1)

    const bar = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.technology)})`);

    bar
      .append("rect")
      .attr("class", d => {
        return "bar"
      })
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("x", 100)
      .attr("y", 0)
      .attr("fill", "skyblue")

    bar
      .append("text")
        .text(d => d.technology)
        .attr("x", 96)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "11px")

    bar
      .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-family", "sans-serif")
        .style("font-size", "9px")

    svg
      .append("line")
        .attr("x1", 100)
        .attr("y1", 0)
        .attr("x2", 100)
        .attr("y2", 700)
        .attr("stroke", "black")

    // svg
    //   .selectAll("rect")
    //   .data(data)
    //   .join("rect")
    //     .attr("class", d => {
    //       // return `bar bar-${d.technology}`
    //       return "bar"
    //     })
    //     .attr("width", d => xScale(d.count))
    //     // .attr("height", height)
    //     .attr("height", yScale.bandwidth())
    //     .attr("x", 0)
    //     // .attr("y", (d, i) => (height + 5) * i)
    //     .attr("y", d => yScale(d.technology))
    //     .attr("fill", "skyblue")
  }