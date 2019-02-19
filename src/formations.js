var halfFieldWidth  = ((FIELD_WIDTH - (2 * SIDELINE_MARGIN)) / 2) + SIDELINE_MARGIN;
var halfFieldLength = ((FIELD_LENGTH - (2 * SIDELINE_MARGIN)) / 2) + SIDELINE_MARGIN;
var homePositions = {
  RWx: halfFieldWidth / 3,
  RCx: 2 * (halfFieldWidth / 3),
  CCx: halfFieldWidth,
  LCx: halfFieldWidth + (halfFieldWidth / 3),
  LWx: halfFieldWidth + (2 * (halfFieldWidth / 3)),
  GKy: SIDELINE_MARGIN + (6 * SIZE_MULT),
  DFy: (19 * SIZE_MULT) + SIDELINE_MARGIN + PLAYER_RADIUS,
  DMy: (27 * SIZE_MULT) + SIDELINE_MARGIN + PLAYER_RADIUS,
  CMy: (35 * SIZE_MULT) + SIDELINE_MARGIN + PLAYER_RADIUS,
  AMy: (40 * SIZE_MULT) + SIDELINE_MARGIN + PLAYER_RADIUS,
  STy: halfFieldLength - PLAYER_RADIUS - SIZE_MULT
};

var awayPositions = {
  LWx: halfFieldWidth / 3,
  LCx: 2 * (halfFieldWidth / 3),
  CCx: halfFieldWidth,
  RCx: halfFieldWidth + (halfFieldWidth / 3),
  RWx: halfFieldWidth + (2 * (halfFieldWidth / 3)),
  GKy: FIELD_LENGTH - SIDELINE_MARGIN - (6 * SIZE_MULT),
  DFy: FIELD_LENGTH - SIDELINE_MARGIN - (19 * SIZE_MULT) - PLAYER_RADIUS,
  DMy: FIELD_LENGTH - SIDELINE_MARGIN - (27 * SIZE_MULT) - PLAYER_RADIUS,
  CMy: FIELD_LENGTH - SIDELINE_MARGIN - (35 * SIZE_MULT) - PLAYER_RADIUS,
  AMy: FIELD_LENGTH - SIDELINE_MARGIN - (40 * SIZE_MULT) - PLAYER_RADIUS,
  STy: halfFieldLength + PLAYER_RADIUS + SIZE_MULT
};

var FORMATIONS = {
  FOUR_THREE_THREE: {
    name: "4-3-3",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DFy, number: 3, id: 2},
      {x: homePositions.RCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.AMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.CMy, number: 8, id: 7},
      {x: homePositions.CCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.CMy, number: 10, id: 9},
      {x: homePositions.LWx, y: homePositions.AMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DFy, number: 3, id: 2},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.AMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.CMy, number: 8, id: 7},
      {x: awayPositions.CCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.CMy, number: 10, id: 9},
      {x: awayPositions.LWx, y: awayPositions.AMy, number: 11, id: 10}
    ]
  },
  FOUR_FOUR_TWO: {
    name: "4-4-2",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DFy, number: 3, id: 2},
      {x: homePositions.RCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.LCx, y: homePositions.CMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.CMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.CMy, number: 8, id: 7},
      {x: homePositions.RCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.STy, number: 10, id: 9},
      {x: homePositions.LWx, y: homePositions.CMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DFy, number: 3, id: 2},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.LCx, y: awayPositions.CMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.CMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.CMy, number: 8, id: 7},
      {x: awayPositions.RCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.STy, number: 10, id: 9},
      {x: awayPositions.LWx, y: awayPositions.CMy, number: 11, id: 10}
    ]
  },
  FOUR_DIAMOND_TWO: {
    name: "4-1-2-1-2",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DFy, number: 3, id: 2},
      {x: homePositions.RCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.CMy, number: 7, id: 6},
      {x: homePositions.CCx, y: homePositions.AMy, number: 8, id: 7},
      {x: homePositions.RCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.STy, number: 10, id: 9},
      {x: homePositions.LWx, y: homePositions.CMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DFy, number: 3, id: 2},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.CMy, number: 7, id: 6},
      {x: awayPositions.CCx, y: awayPositions.AMy, number: 8, id: 7},
      {x: awayPositions.RCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.STy, number: 10, id: 9},
      {x: awayPositions.LWx, y: awayPositions.CMy, number: 11, id: 10}
    ]
  },
  FOUR_TWO_THREE_ONE: {
    name: "4-2-3-1",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DFy, number: 3, id: 2},
      {x: homePositions.RCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.LCx, y: homePositions.DMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.AMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.DMy, number: 8, id: 7},
      {x: homePositions.CCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.CCx, y: homePositions.AMy, number: 10, id: 9},
      {x: homePositions.LWx, y: homePositions.AMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DFy, number: 3, id: 2},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.LCx, y: awayPositions.DMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.AMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.DMy, number: 8, id: 7},
      {x: awayPositions.CCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.CCx, y: awayPositions.AMy, number: 10, id: 9},
      {x: awayPositions.LWx, y: awayPositions.AMy, number: 11, id: 10}
    ]
  },
  FIVE_FOUR_ONE: {
    name: "5-4-1",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DFy, number: 3, id: 2},
      {x: homePositions.LCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.RCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DFy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.CMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.CMy, number: 8, id: 7},
      {x: homePositions.CCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.CMy, number: 10, id: 9},
      {x: homePositions.LWx, y: homePositions.CMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DFy, number: 3, id: 2},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DFy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.CMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.CMy, number: 8, id: 7},
      {x: awayPositions.CCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.CMy, number: 10, id: 9},
      {x: awayPositions.LWx, y: awayPositions.CMy, number: 11, id: 10}
    ]
  },
  FIVE_THREE_TWO: {
    name: "5-3-2",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RCx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.DMy, number: 3, id: 2},
      {x: homePositions.CCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.DMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.CMy, number: 8, id: 7},
      {x: homePositions.RCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.CMy, number: 10, id: 9},
      {x: homePositions.LCx, y: homePositions.STy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.DMy, number: 3, id: 2},
      {x: awayPositions.CCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.DMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.CMy, number: 8, id: 7},
      {x: awayPositions.RCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.CMy, number: 10, id: 9},
      {x: awayPositions.LCx, y: awayPositions.STy, number: 11, id: 10}
    ]
  },
  THREE_FIVE_TWO: {
    name: "3-5-2",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RCx, y: homePositions.DFy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.CMy, number: 3, id: 2},
      {x: homePositions.CCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DMy, number: 6, id: 5},
      {x: homePositions.RWx, y: homePositions.CMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.CMy, number: 8, id: 7},
      {x: homePositions.RCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.CMy, number: 10, id: 9},
      {x: homePositions.LCx, y: homePositions.STy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.CMy, number: 3, id: 2},
      {x: awayPositions.CCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DMy, number: 6, id: 5},
      {x: awayPositions.RWx, y: awayPositions.CMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.CMy, number: 8, id: 7},
      {x: awayPositions.RCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.CMy, number: 10, id: 9},
      {x: awayPositions.LCx, y: awayPositions.STy, number: 11, id: 10}
    ]
  },
  THREE_FOUR_THREE: {
    name: "3-4-3",
    home: [
      {x: homePositions.CCx, y: homePositions.GKy, number: 1, id: 0},
      {x: homePositions.RWx, y: homePositions.CMy, number: 2, id: 1},
      {x: homePositions.LWx, y: homePositions.CMy, number: 3, id: 2},
      {x: homePositions.RCx, y: homePositions.DFy, number: 4, id: 3},
      {x: homePositions.LCx, y: homePositions.DFy, number: 5, id: 4},
      {x: homePositions.CCx, y: homePositions.DFy, number: 6, id: 5},
      {x: homePositions.RCx, y: homePositions.AMy, number: 7, id: 6},
      {x: homePositions.RCx, y: homePositions.DMy, number: 8, id: 7},
      {x: homePositions.CCx, y: homePositions.STy, number: 9, id: 8},
      {x: homePositions.LCx, y: homePositions.DMy, number: 10, id: 9},
      {x: homePositions.LCx, y: homePositions.AMy, number: 11, id: 10}
    ],
    away: [
      {x: awayPositions.CCx, y: awayPositions.GKy, number: 1, id: 0},
      {x: awayPositions.RWx, y: awayPositions.CMy, number: 2, id: 1},
      {x: awayPositions.LWx, y: awayPositions.CMy, number: 3, id: 2},
      {x: awayPositions.RCx, y: awayPositions.DFy, number: 4, id: 3},
      {x: awayPositions.LCx, y: awayPositions.DFy, number: 5, id: 4},
      {x: awayPositions.CCx, y: awayPositions.DFy, number: 6, id: 5},
      {x: awayPositions.RCx, y: awayPositions.AMy, number: 7, id: 6},
      {x: awayPositions.RCx, y: awayPositions.DMy, number: 8, id: 7},
      {x: awayPositions.CCx, y: awayPositions.STy, number: 9, id: 8},
      {x: awayPositions.LCx, y: awayPositions.DMy, number: 10, id: 9},
      {x: awayPositions.LCx, y: awayPositions.AMy, number: 11, id: 10}
    ]
  }
};


//add array of formation options to selects
function addFormationOptions() {
  var defaults = d3.select("#home-team-formation").append("optgroup").attr("label", "Defaults")
  for (f in FORMATIONS) {
      var formation = FORMATIONS[f];
      defaults.append("option")
          .text(formation.name);
  }
  
  $("#away-team-formation").html($("#home-team-formation").html());
}