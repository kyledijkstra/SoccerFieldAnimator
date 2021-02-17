function addAnimation() {
  CURRENT_ANIMATION_INDEX = ANIMATION_HISTORY.length;
  let slide = {
    ball: {},
    players: [],
    drawings: []
  };
  slide.ball = {
    x: BALL_POSITION.x,
    y: BALL_POSITION.y
  };
  for (p in HOME.players) {
    let player = HOME.players[p];
    slide.players.push({
      id: "home-player-" + player.id,
      x: player.x,
      y: player.y
    });
  }
  for (p in AWAY.players) {
    let player = AWAY.players[p];
    slide.players.push({
      id: "away-player-" + player.id,
      x: player.x,
      y: player.y
    });
  }
  ANIMATION_HISTORY.push(slide);
  // TODO add drawings to tracking ANIMATION_HISTORY
  writeAnimationList();
}

function stepAnimaton(dir) {
  // Going backward from slide 0 or forward from last slide
  if ((dir === 'b' && CURRENT_ANIMATION_INDEX === 0) || (dir === 'f' && CURRENT_ANIMATION_INDEX === ANIMATION_HISTORY.length-1)) return;

  let duration = 2000,
      delay = 0;

  let nextAnimation;
  if (dir === 'f') {
    nextAnimation = ANIMATION_HISTORY[parseInt(CURRENT_ANIMATION_INDEX+1)];
  } else if (dir === 'b') {
    nextAnimation = ANIMATION_HISTORY[parseInt(CURRENT_ANIMATION_INDEX-1)];
  }
  // Draw ball
  d3.select("#ball")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("cx", nextAnimation.ball.x)
    .attr("cy", nextAnimation.ball.y);
  //Draw players
  for (p in nextAnimation.players) {
    let player = nextAnimation.players[p];
    d3.select("#" + player.id)
      .transition()
      .duration(duration)
      .delay(delay)
      .attr("transform", function(d) { d.x = player.x; d.y = player.y; return "translate(" + d.x + "," + d.y + ")" });
  }

  if (dir === 'f') {
    CURRENT_ANIMATION_INDEX++;
  } else if (dir === 'b') {
    CURRENT_ANIMATION_INDEX--;
  }
}

function writeAnimationList() {
  d3.selectAll(".animation-history-list").remove();
  for (i in ANIMATION_HISTORY) {
    addAnimationToList(i);
  }
}

function addAnimationToList(id) {
  let list = d3.select("#animation-history");
  let item = list.append("li",":first-child")
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

function goToAnimation(slideNumber) {
  CURRENT_ANIMATION_INDEX = slideNumber;
  let currAnimation = ANIMATION_HISTORY[CURRENT_ANIMATION_INDEX];
  // Draw ball
  BALL_POSITION.x = currAnimation.ball.x;
  BALL_POSITION.y = currAnimation.ball.y;
  d3.select("#ball") // set ball
    .attr("cx", BALL_POSITION.x)
    .attr("cy", BALL_POSITION.y);
  //Draw players
  for (p in currAnimation.players) {
    let player = currAnimation.players[p];
    d3.selectAll("#" + player.id)
      .attr("transform", function(d) { d.x = player.x; d.y = player.y; return "translate(" + d.x + "," + d.y + ")" });
  }
}

function playAnimations() {
  let duration = 2000,
      delay = 2000;

  for (a in ANIMATION_HISTORY) {
    let animation = ANIMATION_HISTORY[a];
    d3.select("#ball")
      .transition()
      .duration(duration)
      .delay(delay * a)
      .attr("cx", animation.ball.x)
      .attr("cy", animation.ball.y);
    for (p in animation.players) {
      let player = animation.players[p];
      d3.select("#" + player.id)
        .transition()
        .duration(duration)
        .delay(delay * a)
        .attr("transform", function(d) { return "translate(" + player.x + "," + player.y + ")" });
    }
  }
  CURRENT_ANIMATION_INDEX = ANIMATION_HISTORY.length-1;
}

function removeAnimation(animationId) {
  d3.selectAll("#animation-history-" + animationId).remove();
  d3.selectAll("#animation-history-list-delete-button-" + animationId).remove();
  ANIMATION_HISTORY.splice(animationId, 1);
  writeAnimationList();
}