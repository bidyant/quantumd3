// Set up the SVG container
const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    midpointY = height / 2; // Calculate midpoint for y-axis

function plotWave(n) {
    // Define the data for the sine wave
    const waveWidth = 2 * Math.PI; // Width of the wave
    n=n/6;
    const data = d3.range(0, waveWidth, 0.01).map((t) => ({
        x: t,
        y: Math.sqrt(2 / width)*10*Math.sin(n * Math.PI * t) // Adjust the wave function here
    }));

    // Define the scales for mapping data to the SVG coordinates
    const xScale = d3.scaleLinear().domain([0, waveWidth]).range([100, width-100]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([midpointY, 0]);

    // Define X and Y axes
    const xAxis = d3.axisBottom(xScale).ticks(5);

    // Remove existing elements before plotting
    svg.selectAll("*").remove();

    // Append X and Y axes to the SVG
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (midpointY+10) + ")") // Translate x-axis to the midpoint
        .call(xAxis);

    // Define the line function
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    // Append a path element to the SVG to plot the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("d", line);
}


function updateWave() {
    const n = +document.getElementById("n_val").value;
    if(n==0||n>100){
        n=1;
    }
    plotWave(n);
}


// Initial plot with n = 2
plotWave(1);


// Example: Change the wave by modifying n
// plotWave(3); // Uncomment and use other values of n as needed
