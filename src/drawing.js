var start = {},
    end = {};

function drawingStarted() {
  //only draw something if drawing is enabled
  if (!DRAWING.enabled) return;

  var coord = d3.mouse(this);
  start = {x: coord[0], y: coord[1]};
}

function recordDrawing() {
  //only record something if drawing is enabled
  if (!DRAWING.enabled) return;

  var coord = d3.mouse(this);
  end = {x: coord[0], y: coord[1]};

  draw(start, end);
}

function draw(s, e) {
  var field = d3.select(FIELD_ID);

  if (DRAWING.line) {
    var line = field.append("line")
      .attr("class", "drawn line")
      .attr("id", "drawing-" + DRAWING.numberDrawings)
      .attr("x1", s.x)
      .attr("y1", s.y)
      .attr("x2", e.x)
      .attr("y2", e.y)
      .style("stroke", DRAWING.lineColor)
      .style("stroke-width", 2);
    if (DRAWING.dash) {
      line.style("stroke-dasharray", ("4, 5"));
    }
    if (DRAWING.arrow) {
      field.append("svg:defs").append("marker")
        .attr("class", "drawn")
        .attr("id", "triangle-" + DRAWING.numberDrawings)
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 2 10 6 0 10 3 6")
        .style("fill", DRAWING.lineColor);
      line.attr("marker-end","url(#triangle-" + DRAWING.numberDrawings + ")");
    }
  } else if (DRAWING.circle || DRAWING.square) {
    if (DRAWING.circle) { //circle
      var centerX = (s.x + e.x) / 2,
          centerY = (s.y + e.y) / 2;
      var circle = field.append("circle")
        .attr("class", "drawn circle")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? 2 : 0)  
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", s.x > e.x ? (s.x - e.x) / 2 : (e.x - s.x) / 2);
      if (DRAWING.shapeDash) {
        circle.style("stroke-dasharray", ("4, 5"));
      }
    } else { //square
      var square = field.append("rect")
        .attr("class", "drawn square")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .attr("width", s.x > e.x ? s.x - e.x : e.x - s.x)
        .attr("height", s.y > e.y ? s.y - e.y : e.y - s.y)
        .attr("x", s.x)
        .attr("y", s.y)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? 2 : 0);
        if (DRAWING.shapeDash) {
          square.style("stroke-dasharray", ("4, 5"));
        }
    }
  }
  DRAWING.numberDrawings++;
}

function drawVerticalZones(id) {
  if (!VERTICAL_ZONES) {
      var field = d3.select(id);
      //draw line between left wing and left hs
      field.append("line")
          .attr("class", "drawn vert-zone-line")
          .attr("id", "left-wing-left-hs-line")
          .style("stroke", LINE_COLOR)
          .style("stroke-width", 2)
          .attr("y1", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)
          .attr("y2", (FIELD_WIDTH / 2) - (22 * SIZE_MULT))
          .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side);
      //draw line between left hs and center
      field.append("line")
          .attr("class", "drawn vert-zone-line")
          .attr("id", "left-hs-center-line")
          .style("stroke", LINE_COLOR)
          .style("stroke-width", 2)
          .attr("y1", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side + (18 * SIZE_MULT))
          .attr("y2", (FIELD_WIDTH / 2) - (10 * SIZE_MULT))
          .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT));
      //draw line between right hs and center
      field.append("line")
          .attr("class", "drawn vert-zone-line")
          .attr("id", "right-hs-center-line")
          .style("stroke", LINE_COLOR)
          .style("stroke-width", 2)
          .attr("y1", (FIELD_WIDTH / 2) + (10 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side + (18 * SIZE_MULT))
          .attr("y2", (FIELD_WIDTH / 2) + (10 * SIZE_MULT))
          .attr("x2", FIELD_LENGTH - SIDELINE_MARGIN.side - (18 * SIZE_MULT));
      //draw line between right wing and right hs
      field.append("line")
          .attr("class", "drawn vert-zone-line")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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
          .attr("class", "drawn attack-zone")
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

function removeDrawings(field) {
  d3.select(field).selectAll(".drawn").remove();
  VERTICAL_ZONES = false;
  ATTACKING_ZONES = false;
  DRAWING.numberDrawings = 0;
}