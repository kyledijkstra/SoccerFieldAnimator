var start = {},
    end = {};

var playerLine = {from:{}, to:{}};

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
  if (Math.abs(s.x - e.x) <= 8 && Math.abs(s.y - e.y) <= 8) return; //don't draw tiny lines or shapes
  var field = d3.select(FIELD_ID);

  if (DRAWING.line) {
    var newId = "drawing-" + DRAWING.numberDrawings;
    var line = field.append("line")
      .attr("class", "drawn line")
      .attr("id", newId)
      .attr("x1", s.x)
      .attr("y1", s.y)
      .attr("x2", e.x)
      .attr("y2", e.y)
      .style("stroke", DRAWING.lineColor)
      .style("stroke-width", DRAWING.lineWidth)
      .on("dblclick", function(d) {
        field.selectAll("#" + newId).remove();
      });
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
  } else if (DRAWING.circle) {
    if (e) { //Drawing coords (start and end)
      var centerX = (s.x + e.x) / 2,
          centerY = (s.y + e.y) / 2;
      var circle = field.append("circle")
        .attr("class", "drawn circle")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? DRAWING.lineWidth : 0)  
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", s.x > e.x ? (s.x - e.x) / 2 : (e.x - s.x) / 2);
      if (DRAWING.shapeDash) {
        circle.style("stroke-dasharray", ("4, 5"));
      }
    } else { //Object coords (only start = dimensions)
      var circle = field.append("circle")
        .attr("class", "drawn circle")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? DRAWING.lineWidth : 0)  
        .attr("cx", parseInt(s.x))
        .attr("cy", parseInt(s.y))
        .attr("r", parseInt(s.r));
      if (DRAWING.shapeDash) {
        circle.style("stroke-dasharray", ("4, 5"));
      }
    }
  } else if (DRAWING.square) { //square
    if (e) { //Drawing coords (start and end)
      var square = field.append("rect")
        .attr("class", "drawn square")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .attr("width", s.x > e.x ? s.x - e.x : e.x - s.x)
        .attr("height", s.y > e.y ? s.y - e.y : e.y - s.y)
        .attr("x", s.x < e.x ? s.x : e.x)
        .attr("y", s.y < e.y ? s.y : e.y)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? DRAWING.lineWidth : 0);
      if (DRAWING.shapeDash) {
        square.style("stroke-dasharray", ("4, 5"));
      }
    } else { //Object coords (only start = dimensions)
      var square = field.append("rect")
        .attr("class", "drawn square")
        .attr("id", "drawing-" + DRAWING.numberDrawings)
        .attr("width", s.width)
        .attr("height", s.height)
        .attr("x", s.x )
        .attr("y", s.y)
        .style("fill", DRAWING.shapeFill ? DRAWING.shapeColor : "none")
        .style("stroke", DRAWING.shapeBorder ? DRAWING.shapeColor : "none")
        .style("stroke-width", DRAWING.shapeBorder ? DRAWING.lineWidth : 0);
      if (DRAWING.shapeDash) {
        square.style("stroke-dasharray", ("4, 5"));
      }
    }
  }
  var field = d3.select(FIELD_ID);
  field.selectAll("#ball").moveToFront();
  field.selectAll(".home-player").moveToFront();
  field.selectAll(".away-player").moveToFront();
  DRAWING.numberDrawings++;
}

function drawFromObject(drawing) {
  var tmpGlobalDrawing = DRAWING;
  DRAWING = {
    enabled: false,
    line: false,
    dash: false,
    arrow: false,
    numberDrawings: 0,
    lineWidth: 2,
    lineColor: "black",
    shapeColor: "black",
    shapeFill: false,
    shapeBorder: false,
    shapeDash: false,
    circle: false,
    square: false,
    playerLine: false
  };
  if (drawing.type === "line") {
    DRAWING.line = true;
    DRAWING.lineColor = drawing.stroke;
    DRAWING.lineWidth = drawing.strokeWidth;
    DRAWING.dash = drawing.dash !== "none";
    DRAWING.arrow = drawing.arrow !== null;
    draw(drawing.start, drawing.end);
  } else if (drawing.type === "circle") {
    DRAWING.circle = true;
    DRAWING.lineWidth = drawing.strokeWidth;
    DRAWING.shapeColor = drawing.stroke === "none" ? drawing.fill : drawing.stroke;
    DRAWING.shapeBorder = drawing.stroke !== "none";
    DRAWING.shapeDash = drawing.dash !== "none";
    DRAWING.shapeFill = drawing.fill !== "none";
    draw(drawing.dimensions, false);
  } else if (drawing.type === "square") {
    DRAWING.square = true;
    DRAWING.lineWidth = drawing.strokeWidth;
    DRAWING.shapeColor = drawing.stroke === "none" ? drawing.fill : drawing.stroke;
    DRAWING.shapeBorder = drawing.stroke !== "none";
    DRAWING.shapeDash = drawing.dash !== "none";
    DRAWING.shapeFill = drawing.fill !== "none";
    draw(drawing.dimensions, false);
  }
  DRAWING = tmpGlobalDrawing;
}

function drawPlayerLine(player) {
  if (DRAWING.playerLine) {
    playerLine.to = player;
    var origLineBool = DRAWING.line;
    DRAWING.line = true;
    var start = {
      x: playerLine.from.x,
      y: playerLine.from.y,
    }
    var end = {
      x: playerLine.to.x,
      y: playerLine.to.y,
    }
    draw(start, end);
    DRAWING.line = origLineBool;
    } else {
    playerLine.from = player;
  }
  DRAWING.playerLine = !DRAWING.playerLine;
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
var attackZoneFill = 0.33;
function drawAttackingZones(id, move) {
  var field = d3.select(id);
  if (move) {
    field.selectAll(".attack-zone").attr("transform","translate("+(30 * SIZE_MULT)+",0)");
  } else if (!ATTACKING_ZONES) {
      //draw libero area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "libero-zone")
          .attr("width", attackingZones.libero.width)
          .attr("height", attackingZones.libero.height)
          .attr("y", attackingZones.libero.y)
          .attr("x", attackingZones.libero.x)
          .style("fill", "purple")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw left defender area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "left-def-zone")
          .attr("width", attackingZones.defender.left.width)
          .attr("height", attackingZones.defender.left.height)
          .attr("y", attackingZones.defender.left.y)
          .attr("x", attackingZones.defender.left.x)
          .style("fill", "purple")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw right defender area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "right-def-zone")
          .attr("width", attackingZones.defender.right.width)
          .attr("height", attackingZones.defender.right.height)
          .attr("y", attackingZones.defender.right.y)
          .attr("x", attackingZones.defender.right.x)
          .style("fill", "purple")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw holding mid area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "hold-mid-zone")
          .attr("width", attackingZones.holdingMid.width)
          .attr("height", attackingZones.holdingMid.height)
          .attr("y", attackingZones.holdingMid.y)
          .attr("x", attackingZones.holdingMid.x)
          .style("fill", "red")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw left attacking mid area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "left-am-zone")
          .attr("width", attackingZones.attackingMid.left.width)
          .attr("height", attackingZones.attackingMid.left.height)
          .attr("y", attackingZones.attackingMid.left.y)
          .attr("x", attackingZones.attackingMid.left.x)
          .style("fill", "red")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw right attacking mid area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "right-am-zone")
          .attr("width", attackingZones.attackingMid.right.width)
          .attr("height", attackingZones.attackingMid.right.height)
          .attr("y", attackingZones.attackingMid.right.y)
          .attr("x", attackingZones.attackingMid.right.x)
          .style("fill", "red")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw playmaker area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "playmaker-zone")
          .attr("width", attackingZones.playmaker.width)
          .attr("height", attackingZones.playmaker.height)
          .attr("y", attackingZones.playmaker.y)
          .attr("x", attackingZones.playmaker.x)
          .style("fill", "red")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw left fwd area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "left-fwd-zone")
          .attr("width", attackingZones.wideFwd.left.width)
          .attr("height", attackingZones.wideFwd.left.height)
          .attr("y", attackingZones.wideFwd.left.y)
          .attr("x", attackingZones.wideFwd.left.x)
          .style("fill", "blue")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw right fwd area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "right-fwd-zone")
          .attr("width", attackingZones.wideFwd.right.width)
          .attr("height", attackingZones.wideFwd.right.height)
          .attr("y", attackingZones.wideFwd.right.y)
          .attr("x", attackingZones.wideFwd.right.x)
          .style("fill", "blue")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
      //draw center fwd area
      field.append("rect")
          .attr("class", "drawn attack-zone")
          .attr("id", "center-fwd-zone")
          .attr("width", attackingZones.centerFwd.width)
          .attr("height", attackingZones.centerFwd.height)
          .attr("y", attackingZones.centerFwd.y)
          .attr("x", attackingZones.centerFwd.x)
          .style("fill", "blue")
          .style("fill-opacity", attackZoneFill)
          .style("stroke", "gold")
          .style("stroke-width", 3);
  } else {
    field.selectAll(".attack-zone").remove();
  }
  ATTACKING_ZONES = !ATTACKING_ZONES;
  field.selectAll("#ball").moveToFront();
  field.selectAll(".home-player").moveToFront();
  field.selectAll(".away-player").moveToFront();
}

function removeDrawings(field) {
  d3.select(field).selectAll(".drawn").remove();
  VERTICAL_ZONES = false;
  ATTACKING_ZONES = false;
  DRAWING.numberDrawings = 0;
}

function trainingMode(field) {
  if (!TRAINING_MODE) {
    //only keep sidelines
    d3.select(field).selectAll(".field-marking").style("display", "none");
    //increase player circle size
    PLAYER_RADIUS = 2.25 * SIZE_MULT;

    d3.select(field).append("rect")
        .attr("class", "training-field-marking")
        .attr("id", "sidelines")
        .attr("width", FIELD_LENGTH - (2 * SIDELINE_MARGIN.side))
        .attr("height", FIELD_WIDTH - (2 * SIDELINE_MARGIN.top))
        .attr("x", SIDELINE_MARGIN.side)
        .attr("y", SIDELINE_MARGIN.top + MARGIN_TOP)
        .style("fill", "none")
        .style("stroke", TRAINING_LINE_COLOR)
        .style("stroke-width", 2);
  } else {
    d3.select(field).selectAll(".field-marking").style("display", "block");
    d3.select(field).selectAll(".training-field-marking").remove();
    PLAYER_RADIUS = PLAYER_CIRCLE_SIZE * SIZE_MULT;
  }
  TRAINING_MODE = !TRAINING_MODE;
}

function trainingLines(id, dir, num, enable) {
  // if (!TRAINING_MODE) return;
  var field = d3.select(id);

  if (dir === "v") { //vertical
    if (num === 2) {
      if (!enable) { //disable vertical 1/2 lines
        field.selectAll(".v2").remove();
      } else { //draw vertical 1/2 lines
        field.append("line")
          .attr("class", "v2 training-field-marking")
          .attr("id", "vert-center-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", FIELD_LENGTH / 2)      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", FIELD_LENGTH / 2);
      }
    } else if (num === 3) {
      if (!enable) { //disable vertical 1/3 lines
        field.selectAll(".v3").remove();
      } else { //draw vertical 1/3 lines
        field.append("line")
          .attr("class", "v3 training-field-marking")
          .attr("id", "vert-left-third-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (40 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (40 * SIZE_MULT));
        field.append("line")
          .attr("class", "v3 training-field-marking")
          .attr("id", "vert-right-third-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (80 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (80 * SIZE_MULT));
      }
    } else if (num === 4) {
      if (!enable) { //disable vertical 1/4 lines
        field.selectAll(".v4").remove();
      } else {
        field.append("line")
          .attr("class", "v4 training-field-marking")
          .attr("id", "vert-center-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", FIELD_LENGTH / 2)      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", FIELD_LENGTH / 2);
        field.append("line")
          .attr("class", "v4 training-field-marking")
          .attr("id", "vert-right-fourth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (30 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (30 * SIZE_MULT));
        field.append("line")
          .attr("class", "v4 training-field-marking")
          .attr("id", "vert-right-fourth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (90 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (90 * SIZE_MULT));
      }
    } else if (num === 5) {
      if (!enable) { //disable vertical 1/5 lines
        field.selectAll(".v5").remove();
      } else {
        field.append("line")
          .attr("class", "v5 training-field-marking")
          .attr("id", "vert-left-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (24 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (24 * SIZE_MULT));
        field.append("line")
          .attr("class", "v5 training-field-marking")
          .attr("id", "vert-right-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (48 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (48 * SIZE_MULT));
        field.append("line")
          .attr("class", "v5 training-field-marking")
          .attr("id", "vert-left-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (72 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (72 * SIZE_MULT));
        field.append("line")
          .attr("class", "v5 training-field-marking")
          .attr("id", "vert-right-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top)
          .attr("x1", SIDELINE_MARGIN.side + (96 * SIZE_MULT))      
          .attr("y2", FIELD_WIDTH - SIDELINE_MARGIN.top)
          .attr("x2", SIDELINE_MARGIN.side + (96 * SIZE_MULT));
      }
    }
  } else if (dir === "h") { //horizontal
    if (num === 2) {
      if (!enable) { //disable horizontal 1/2 lines
        field.selectAll(".h2").remove();
      } else { //draw horizontal 1/2 lines
        field.append("line")
          .attr("class", "h2 training-field-marking")
          .attr("id", "horiz-center-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (40 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (40 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
      }
    } else if (num === 3) {
      if (!enable) { //disable horizontal 1/3 lines
        field.selectAll(".h3").remove();
      } else { //draw horizontal 1/3 lines
        field.append("line")
          .attr("class", "h3 training-field-marking")
          .attr("id", "horiz-left-third-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (80/3 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (80/3 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h3 training-field-marking")
          .attr("id", "horiz-right-third-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (160/3 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (160/3 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
      }
    } else if (num === 4) {
      if (!enable) { //disable horizontal 1/4 lines
        field.selectAll(".h4").remove();
      } else {
        field.append("line")
          .attr("class", "h4 training-field-marking")
          .attr("id", "horiz-center-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (40 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (40 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h4 training-field-marking")
          .attr("id", "horiz-right-fourth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (20 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (20 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h4 training-field-marking")
          .attr("id", "horiz-right-fourth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (60 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (60 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
      }
    } else if (num === 5) {
      if (!enable) { //disable horizontal 1/5 lines
        field.selectAll(".h5").remove();
      } else {
        field.append("line")
          .attr("class", "h5 training-field-marking")
          .attr("id", "horiz-left-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (16 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (16 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h5 training-field-marking")
          .attr("id", "horiz-right-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (32 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (32 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h5 training-field-marking")
          .attr("id", "horiz-left-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (48 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (48 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
        field.append("line")
          .attr("class", "h5 training-field-marking")
          .attr("id", "horiz-right-fifth-line")
          .style("stroke", TRAINING_LINE_COLOR)
          .style("stroke-width", 2)  
          .attr("y1", SIDELINE_MARGIN.top + (64 * SIZE_MULT))
          .attr("x1", SIDELINE_MARGIN.side)      
          .attr("y2", SIDELINE_MARGIN.top + (64 * SIZE_MULT))
          .attr("x2", SIDELINE_MARGIN.side + (120 * SIZE_MULT));
      }
    }
  }
}

function trainingGoals(id, dir, numGoals, enabled) {
  var field = d3.select(id);
  if (!enabled) {
    var removeClass = "." + dir + "" + numGoals + "-goal";
    field.selectAll(removeClass).remove();
    return;
  }

  var goalSpacing = dir === "t" || dir === "b" ? ((FIELD_DIMENSIONS.length - (numGoals * (TRAINING_GOAL_WIDTH / SIZE_MULT))) / (numGoals+1)) * SIZE_MULT : ((FIELD_DIMENSIONS.width - (numGoals * (TRAINING_GOAL_WIDTH / SIZE_MULT))) / (numGoals+1)) * SIZE_MULT;
  
  if (dir === "t") {
    for (var i=1; i <= numGoals; i++) {
      field.append("rect")
        .attr("class", "t" + numGoals + "-goal training-field-marking")
        .attr("id", "t" + numGoals + "-goal-" + i)
        .attr("width", TRAINING_GOAL_WIDTH)
        .attr("height", 2 * SIZE_MULT)
        .attr("y", SIDELINE_MARGIN.top - (2 * SIZE_MULT))
        .attr("x", SIDELINE_MARGIN.side + (goalSpacing * i) + (TRAINING_GOAL_WIDTH * (i-1)))
        .style("fill", TRAINING_GOAL_COLOR)
        .style("fill-opacity", 0.25)
        .style("stroke", TRAINING_GOAL_COLOR)
        .style("stroke-width", 2);
    }
  } else if (dir === "b") {
    for (var i=1; i <= numGoals; i++) {
      field.append("rect")
        .attr("class", "b" + numGoals + "-goal training-field-marking")
        .attr("id", "b" + numGoals + "-goal-" + i)
        .attr("width", TRAINING_GOAL_WIDTH)
        .attr("height", 2 * SIZE_MULT)
        .attr("y", FIELD_WIDTH - SIDELINE_MARGIN.top)
        .attr("x", SIDELINE_MARGIN.side + (goalSpacing * i) + (TRAINING_GOAL_WIDTH * (i-1)))
        .style("fill", TRAINING_GOAL_COLOR)
        .style("fill-opacity", 0.25)
        .style("stroke", TRAINING_GOAL_COLOR)
        .style("stroke-width", 2);
    }
  } else if (dir === "l") {
    for (var i=1; i <= numGoals; i++) {
      field.append("rect")
        .attr("class", "l" + numGoals + "-goal training-field-marking")
        .attr("id", "l" + numGoals + "-goal-" + i)
        .attr("width", 2 * SIZE_MULT)
        .attr("height", TRAINING_GOAL_WIDTH)
        .attr("x", SIDELINE_MARGIN.side - (2 * SIZE_MULT))
        .attr("y", SIDELINE_MARGIN.top + (goalSpacing * i) + (TRAINING_GOAL_WIDTH * (i-1)))
        .style("fill", TRAINING_GOAL_COLOR)
        .style("fill-opacity", 0.25)
        .style("stroke", TRAINING_GOAL_COLOR)
        .style("stroke-width", 2);
    }
  } else if (dir === "r") {
    for (var i=1; i <= numGoals; i++) {
      field.append("rect")
        .attr("class", "r" + numGoals + "-goal training-field-marking")
        .attr("id", "r" + numGoals + "-goal-" + i)
        .attr("width", 2 * SIZE_MULT)
        .attr("height", TRAINING_GOAL_WIDTH)
        .attr("x", FIELD_LENGTH - SIDELINE_MARGIN.side)
        .attr("y", SIDELINE_MARGIN.top + (goalSpacing * i) + (TRAINING_GOAL_WIDTH * (i-1)))
        .style("fill", TRAINING_GOAL_COLOR)
        .style("fill-opacity", 0.25)
        .style("stroke", TRAINING_GOAL_COLOR)
        .style("stroke-width", 2);
    }
  }
  field.selectAll("#sidelines").moveToFront();
}

