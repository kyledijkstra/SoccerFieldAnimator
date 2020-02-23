//Add an entire starting 11 to the field
function addTeam(team) {
  if (team === "H") {
    d3.select(FIELD_ID).selectAll(".home-player").remove();
    HOME.players = getSetup(HOME.formation, team);
    addPlayer(team, false);
  } else {
    d3.select(FIELD_ID).selectAll(".away-player").remove();
    AWAY.players = getSetup(AWAY.formation, team);
    addPlayer(team, false);
  }
}

//Add a player from team onto the field
function addPlayer(team, individual) {
  var field = d3.select(FIELD_ID);
  if (team === "H") {
    if (individual) {
      HOME.players.push({
        x: FIELD_WIDTH / 2,
        y: SIDELINE_MARGIN.top + (12 * SIZE_MULT),
        number: smallestAvailableNumber(HOME.players),
        name: '',
        id: HOME.playerIdTracker++
      });
    }
    
    var elem = field.selectAll("g.home-player")
      .data(HOME.players);
    var elemEnter = elem.enter().append("g")
      .attr("class", "home-player")
      .attr("id", function(d) { return "home-player-" + d.id })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    var circle = elemEnter.append("circle")
      .attr("r", PLAYER_RADIUS)
      .style("fill", HOME.color)
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    var arc = d3.arc();
    var halfCircle = elemEnter.append('path')
      .style("fill", HOME.colorSecondary)
      .attr('d', arc({
          innerRadius: 0,
          outerRadius: PLAYER_RADIUS,
          startAngle: 0,
          endAngle: Math.PI
      }))
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    elemEnter.append("text")
      .attr("class", "home-player-number")
      .attr("id", function (d) { return "home-player-number-" + d.id; })
      .attr("dominant-baseline", "central")
      .attr("text-anchor", "middle")
      .style("fill", HOME.numColor)
      .style("font-size", 1.5 * SIZE_MULT + 7.5)
      .style("font-family", FONT)
      .text(function(d) { return d.number })
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    elemEnter.append("text")
      .attr("class", "home-player-name")
      .attr("id", function (d) { return "home-player-name-" + d.id; })
      .attr("dominant-baseline", "text-top")
      .attr("text-anchor", "middle")
      .style("fill", HOME.numColor)
      .style("font-size", 12)
      .style("font-family", FONT)
      .attr("dy", "-1.25em")
      .text(function(d) { return d.name });
  } else {
    if (individual) {
      AWAY.players.push({
        x: FIELD_WIDTH / 2,
        y: FIELD_LENGTH - SIDELINE_MARGIN.top - (12 * SIZE_MULT),
        number: smallestAvailableNumber(AWAY.players),
        name: '',
        id: AWAY.playerIdTracker++
      });
    }
    
    var elem = field.selectAll("g.away-player")
      .data(AWAY.players);
    var elemEnter = elem.enter().append("g")
      .attr("class", "away-player")
      .attr("id", function(d) { return "away-player-" + d.id })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    var circle = elemEnter.append("circle")
      .attr("r", PLAYER_RADIUS)
      .style("fill", AWAY.color)
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    var arc = d3.arc();
    var halfCircle = elemEnter.append('path')
      .style("fill", AWAY.colorSecondary)
      .attr('d', arc({
          innerRadius: 0,
          outerRadius: PLAYER_RADIUS,
          startAngle: 0,
          endAngle: Math.PI
      }))
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    elemEnter.append("text")
      .attr("class", "away-player-number")
      .attr("id", function (d) { return "away-player-number-" + d.id; })
      .attr("dominant-baseline", "central")
      .attr("text-anchor", "middle")
      .style("fill", AWAY.numColor)
      .style("font-size", 1.5 * SIZE_MULT + 7.5)
      .attr("font-family", FONT)
      .text(function(d) { return d.number })
      .on("mouseover", function (d) { d3.select(this).style("cursor", "move"); })
      .on("mouseout", function (d) {});
    elemEnter.append("text")
      .attr("class", "away-player-name")
      .attr("id", function (d) { return "away-player-name-" + d.id; })
      .attr("dominant-baseline", "text-top")
      .attr("text-anchor", "middle")
      .style("fill", AWAY.numColor)
      .style("font-size", 12)
      .style("font-family", FONT)
      .attr("dy", "-1.25em")
      .text(function(d) { return d.name });
  }
  writePlayerList();
}

function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  d.x = d3.event.x;
  d.y = d3.event.y;
  if (d.x > FIELD_LENGTH) d.x = FIELD_LENGTH - PLAYER_RADIUS;
  if (d.x < 0) d.x = 0 + PLAYER_RADIUS;
  if (d.y > FIELD_WIDTH) d.y = FIELD_WIDTH - PLAYER_RADIUS;
  if (d.y < 0) d.y = 0 + PLAYER_RADIUS;
  d3.select(this).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
}

function dragended(d) {
  d3.select(this).classed("active", false);
}

//get the smallest number available from a squad of players
function smallestAvailableNumber(squad) {
  var smallestAvailableNumber = 1;
  var inUse = numberUsed(squad, smallestAvailableNumber);
  while (inUse) {
    smallestAvailableNumber++;
    inUse = numberUsed(squad, smallestAvailableNumber);
  }
  return smallestAvailableNumber;
}
//return whether a not a number is already being used by a player in the squad
function numberUsed(squad, number) {
  for (i=0; i < squad.length; i++) {
    var currentNumber = squad[i].number;
    if (currentNumber === number) return true;
  }
  return false;
}

function getSetup(formation, team) {
  for (f in FORMATIONS) {
    if (FORMATIONS[f].name === formation) {
      if (team === "H") return FORMATIONS[f].home;
      if (team === "A") return FORMATIONS[f].away;
    }
  }
}

function writePlayerList() {
  d3.selectAll(".home-player-list").remove();
  d3.selectAll(".away-player-list").remove();
  for (var i=0; i < HOME.players.length; i++) {
    var player = HOME.players[i];
    addPlayerToList(player, "H");
  }
  for (var i=0; i < AWAY.players.length; i++) {
    var player = AWAY.players[i];
    addPlayerToList(player, "A");
  }
}

function addPlayerToList(player, team) {
  if (team === "H") {
    var list = d3.select("#player-list-home");
    var item = list.append("li",":first-child")
      .attr("id", "home-player-list-" + player.id)
      .attr("class", "home-player-list");
    item.html("Player #:");
    item.append("input")
      .attr("id", "home-player-list-input-" + player.id)
      .attr("type", "number")
      .attr("value", player.number)
      .attr("min", 1)
      .attr("max", 99)
      .style("width", "30px")
      .on("input", function() { updatePlayerNumber(+this.value, player.id, "H"); });
    item.append("input")
        .attr("id", "home-player-list-name-input-" + player.id)
        .attr("type", "text")
        .attr("value", player.name)
        .style("width", "70px")
        .on("input", function() { updatePlayerName(this.value, player.id, "H"); });
    item.append("button")
      .attr("id", "home-player-list-button-" + player.id)
      .text("X")
      .on("click", function(d) { removePlayer("home", player.id); });
  } else {
    var list = d3.select("#player-list-away");
    var item = list.append("li",":first-child")
      .attr("id", "away-player-list-" + player.id)
      .attr("class", "away-player-list");
    item.html("Player #:");
    item.append("input")
      .attr("id", "away-player-list-input-" + player.id)
      .attr("type", "number")
      .attr("value", player.number)
      .attr("min", 1)
      .attr("max", 99)
      .style("width", "30px")
      .on("input", function() { updatePlayerNumber(+this.value, player.id, "A"); });
    item.append("input")
      .attr("id", "away-player-list-name-input-" + player.id)
      .attr("type", "text")
      .attr("value", player.name)
      .style("width", "70px")
      .on("input", function() { updatePlayerName(this.value, player.id, "A"); });
    item.append("button")
      .attr("id", "away-player-list-button-" + player.id)
      .text("X")
      .on("click", function(d) { removePlayer("away", player.id); });
  }
  
}

function updatePlayerNumber(number, id, team) {
  if (team === "H") {
    for (var i=0; i < HOME.players.length; i++) {
      var player = HOME.players[i];
      if (player.id === id) {
        HOME.players[i].number = number;
        if (number > 0) {
          d3.selectAll("#home-player-number-" + player.id).text(number);
        } else {
          d3.selectAll("#home-player-number-" + player.id).text('');
        }
      }
    }
  } else {
    for (var i=0; i < AWAY.players.length; i++) {
      var player = AWAY.players[i];
      if (player.id === id) {
        AWAY.players[i].number = number;
        if (number > 0) {
          d3.selectAll("#away-player-number-" + player.id).text(number);
        } else {
          d3.selectAll("#away-player-number-" + player.id).text('');
        }
      }
    }
  }
}

function updatePlayerName(name, id, team) {
  if (team === "H") {
    for (var i=0; i < HOME.players.length; i++) {
      var player = HOME.players[i];
      if (player.id === id) {
        HOME.players[i].name = name;
        d3.selectAll("#home-player-name-" + player.id).text(name);
      }
    }
  } else {
    for (var i=0; i < AWAY.players.length; i++) {
      var player = AWAY.players[i];
      if (player.id === id) {
        AWAY.players[i].name = name;
        d3.selectAll("#away-player-name-" + player.id).text(name);
      }
    }
  }
}

function removePlayer(team, id) {
  d3.selectAll("#" + team + "-player-list-" + id).remove();
  d3.selectAll("#" + team + "-player-" + id).remove();
  if (team === "home") {
    var h = HOME.players.length-1;
    while(h >= 0) {
      var player = HOME.players[h];
      if (player.id === id) {
        HOME.players.splice(h, 1);
        h = 0;
      }
      h--;
    }
  } else {
    var a = AWAY.players.length-1;
    while(a >= 0) {
      var player = AWAY.players[a];
      if (player.id === id) {
        AWAY.players.splice(a, 1);
        a = 0;
      }
      a--;
    }
  }
}

