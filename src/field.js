//draw the field
function drawField(id) {
    //draw field            
    var field = d3.select(id)
        .attr("width", FIELD_LENGTH + MARGIN_TOP)
        .attr("height", FIELD_WIDTH)
        .style("background", FIELD_COLOR);
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
            .attr("class", "alt-field-color-" + i)
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
        .attr("class", "sidelines")
        .attr("width", FIELD_LENGTH - (2 * SIDELINE_MARGIN.side))
        .attr("height", FIELD_WIDTH - (2 * SIDELINE_MARGIN.top))
        .attr("x", SIDELINE_MARGIN.side)
        .attr("y", SIDELINE_MARGIN.top + MARGIN_TOP)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw line through midfield
    field.append("line")
        .attr("class", "center-line")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("y1", SIDELINE_MARGIN.top)
        .attr("x1", FIELD_LENGTH / 2)      
        .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
        .attr("x2", FIELD_LENGTH / 2);
    //draw center circle
    field.append("circle")
        .attr("class", "center-circle")
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2)  
        .attr("cx", FIELD_LENGTH / 2)
        .attr("cy", FIELD_WIDTH / 2)
        .attr("r", 10 * SIZE_MULT);
    // //draw center dot
    field.append("circle")
        .attr("class", "center-dot")
        .style("fill", LINE_COLOR) 
        .attr("cx", FIELD_LENGTH / 2)
        .attr("cy", FIELD_WIDTH / 2)     
        .attr("r", .4 * SIZE_MULT);
    //draw left 18 yd box
    field.append("rect")
        .attr("class", "left-eighteen")
        .attr("width", 18 * SIZE_MULT)
        .attr("height", 44 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("x", SIDELINE_MARGIN.side)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw right 18 yd box
    field.append("rect")
        .attr("class", "right-eighteen")
        .attr("height", 44 * SIZE_MULT)
        .attr("width", 18 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
        .attr("x", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw left 6 yd box
    field.append("rect")
        .attr("class", "left-six")
        .attr("width", 6 * SIZE_MULT)
        .attr("height", 20 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("x", SIDELINE_MARGIN.side)
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);
    //draw right 6 yd box
    field.append("rect")
        .attr("class", "right-six")
        .attr("width", 6 * SIZE_MULT)
        .attr("height", 20 * SIZE_MULT)
        .attr("y", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
        .attr("x", FIELD_LENGTH - SIDELINE_MARGIN.side - (6 * SIZE_MULT))
        .style("fill", "none")
        .style("stroke", LINE_COLOR)
        .style("stroke-width", 2);

    //draw left PK spot
    field.append("circle")
        .attr("class", "left-pk")
        .style("fill", LINE_COLOR) 
        .attr("cy", FIELD_WIDTH / 2)
        .attr("cx", SIDELINE_MARGIN.side + (12 * SIZE_MULT))      
        .attr("r", .4 * SIZE_MULT);
    //draw right PK spot
    field.append("circle")
        .attr("class", "right-pk")
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
        .attr("class", "left-d")
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
        .attr("class", "right-d")
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

function drawVerticalZones(id) {
    if (!VERTICAL_ZONES) {
        var field = d3.select(id);
        //draw line between left wing and left hs
        field.append("line")
            .attr("class", "vert-zone-line")
            .attr("id", "left-wing-left-hs-line")
            .style("stroke", LINE_COLOR)
            .style("stroke-width", 2)
            .attr("y1", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
            .attr("x1", SIDELINE_MARGIN.side)
            .attr("y2", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
            .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side);
        //draw line between left hs and center
        field.append("line")
            .attr("class", "vert-zone-line")
            .attr("id", "left-hs-center-line")
            .style("stroke", LINE_COLOR)
            .style("stroke-width", 2)
            .attr("y1", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
            .attr("x1", SIDELINE_MARGIN.side + (18 * SIZE_MULT))
            .attr("y2", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
            .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT));
        //draw line between right hs and center
        field.append("line")
            .attr("class", "vert-zone-line")
            .attr("id", "right-hs-center-line")
            .style("stroke", LINE_COLOR)
            .style("stroke-width", 2)
            .attr("y1", (FIELD_WIDTH / 2) + (10 * SIZE_MULT))
            .attr("x1", SIDELINE_MARGIN.side + (18 * SIZE_MULT))
            .attr("y2", (FIELD_WIDTH / 2) + (10 * SIZE_MULT))
            .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT));
        //draw line between right wing and right hs
        field.append("line")
            .attr("class", "vert-zone-line")
            .attr("id", "right-wing-right-hs-line")
            .style("stroke", LINE_COLOR)
            .style("stroke-width", 2)
            .attr("y1", (FIELD_WIDTH / 2) + (22 * SIZE_MULT))
            .attr("x1", SIDELINE_MARGIN.side)
            .attr("y2", (FIELD_WIDTH / 2) + (22 * SIZE_MULT))
            .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side);  
    } else {
        d3.select(id).selectAll(".vert-zone-line").remove();
    }
    VERTICAL_ZONES = !VERTICAL_ZONES;
}

function drawAttackingZones(id) {
    if (!ATTACKING_ZONES) {
        var field = d3.select(id);
        //draw libero area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "libero-zone")
            .attr("width", attackingZones.libero.width)
            .attr("height", attackingZones.libero.height)
            .attr("y", attackingZones.libero.y)
            .attr("x", attackingZones.libero.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw left defender area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "left-def-zone")
            .attr("width", attackingZones.defender.left.width)
            .attr("height", attackingZones.defender.left.height)
            .attr("y", attackingZones.defender.left.y)
            .attr("x", attackingZones.defender.left.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw right defender area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "right-def-zone")
            .attr("width", attackingZones.defender.right.width)
            .attr("height", attackingZones.defender.right.height)
            .attr("y", attackingZones.defender.right.y)
            .attr("x", attackingZones.defender.right.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw holding mid area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "hold-mid-zone")
            .attr("width", attackingZones.holdingMid.width)
            .attr("height", attackingZones.holdingMid.height)
            .attr("y", attackingZones.holdingMid.y)
            .attr("x", attackingZones.holdingMid.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw left attacking mid area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "left-am-zone")
            .attr("width", attackingZones.attackingMid.left.width)
            .attr("height", attackingZones.attackingMid.left.height)
            .attr("y", attackingZones.attackingMid.left.y)
            .attr("x", attackingZones.attackingMid.left.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw right attacking mid area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "right-am-zone")
            .attr("width", attackingZones.attackingMid.right.width)
            .attr("height", attackingZones.attackingMid.right.height)
            .attr("y", attackingZones.attackingMid.right.y)
            .attr("x", attackingZones.attackingMid.right.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw playmaker area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "playmaker-zone")
            .attr("width", attackingZones.playmaker.width)
            .attr("height", attackingZones.playmaker.height)
            .attr("y", attackingZones.playmaker.y)
            .attr("x", attackingZones.playmaker.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw left fwd area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "left-fwd-zone")
            .attr("width", attackingZones.wideFwd.left.width)
            .attr("height", attackingZones.wideFwd.left.height)
            .attr("y", attackingZones.wideFwd.left.y)
            .attr("x", attackingZones.wideFwd.left.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw right fwd area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "right-fwd-zone")
            .attr("width", attackingZones.wideFwd.right.width)
            .attr("height", attackingZones.wideFwd.right.height)
            .attr("y", attackingZones.wideFwd.right.y)
            .attr("x", attackingZones.wideFwd.right.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
        //draw center fwd area
        field.append("rect")
            .attr("class", "attack-zone")
            .attr("id", "center-fwd-zone")
            .attr("width", attackingZones.centerFwd.width)
            .attr("height", attackingZones.centerFwd.height)
            .attr("y", attackingZones.centerFwd.y)
            .attr("x", attackingZones.centerFwd.x)
            .style("fill", "none")
            .style("stroke", ATTACKING_ZONES_COLOR)
            .style("stroke-width", 2);
    } else {
        d3.select(id).selectAll(".attack-zone").remove();
    }
    ATTACKING_ZONES = !ATTACKING_ZONES;
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