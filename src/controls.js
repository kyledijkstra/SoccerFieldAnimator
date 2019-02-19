function handlers() {
  //team setting controls
  teamControls();
  //player setting controls
  playerControls();
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
  document.getElementById("home-team-color").onchange     = function() {HOME.color = this.value;};
  document.getElementById("home-num-color").onchange      = function() {HOME.numColor = this.value;};
  document.getElementById("home-team-formation").onchange = function() {HOME.formation = this.value;};
  document.getElementById("away-team-color").onchange     = function() {AWAY.color = this.value;};
  document.getElementById("away-num-color").onchange      = function() {AWAY.numColor = this.value;};
  document.getElementById("away-team-formation").onchange = function() {AWAY.formation = this.value;};
}