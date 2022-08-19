const loadData = function() {
  console.log("Enters loadData()")
  d3.csv("temp.csv", d3.autoType)
  .then(d => drawLineChart(d))
}();

const drawLineChart = (data) => {
  console.log("Enters drawLineChart()")

  const margin = {
    top: 40,
    right: 170,
    bottom: 25,
    left: 40
  }

  const width = 1000
  const height = 500

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // drawXAxis(innerChart, data, innerHeight)
    // drawYAxis(innerChart, data, innerHeight)
    drawChart(innerChart, data, innerWidth, innerHeight)
    svg
    .append("text")
    .text("Temperature (F)")
      .attr("y", 20)
}

const drawChart = (chart, data, innerWidth, innerHeight) => {
  const minDate = new Date(2021, 00, 01, 0, 0, 0)
  const maxDate = d3.max(data, d => d.date)
  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, innerWidth])

  const maxTemp = d3.max(data, d => d.max_temp_F)
  const yScale = d3.scaleLinear()
    .domain([0, maxTemp])
    .range([innerHeight, 0])

  drawXAxis(chart, data, xScale, innerHeight)
  drawYAxis(chart, data, yScale, innerHeight)
  plotCircle(chart, data, xScale, yScale)
  joinCircle(chart, data, xScale, yScale)
}

const joinCircle = (chart, data, xScale, yScale) => {
  const aubergine = "#75485E"
  const lineGenerator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.avg_temp_F))

  chart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", aubergine)
}

const plotCircle = (chart, data, xScale, yScale) => {
  const aubergine = "#75485E"
  chart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", 4)
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.max_temp_F))
      .attr("fill", aubergine)
}

const drawXAxis = (chart, data, xScale, innerHeight) => {
  // const minDate = d3.min(data, d => d.date)
  // const minDate = new Date(2021, 00, 01, 0, 0, 0)
  // const maxDate = d3.max(data, d => d.date)
  // const xScale = d3.scaleTime()
  //   .domain([minDate, maxDate])
  //   .range([0, innerWidth])
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b"))
  chart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
}

const drawYAxis = (chart, data, yScale, innerHeight) => {
  // const maxTemp = d3.max(data, d => d.max_temp_F)
  // const yScale = d3.scaleLinear()
  //   .domain([0, maxTemp])
  //   .range([innerHeight, 0])
    const yAxis = d3.axisLeft(yScale)
  chart
    .append("g")
      .attr("class", "axis-y")
      .call(yAxis)
}