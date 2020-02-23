function handlers() {
  //team setting controls
  teamControls();
  //player setting controls
  playerControls();
  //animation controls
  animationControls();
  //drawing controls
  drawingControls();
  //training controls
  trainingControls();
}

//attach event handlers to player buttons
function playerControls() {
  document.getElementById("add-home-player").onclick = function() {addPlayer("H", true)};
  document.getElementById("add-away-player").onclick = function() {addPlayer("A", true)};
  document.getElementById("add-home-team").onclick = function() {addTeam("H")};
  document.getElementById("add-away-team").onclick = function() {addTeam("A")};
}

//change properties of team based off user selects
function teamControls() {
  document.getElementById("home-team-color").onchange     = function() {HOME.color          = this.value;};
  document.getElementById("home-sec-team-color").onchange = function() {HOME.colorSecondary = this.value;};
  document.getElementById("home-num-color").onchange      = function() {HOME.numColor       = this.value;};
  document.getElementById("home-team-formation").onchange = function() {HOME.formation      = this.value;};
  document.getElementById("away-team-color").onchange     = function() {AWAY.color          = this.value;};
  document.getElementById("away-sec-team-color").onchange = function() {AWAY.colorSecondary = this.value;};
  document.getElementById("away-num-color").onchange      = function() {AWAY.numColor       = this.value;};
  document.getElementById("away-team-formation").onchange = function() {AWAY.formation      = this.value;};
}

//attach event handlers to animation buttons
function animationControls() {
  document.getElementById("play-animations").onclick = function() {playAnimations(CURRENT_ANIMATION, true)};
  document.getElementById("step-fwd-animations").onclick = function() {stepAnimations("f")};
  document.getElementById("step-bck-animations").onclick = function() {stepAnimations("b")};
  document.getElementById("add-animation").onclick = function() {addAnimation()};
}

//attach event handlers to drawing buttons
function drawingControls() {
  document.getElementById("draw-vertical-zones").onclick = function() {drawVerticalZones(FIELD_ID)};
  document.getElementById("draw-attacking-zones").onclick = function() {drawAttackingZones(FIELD_ID)};
  document.getElementById("remove-drawings").onclick = function() {removeDrawings(FIELD_ID)};

  document.getElementById("drawing").onchange  = function() {DRAWING.enabled = document.getElementById("drawing").checked;};
  document.getElementById("change-line-color").onclick = function() {DRAWING.lineColor = document.getElementById("line-color").value;};
  document.getElementById("change-shape-color").onclick = function() {DRAWING.shapeColor = document.getElementById("shape-color").value;};

  document.getElementById("line").onchange  = function() {DRAWING.line  = document.getElementById("line").checked;};
  document.getElementById("dash").onchange  = function() {DRAWING.dash  = document.getElementById("dash").checked;};
  document.getElementById("arrow").onchange = function() {DRAWING.arrow = document.getElementById("arrow").checked;};

  document.getElementById("square").onchange     = function() {DRAWING.square      = document.getElementById("square").checked;};
  document.getElementById("circle").onchange     = function() {DRAWING.circle      = document.getElementById("circle").checked;};
  document.getElementById("fill").onchange       = function() {DRAWING.shapeFill   = document.getElementById("fill").checked;};
  document.getElementById("border").onchange     = function() {DRAWING.shapeBorder = document.getElementById("border").checked;};
  document.getElementById("shape-dash").onchange = function() {DRAWING.shapeDash   = document.getElementById("shape-dash").checked;};
}

//attach event handlers to training buttons
function trainingControls() {
  document.getElementById("training-mode").onchange = function() {trainingMode(FIELD_ID)};

  document.getElementById("training-line-color").onchange = function() {TRAINING_LINE_COLOR = this.value;};

  document.getElementById("vert-half").onchange  = function() {trainingLines(FIELD_ID, "v", 2, document.getElementById("vert-half").checked)};
  document.getElementById("vert-third").onchange = function() {trainingLines(FIELD_ID, "v", 3, document.getElementById("vert-third").checked)};
  document.getElementById("vert-quart").onchange = function() {trainingLines(FIELD_ID, "v", 4, document.getElementById("vert-quart").checked)};
  document.getElementById("vert-quint").onchange = function() {trainingLines(FIELD_ID, "v", 5, document.getElementById("vert-quint").checked)};

  document.getElementById("horiz-half").onchange  = function() {trainingLines(FIELD_ID, "h", 2, document.getElementById("horiz-half").checked)};
  document.getElementById("horiz-third").onchange = function() {trainingLines(FIELD_ID, "h", 3, document.getElementById("horiz-third").checked)};
  document.getElementById("horiz-quart").onchange = function() {trainingLines(FIELD_ID, "h", 4, document.getElementById("horiz-quart").checked)};
  document.getElementById("horiz-quint").onchange = function() {trainingLines(FIELD_ID, "h", 5, document.getElementById("horiz-quint").checked)};
}