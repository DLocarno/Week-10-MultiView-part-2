function scatter_plot(
  X,
  Y,
  ColorData,
  axis_key,
  title = "",
  xLabel = "",
  yLabel = "",
  margin = 100
) {
  function data_axis_pad(data, pad = 0.05) {
    return [data[0] - pad * data[0], data[1] + pad * data[1]];
  }

  let xScale = d3
    .scaleLinear()
    .domain(data_axis_pad(d3.extent(X)))
    .range([0 + margin, 1000 - margin]);
  let yScale = d3
    .scaleLinear()
    .domain(data_axis_pad(d3.extent(Y)))
    .range([1000 - margin, 0 + margin]);
  let colorScale = d3
    .scaleLinear()
    .domain(d3.extent(ColorData))
    .range(["steelblue", "brown"]);
  let axis = d3.select(`#${axis_key}`);

  axis
    .selectAll(".markers")
    .data(X)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      //Remove undefined values
      if (X[i] != undefined && Y[i] != undefined) {
        return `translate(${xScale(X[i])}, ${yScale(Y[i])})`;
      }
    })
    .append("circle")
    .attr("r", function (d, i) {
      //Add flipper length
      return d;
    })
    .style("fill", function (d, i) {
      console.log(colorScale(ColorData[i]));
      return colorScale(ColorData[i]);
    });
  // x and y Axis function
  let x_axis = d3.axisBottom(xScale).ticks(4);
  let y_axis = d3.axisLeft(yScale).ticks(4);
  //X Axis
  axis
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${0},${1000 - margin})`)
    .call(x_axis);
  // Y Axis
  axis
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin},${0})`)
    .call(y_axis);
  // Labels
  axis
    .append("g")
    .attr("class", "label")
    .attr("transform", `translate(${500},${1000 - 10})`)
    .append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(xLabel);

  axis
    .append("g")
    .attr("transform", `translate(${35},${500}) rotate(270)`)
    .append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(yLabel);

  // Title
  axis
    .append("text")
    .attr("x", 500)
    .attr("y", 80)
    .attr("text-anchor", "middle")
    .text(title)
    .attr("class", "plotTitle");
}
