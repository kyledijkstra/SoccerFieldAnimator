function addAnimation() {
  ANIMATION_NUMBER++;
  if (Object.keys(ANIMATION_HISTORY).length > 0) {
    ANIMATION_HISTORY.ball.locations.push({
      x: BALL_POSITION.x,
      y: BALL_POSITION.y
    });
    for (var p=0; p < HOME.players.length; p++) {
      var player = HOME.players[p];
      ANIMATION_HISTORY.players.home[player.id].locations.push({
        x: player.x,
        y: player.y
      });
    }
    for (var p=0; p < AWAY.players.length; p++) {
      var player = AWAY.players[p];
      ANIMATION_HISTORY.players.away[player.id].locations.push({
        x: player.x,
        y: player.y
      });
    }
  } else {
    ANIMATION_HISTORY = {
      ball: {
        locations: [
          {
            x: BALL_POSITION.x,
            y: BALL_POSITION.y
          }
        ]
      }
    };
    ANIMATION_HISTORY.players = {
      home: {},
      away: {}
    };
    for (var h=0; h < HOME.players.length; h++) {
      var player = HOME.players[h];
      ANIMATION_HISTORY.players.home[player.id] = {
        locations: [
         {
           x: player.x,
           y: player.y
         }
        ]
      };
    }
    for (var a=0; a < AWAY.players.length; a++) {
      var player = AWAY.players[a];
      ANIMATION_HISTORY.players.away[player.id] = {
        locations: [
         {
           x: player.x,
           y: player.y
         }
        ]
      }
    }
  }
  writeAnimationList();
  
}

function playAnimations() {
  var duration = 1000,
      delay = 2000;
  for (var a=0; a < ANIMATION_HISTORY.ball.locations.length; a++) {
    // Draw ball
    var ballLocations = ANIMATION_HISTORY.ball.locations;
    var ball = d3.select("#ball");
    if (a === 0) {
      ball // set ball to initial position
        .attr("cx", ballLocations[a].x)
        .attr("cy", ballLocations[a].y);
    } else {
      ball  // wait then change the ball's location
        .transition()
        .duration(duration)
        .delay(delay * a)
        .attr("cx", ballLocations[a].x)
        .attr("cy", ballLocations[a].y);
    }
    //Draw home players
    for (var p=0; p < HOME.players.length; p++) {
      var id = HOME.players[p].id;
      var player = d3.select("#home-player-" + id);
      var location = ANIMATION_HISTORY.players.home[id].locations[a];
      if (a === 0) {
        player // set player to initial position
          .attr("transform", function(d) { return "translate(" + location.x + "," + location.y + ")" });
      } else {
        player // wait then change the player's location
          .transition()
          .duration(duration)
          .delay(delay * a)
          .attr("transform", function(d) { return "translate(" + location.x + "," + location.y + ")" });
      }
    }
    //Draw away players
    for (var p=0; p < AWAY.players.length; p++) {
      var id = AWAY.players[p].id;
      var player = d3.select("#away-player-" + id);
      var location = ANIMATION_HISTORY.players.away[id].locations[a];
      if (a === 0) {
        player // set player to initial position
          .attr("transform", function(d) { return "translate(" + location.x + "," + location.y + ")" });
      } else {
        player  // wait then change the player's location
          .transition()
          .duration(duration)
          .delay(delay * a)
          .attr("transform", function(d) { return "translate(" + location.x + "," + location.y + ")" });
      }
    }
  }
}

function writeAnimationList() {
  d3.selectAll(".animation-history-list").remove();
  for (var i=0; i < ANIMATION_HISTORY.ball.locations.length; i++) {
    addAnimationToList(i);
  }
}

function addAnimationToList(id) {
    var list = d3.select("#animation-history");
    var item = list.append("li",":first-child")
      .attr("id", "animation-history-" + id)
      .attr("class", "animation-history-list");
    item.html("Slide #" + (parseInt(id)+1));
    item.append("button")
      .attr("id", "animation-history-list-goto-button-" + id)
      .attr("class", "animation-history-list")
      .text("V")
      .on("click", function(d) { goToAnimation(id); });
    item.append("button")
      .attr("id", "animation-history-list-delete-button-" + id)
      .attr("class", "animation-history-list")
      .text("X")
      .on("click", function(d) { removeAnimation(id); });
}

function removeAnimation(id) {
  d3.selectAll("#animation-history-" + id).remove();
  d3.selectAll("#animation-history-list-delete-button-" + id).remove();
  ANIMATION_HISTORY.ball.locations.splice(id, 1);
  for (var h in ANIMATION_HISTORY.players.home) {
    var player = ANIMATION_HISTORY.players.home[h];
    player.locations.splice(id, 1);
  }
  for (var a in ANIMATION_HISTORY.players.away) {
    var player = ANIMATION_HISTORY.players.away[a];
    player.locations.splice(id, 1);
  }
  writeAnimationList();
}

function goToAnimation(slideNumber) {
  CURRENT_ANIMATION = slideNumber;
  // Draw ball
  var ballLocations = ANIMATION_HISTORY.ball.locations;
  var ball = d3.select("#ball");
  ball // set ball to initial position
    .attr("cx", ballLocations[slideNumber].x)
    .attr("cy", ballLocations[slideNumber].y);
  //Draw home players
  for (var p=0; p < HOME.players.length; p++) {
    var id = HOME.players[p].id;
    var player = d3.select("#home-player-" + id);
    var location = ANIMATION_HISTORY.players.home[id].locations[slideNumber];
    player // set player to initial position
      .attr("transform", function(d) { d.x = location.x; d.y = location.y; return "translate(" + d.x + "," + d.y + ")" });
  }
  //Draw away players
  for (var p=0; p < AWAY.players.length; p++) {
    var id = AWAY.players[p].id;
    var player = d3.select("#away-player-" + id);
    var location = ANIMATION_HISTORY.players.away[id].locations[slideNumber];
    player // set player to initial position
      .attr("transform", function(d) { d.x = location.x; d.y = location.y; return "translate(" + d.x + "," + d.y + ")" });
  }
}