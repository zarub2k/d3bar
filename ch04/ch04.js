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

  const minDate = d3.min(data, d => d.date)
  const maxDate = d3.max(data, d => d.date)
  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, innerWidth])

  const maxTemp = d3.max(data, d => d.max_temp_F)
  const yScale = d3.scaleLinear()
    .domain([0, maxTemp])
    .range([innerHeight, 0])

    drawXAxis(innerChart, xScale, innerHeight)
}

const drawXAxis = (chart, xScale, innerHeight) => {
  const xAxis = d3.axisBottom(xScale)
  chart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
}

const drawYAxis = (chart, yScale) => {
  // const yAxis = d3.
}