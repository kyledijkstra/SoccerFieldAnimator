function addAnimation() {
  CURRENT_ANIMATION_INDEX = ANIMATION_HISTORY.length;
  let slide = {
    ball: {},
    players: [],
    drawings: [],
    name: "Slide #" + parseInt(CURRENT_ANIMATION_INDEX+1)
  };
  //Add ball to slide
  slide.ball = {
    x: BALL_POSITION.x,
    y: BALL_POSITION.y
  };
  //Add players to slide
  for (p in HOME.players) {
    let player = HOME.players[p];
    // console.log(player);
    slide.players.push({
      id: "home-player-" + player.id,
      x: player.x,
      y: player.y,
      name: player.name,
      number: player.number
    });
  }
  for (p in AWAY.players) {
    let player = AWAY.players[p];
    slide.players.push({
      id: "away-player-" + player.id,
      x: player.x,
      y: player.y,
      name: player.name,
      number: player.number
    });
  }
  //Add drawings to slide
  d3.selectAll(".line").each(function(d, i){
    let line = d3.select(this);
    let lineObj = {
      type: "line",
      start: {
        x: line.attr("x1"),
        y: line.attr("y1"),
      },
      end: {
        x: line.attr("x2"),
        y: line.attr("y2"),
      },
      stroke: line.style("stroke"),
      strokeWidth: line.style("stroke-width"),
      dash: line.style("stroke-dasharray"),
      arrow: line.attr("marker-end")
    }
    slide.drawings.push(lineObj);
  });
  d3.selectAll(".circle").each(function(d, i){
    let circle = d3.select(this);
    let circleObj = {
      type: "circle",
      dimensions: {
        x: circle.attr("cx"),
        y: circle.attr("cy"),
        r: circle.attr("r"),
      },
      stroke: circle.style("stroke"),
      strokeWidth: circle.style("stroke-width"),
      dash: circle.style("stroke-dasharray"),
      fill: circle.style("fill"),
    }
    slide.drawings.push(circleObj);
  });
  d3.selectAll(".square").each(function(d, i){
    let square = d3.select(this);
    let squareObj = {
      type: "square",
      dimensions: {
        x: square.attr("x"),
        y: square.attr("y"),
        width: square.attr("width"),
        height: square.attr("height"),
      },
      stroke: square.style("stroke"),
      strokeWidth: square.style("stroke-width"),
      dash: square.style("stroke-dasharray"),
      fill: square.style("fill"),
    }
    slide.drawings.push(squareObj);
  });
  // console.log(slide);
  ANIMATION_HISTORY.push(slide);
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
  //Remove old drawings and draw next drawings
  removeDrawings(FIELD_ID);
  for (d in nextAnimation.drawings) {
    let drawing = nextAnimation.drawings[d];
    drawFromObject(drawing);
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
    var slideNum = parseInt(i)+1;
    var slideName = ANIMATION_HISTORY[i].name ? ANIMATION_HISTORY[i].name : "Slide #" + slideNum;
    addAnimationToList(i, slideName);
  }
}

function addAnimationToList(id, name) {
  let list = d3.select("#animation-history");
  let item = list.append("li",":first-child")
    .attr("id", "animation-history-" + id)
    .attr("class", "animation-history-list");
  item.append("input")
        .attr("id", "animation-history-list-slide-" + id)
        .attr("class", "animation-history-list")
        .attr("type", "text")
        .attr("value", name)
        .style("width", "70px")
        .on("input", function() { updateSlideName(this.value, id); });
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

function updateSlideName(val, slideNumber) {
  ANIMATION_HISTORY[slideNumber].name = val;
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
  //Remove old drawings and draw next drawings
  removeDrawings(FIELD_ID);
  for (d in currAnimation.drawings) {
    let drawing = currAnimation.drawings[d];
    drawFromObject(drawing);
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
    setTimeout(function(){
      removeDrawings(FIELD_ID);
      for (d in animation.drawings) {
        let drawing = animation.drawings[d];
        drawFromObject(drawing);
      }
    }, delay * a);
    
  }
  CURRENT_ANIMATION_INDEX = ANIMATION_HISTORY.length-1;
}

function removeAnimation(animationId) {
  d3.selectAll("#animation-history-" + animationId).remove();
  d3.selectAll("#animation-history-list-delete-button-" + animationId).remove();
  ANIMATION_HISTORY.splice(animationId, 1);
  writeAnimationList();
}

function removeAllAnimations() {
  d3.selectAll("animation-history-list").remove();
  ANIMATION_HISTORY = [];
  writeAnimationList();
}

function exportAnimations(exportObj, exportName){
  var relativeObj = getRelativeAnimation(exportObj);
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(relativeObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function loadAnimations() {
  fetch('./animations.json')
    .then(response => response.json())
    .then(data => {
      ANIMATION_HISTORY = getAbsoluteAnimation(data);
      loadPlayers()
      writeAnimationList();
      goToAnimation(0);
    });
}

function loadPlayers() {
  var players = ANIMATION_HISTORY[0].players;
  //remove all players
  removeAllPlayers();
  //add loaded players
  for (p in players) {
    var player = players[p];
    var pidSplit = player.id.split('-');
    var team = pidSplit[0];
    addPlayer(team.substr(0,1).toUpperCase(), true, player.number, player.name);
  }
}

function getRelativeAnimation(animationObj) {
  var size = {len: FIELD_LENGTH - (2 * SIDELINE_MARGIN.side), width: FIELD_WIDTH - (2 * SIDELINE_MARGIN.top), sideMargin: SIDELINE_MARGIN.side, topMargin: SIDELINE_MARGIN.top};
  var obj = {size: size, animation: animationObj};
  return obj;
}

function getAbsoluteAnimation(animationObj) {
  var oldLength = animationObj.size.len;
  var oldWidth = animationObj.size.width;
  var oldTopMargin = animationObj.size.topMargin;
  var oldSideMargin = animationObj.size.sideMargin;
  
  var currSize = {len: FIELD_LENGTH - (2 * SIDELINE_MARGIN.side), width: FIELD_WIDTH - (2 * SIDELINE_MARGIN.top), sideMargin: SIDELINE_MARGIN.side, topMargin: SIDELINE_MARGIN.top};
  var currLength = currSize.len;
  var currWidth = currSize.width;

  if (oldLength === currLength && oldWidth === currWidth && currSize.sideMargin === oldSideMargin && currSize === oldTopMargin) {
    console.log('DID NOT CONVERT, DIMENSIONS ARE IDENTICAL');
    return animationObj.animation;
  }
  
  var animations = animationObj.animation;
  var ret = [];
  for (a in animations) {
    var animObj = {};
    var animation = animations[a];
    //name
    animObj.name = animation.name;
    //ball
    animObj.ball = convertPoint(animation.ball, animationObj.size, currSize);
    //players
    var players = [];
    for (p in animation.players) {
      var player = convertPoint(animation.players[p], animationObj.size, currSize);
      players.push(player);
    }
    animObj.players = players;
    //drawings
    var drawings = [];
    for (d in animation.drawings) {
      var drawing = animation.drawings[d];
      drawing = convertDrawing(drawing, animationObj.size, currSize);
      drawings.push(drawing);
    }
    animObj.drawings = drawings;
    ret.push(animObj);
  }
  // console.log(ret);
  return ret;
}

function convertPoint(point, oldSize, currSize) {
  var diffLength = currSize.len/oldSize.len;
  var diffWidth = currSize.width/oldSize.width;

  point.x = (point.x - oldSize.sideMargin) * diffLength + currSize.sideMargin;
  point.y = (point.y - oldSize.topMargin) * diffWidth + currSize.topMargin;

  return point;
}

function convertArea(size, oldSize, currSize) {
  var diffArea = (currSize.len*currSize.width)/(oldSize.len*oldSize.width);

  return size * Math.sqrt(diffArea);
}

function convertHeight(height, oldSize, currSize) {
  var diffWidth = currSize.width/oldSize.width;

  return height * diffWidth;
}

function convertWidth(width, oldSize, currSize) {
  var diffLength = currSize.len/oldSize.len;

  return width * diffLength;
}

function convertDrawing(drawing, oldSize, currSize) {
  var shape = drawing.type;
  if (shape === "line") {
    drawing.start = convertPoint(drawing.start, oldSize, currSize);
    drawing.end   = convertPoint(drawing.end, oldSize, currSize);
  } else if (shape === "circle") {
    drawing.dimensions   = convertPoint(drawing.dimensions, oldSize, currSize);
    drawing.dimensions.r = convertArea(drawing.dimensions.r, oldSize, currSize);
  } else if (shape === "square") {
    drawing.dimensions        = convertPoint(drawing.dimensions, oldSize, currSize);
    drawing.dimensions.height = convertHeight(drawing.dimensions.height, oldSize, currSize);
    drawing.dimensions.width  = convertHeight(drawing.dimensions.width, oldSize, currSize);
  }
  return drawing;
}
