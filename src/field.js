//draw the field
function drawField(id) {
    //draw field            
    var field = d3.select(id)
        .attr("height", FIELD_LENGTH + MARGIN_TOP)
        .attr("width", FIELD_WIDTH)
        .style("background", FIELD_COLOR);
    //draw lines on the field
    drawFieldLines(id);
    //write team names at top of field
    // writeTeamNames(id);
    //draw clock
    // clock(id);
}

//draw all lines on field
function drawFieldLines(id) {
    var field = d3.select(id);
    //draw sidelines
    field.append("rect")
        .attr("class", "sidelines")
        .attr("height", FIELD_LENGTH - (2 * SIDELINE_MARGIN))
        .attr("width", FIELD_WIDTH - (2 * SIDELINE_MARGIN))
        .attr("x", SIDELINE_MARGIN)
        .attr("y", SIDELINE_MARGIN + MARGIN_TOP)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw line through midfield
    field.append("line")
        .attr("class", "center-line")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("x1", SIDELINE_MARGIN)
        .attr("y1", FIELD_LENGTH / 2)      
        .attr("x2", FIELD_WIDTH - SIDELINE_MARGIN)
        .attr("y2", FIELD_LENGTH / 2);
    //draw center circle
    field.append("circle")
        .attr("class", "center-circle")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", FIELD_WIDTH / 2)
        .attr("cy", FIELD_LENGTH / 2)
        .attr("r", 10 * SIZE_MULT);
    // //draw center dot
    field.append("circle")
        .attr("class", "center-dot")
        .style("fill", LINE_COLOR) 
        .attr("cx", FIELD_WIDTH / 2)
        .attr("cy", FIELD_LENGTH / 2)     
        .attr("r", .4 * SIZE_MULT);
    //draw top 18 yd box
    field.append("rect")
        .attr("class", "top-eighteen")
        .attr("height", 18 * SIZE_MULT)
        .attr("width", 44 * SIZE_MULT)
        .attr("x", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("y", SIDELINE_MARGIN)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw bottom 18 yd box
    field.append("rect")
        .attr("class", "bottom-eighteen")
        .attr("width", 44 * SIZE_MULT)
        .attr("height", 18 * SIZE_MULT)
        .attr("x", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("y", FIELD_LENGTH - SIDELINE_MARGIN - (18 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw top 6 yd box
    field.append("rect")
        .attr("class", "top-six")
        .attr("height", 6 * SIZE_MULT)
        .attr("width", 20 * SIZE_MULT)
        .attr("x", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("y", SIDELINE_MARGIN)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw bottom 6 yd box
    field.append("rect")
        .attr("class", "bottom-six")
        .attr("height", 6 * SIZE_MULT)
        .attr("width", 20 * SIZE_MULT)
        .attr("x", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("y", FIELD_LENGTH - SIDELINE_MARGIN - (6 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw top PK spot
    field.append("circle")
        .attr("class", "top-pk")
        .style("fill", LINE_COLOR) 
        .attr("cx", FIELD_WIDTH / 2)
        .attr("cy", SIDELINE_MARGIN + (12 * SIZE_MULT))      
        .attr("r", .4 * SIZE_MULT);
    //draw bottom PK spot
    field.append("circle")
        .attr("class", "bottom-pk")
        .style("fill", LINE_COLOR) 
        .attr("cx", FIELD_WIDTH / 2)
        .attr("cy", FIELD_LENGTH - SIDELINE_MARGIN - (12 * SIZE_MULT))  
        .attr("r", .4 * SIZE_MULT);   
    
    //draw top D
    var topd = d3.arc()
        .innerRadius(SIZE_MULT*10)
        .outerRadius((SIZE_MULT*10)+2)
        .startAngle(135*(Math.PI/180))
        .endAngle(225*(Math.PI/180));
    field.append("path")
        .attr("class", "top-d")
        .style("fill", LINE_COLOR)
        .attr("d", topd)
        .attr("transform", "translate(" + (FIELD_WIDTH/2) + ", " + (SIDELINE_MARGIN+(18 * SIZE_MULT)-(SIZE_MULT*10-20)) + ")");
    //draw bottom D
    var bottomd = d3.arc()
        .innerRadius(SIZE_MULT*10)
        .outerRadius((SIZE_MULT*10)+2)
        .startAngle(45*(Math.PI/180))
        .endAngle(-45*(Math.PI/180));
    field.append("path")
        .attr("class", "bottom-d")
        .style("fill", LINE_COLOR)
        .attr("d", bottomd)
        .attr("transform", "translate(" + (FIELD_WIDTH/2) + ", " + (FIELD_LENGTH-SIDELINE_MARGIN-(18 * SIZE_MULT)+50) + ")");   
}

function writeTeamNames(id) {
    var field = d3.select(id);
    var teams = field.append("g")
        .attr("transform", "translate(10,25)");
    field.select("#home-text").remove();
    field.select("#away-text").remove();
    HOME.name = document.getElementById("home-team-name").value;
    AWAY.name = document.getElementById("away-team-name").value;
    d3.select("#hf-name").text(HOME.name);
    d3.select("#af-name").text(AWAY.name);
    field.append("text")
        .attr("id", "home-text")
        .attr("x", FIELD_LENGTH/4)
        .attr("y", MARGIN_TOP/2)     
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", HOME.color)
        .style("font", "1.75em sans-serif")
        .text(HOME.name);
    field.append("text")   
        .attr("id", "away-text")       
        .attr("x", (FIELD_LENGTH/4)*3)
        .attr("y", MARGIN_TOP/2)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", AWAY.color)
        .style("font", "1.75em sans-serif")
        .text(AWAY.name);
}