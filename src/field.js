//draw the field
function drawField(id) {
    //get values for drawing from dragging motion
    var drag = d3.drag()
        .on("start", drawingStarted)
        .on("end", recordDrawing);
    
    
    //draw field            
    var field = d3.select(id)
        .attr("width", FIELD_LENGTH + MARGIN_TOP)
        .attr("height", FIELD_WIDTH)
        .style("background", FIELD_COLOR);

    field.call(drag);


    if (FIELD_COLOR_ALT !== "none") {
        drawAlternatingField(id);
    }
    //draw lines on the field
    drawFieldLines(id);
}

function drawAlternatingField(id) {
    var field = d3.select(id);
    for (var i=0; i<FIELD_DIMENSIONS.length/6; i=i+2) {
        //draw alternating field colors
        field.append("rect")
            .attr("class", "field-marking")
            .attr("id", "alt-field-color-" + i)
            .attr("width", 6 * SIZE_MULT)
            .attr("height", FIELD_WIDTH - (2 * SIDELINE_MARGIN.top))
            .attr("x", SIDELINE_MARGIN.side + MARGIN_TOP + (i * 6 * SIZE_MULT))
            .attr("y", SIDELINE_MARGIN.top)
            .style("fill", FIELD_COLOR_ALT);
    }
}

//draw all lines on field
function drawFieldLines(id) {
    var field = d3.select(id);

    //draw sidelines
    field.append("rect")
        .attr("class", "field-marking")
        .attr("id", "sidelines")
        .attr("width", FIELD_LENGTH - (2 * SIDELINE_MARGIN.side))
        .attr("height", FIELD_WIDTH - (2 * SIDELINE_MARGIN.top))
        .attr("x", SIDELINE_MARGIN.side)
        .attr("y", SIDELINE_MARGIN.top + MARGIN_TOP)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw line through midfield
    field.append("line")
        .attr("class", "field-marking")
        .attr("id", "center-line")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("y1", SIDELINE_MARGIN.top)
        .attr("x1", FIELD_LENGTH / 2)      
        .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
        .attr("x2", FIELD_LENGTH / 2);
    //draw center circle
    field.append("circle")
        .attr("class", "field-marking")
        .attr("id", "center-circle")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", FIELD_LENGTH / 2)
        .attr("cy", FIELD_WIDTH / 2)
        .attr("r", 10 * SIZE_MULT);
    // //draw center dot
    field.append("circle")
        .attr("class", "field-marking")
        .attr("id", "center-dot")
        .style("fill", LINE_COLOR) 
        .attr("cx", FIELD_LENGTH / 2)
        .attr("cy", FIELD_WIDTH / 2)     
        .attr("r", .4 * SIZE_MULT);
    //draw left 18 yd box
    field.append("rect")
        .attr("class", "field-marking")
        .attr("id", "left-eighteen")
        .attr("width", 18 * SIZE_MULT)
        .attr("height", 44 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("x", SIDELINE_MARGIN.side)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw right 18 yd box
    field.append("rect")
        .attr("class", "field-marking").attr("class", "field-marking")
        .attr("id", "right-eighteen")
        .attr("height", 44 * SIZE_MULT)
        .attr("width", 18 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("x", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw left 6 yd box
    field.append("rect")
        .attr("class", "field-marking")
        .attr("id", "left-six")
        .attr("width", 6 * SIZE_MULT)
        .attr("height", 20 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("x", SIDELINE_MARGIN.side)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw right 6 yd box
    field.append("rect")
        .attr("class", "field-marking")
        .attr("id", "right-six")
        .attr("width", 6 * SIZE_MULT)
        .attr("height", 20 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("x", FIELD_LENGTH - SIDELINE_MARGIN.side - (6 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw left PK spot
    field.append("circle")
        .attr("class", "field-marking")
        .attr("id", "left-pk")
        .style("fill", LINE_COLOR) 
        .attr("cy", FIELD_WIDTH / 2)
        .attr("cx", SIDELINE_MARGIN.side + (12 * SIZE_MULT))      
        .attr("r", .4 * SIZE_MULT);
    //draw right PK spot
    field.append("circle")
        .attr("class", "field-marking")
        .attr("id", "right-pk")
        .style("fill", LINE_COLOR) 
        .attr("cy", FIELD_WIDTH / 2)
        .attr("cx", FIELD_LENGTH - SIDELINE_MARGIN.side - (12 * SIZE_MULT))  
        .attr("r", .4 * SIZE_MULT);

    //draw left D
    var leftd = d3.arc()
        .innerRadius(SIZE_MULT*10)
        .outerRadius(SIZE_MULT*10)
        .startAngle(37*(Math.PI/180))
        .endAngle(143*(Math.PI/180));
    field.append("path")
        .attr("class", "field-marking")
        .attr("id", "left-d")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2) 
        .attr("d", leftd)
        .attr("transform", "translate(" + (SIDELINE_MARGIN.side + (12 * SIZE_MULT)) + ", " + ((FIELD_WIDTH/2)+MARGIN_TOP) + ")");
    //draw right D
    var rightd = d3.arc()
        .innerRadius(SIZE_MULT*10)
        .outerRadius(SIZE_MULT*10)
        .startAngle(217*(Math.PI/180))
        .endAngle(323*(Math.PI/180));
    field.append("path")
        .attr("class", "field-marking")
        .attr("id", "right-d")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2) 
        .attr("d", rightd)
        .attr("transform", "translate(" + (FIELD_LENGTH-SIDELINE_MARGIN.side - (12 * SIZE_MULT)) + ", " + ((FIELD_WIDTH/2)+MARGIN_TOP) + ")");   
        
    //draw ball
    field.append("circle")
        .attr("id", "ball")
        .attr("filter", "url(#ball-filter)") 
        .attr("cx", BALL_POSITION.x)
        .attr("cy", BALL_POSITION.y)  
        .attr("r", SIZE_MULT)
        .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragball)
            .on("end", dragended));
}

function dragball(d) {
    var xNew = d3.event.x,
        yNew = d3.event.y;
    if (xNew > FIELD_LENGTH)  xNew = FIELD_LENGTH - SIZE_MULT;
    if (xNew < 0)            xNew = 0 + SIZE_MULT;
    if (yNew > FIELD_WIDTH) yNew = FIELD_WIDTH - SIZE_MULT;
    if (yNew < 0)            yNew = 0 + SIZE_MULT;
    d3.select(this).attr("cx", xNew).attr("cy", yNew);
    BALL_POSITION = {
        x: xNew,
        y: yNew
    };
  }

