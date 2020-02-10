var halfFieldWidth  = ((FIELD_WIDTH - (2 * SIDELINE_MARGIN)) / 2) + SIDELINE_MARGIN;
var halfFieldLength = ((FIELD_LENGTH - (2 * SIDELINE_MARGIN)) / 2) + SIDELINE_MARGIN;

var homeFrontLine = halfFieldLength - PLAYER_RADIUS - SIZE_MULT;
var homeBackLine = (19 * SIZE_MULT) + SIDELINE_MARGIN + PLAYER_RADIUS;
var homeFrontBackGap = homeFrontLine - homeBackLine;

var awayFrontLine = halfFieldLength + PLAYER_RADIUS + SIZE_MULT;
var awayBackLine = FIELD_LENGTH - SIDELINE_MARGIN - (19 * SIZE_MULT) - PLAYER_RADIUS;
var awayFrontBackGap = awayBackLine - awayFrontLine;

var topWingHS = (FIELD_WIDTH / 2) - (22 * SIZE_MULT),
    topHSCenter = (FIELD_WIDTH / 2) - (10 * SIZE_MULT),
    bottomCenterHS = (FIELD_WIDTH / 2) + (10 * SIZE_MULT),
    bottomHSWing = (FIELD_WIDTH / 2) + (22 * SIZE_MULT);
var vertZones = {
  topWing: (SIDELINE_MARGIN + topWingHS) / 2,
  topHalfspace: (topWingHS + topHSCenter) / 2,
  center: halfFieldWidth,
  bottomHalfspace: (bottomCenterHS + bottomHSWing) / 2,
  bottomWing: (bottomHSWing + (FIELD_WIDTH - SIDELINE_MARGIN)) / 2
};
var attackingZones = {
  libero: {
    x: SIDELINE_MARGIN + (12 * SIZE_MULT),
    y: topHSCenter,
    height: 20 * SIZE_MULT,
    width: 12 * SIZE_MULT
  },
  defender: {
    left: {
      x: SIDELINE_MARGIN + (18 * SIZE_MULT),
      y: vertZones.topWing,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 12 * SIZE_MULT
    },
    right: {
      x: SIDELINE_MARGIN + (18 * SIZE_MULT),
      y: vertZones.bottomHalfspace,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 12 * SIZE_MULT
    }
  },
  holdingMid: {
    x: SIDELINE_MARGIN + (30 * SIZE_MULT),
    y: topHSCenter,
    height: 20 * SIZE_MULT,
    width: 12 * SIZE_MULT
  },
  attackingMid: {
    left: {
      x: SIDELINE_MARGIN + (36 * SIZE_MULT),
      y: vertZones.topWing,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 18 * SIZE_MULT
    },
    right: {
      x: SIDELINE_MARGIN + (36 * SIZE_MULT),
      y: vertZones.bottomHalfspace,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 18 * SIZE_MULT
    }
  },
  playmaker: {
    x: SIDELINE_MARGIN + (48 * SIZE_MULT),
    y: topHSCenter,
    height: 20 * SIZE_MULT,
    width: 12 * SIZE_MULT
  },
  wideFwd: {
    left: {
      x: SIDELINE_MARGIN + (60 * SIZE_MULT),
      y: vertZones.topWing,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 12 * SIZE_MULT
    },
    right: {
      x: SIDELINE_MARGIN + (60 * SIZE_MULT),
      y: vertZones.bottomHalfspace,
      height: vertZones.topHalfspace - vertZones.topWing,
      width: 12 * SIZE_MULT
    }
  },
  centerFwd: {
    x: SIDELINE_MARGIN + (66 * SIZE_MULT),
    y: topHSCenter,
    height: 20 * SIZE_MULT,
    width: 12 * SIZE_MULT
  }
}

var homePositions = {
  LWy: halfFieldWidth / 3,
  LCy: 2 * (halfFieldWidth / 3),
  CCy: halfFieldWidth,
  RCy: halfFieldWidth + (halfFieldWidth / 3),
  RWy: halfFieldWidth + (2 * (halfFieldWidth / 3)),
  GKx: SIDELINE_MARGIN + (6 * SIZE_MULT),
  LIx: homeBackLine - (homeFrontBackGap * 0.15),
  DFx: homeBackLine,
  DMx: homeBackLine + (homeFrontBackGap * 0.25),
  CMx: homeBackLine + (homeFrontBackGap * 0.5),
  AMx: homeBackLine + (homeFrontBackGap * 0.75),
  STx: homeFrontLine
};

var awayPositions = {
  RWy: halfFieldWidth / 3,
  RCy: 2 * (halfFieldWidth / 3),
  CCy: halfFieldWidth,
  LCy: halfFieldWidth + (halfFieldWidth / 3),
  LWy: halfFieldWidth + (2 * (halfFieldWidth / 3)),
  GKx: FIELD_LENGTH - SIDELINE_MARGIN - (6 * SIZE_MULT),
  LIx: awayBackLine + (homeFrontBackGap * 0.15),
  DFx: awayBackLine,
  DMx: awayBackLine - (awayFrontBackGap * 0.25),
  CMx: awayBackLine - (awayFrontBackGap * 0.5),
  AMx: awayBackLine - (awayFrontBackGap * 0.75),
  STx: awayFrontLine
};

var FORMATIONS = {
  FOUR_THREE_THREE: {
    name: "4-3-3",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.CMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.AMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.AMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.AMx, number: 11, id: 10}
    ]
  },
  TEST: {
    name: "test",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DMx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DMx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.RCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.CCy, x: homePositions.AMx, number: 10, id: 9},
      {y: homePositions.LCy, x: homePositions.CMx, number: 11, id: 10}
    ],
    away: []
  },
  TEST_TWO: {
    name: "test2",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DMx, number: 2, id: 1},
      {y: homePositions.LCy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.CCy, x: homePositions.LIx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.AMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.CMx, number: 11, id: 10}
    ],
    away: []
  },
  FOUR_FOUR_TWO: {
    name: "4-4-2",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.LCy, x: homePositions.CMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.CMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.RCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.STx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.CMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.CMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 8, id: 7},
      {y: awayPositions.RCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.STx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.CMx, number: 11, id: 10}
    ]
  },
  FOUR_DIAMOND_TWO: {
    name: "4-1-2-1-2",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.CMx, number: 7, id: 6},
      {y: homePositions.CCy, x: homePositions.AMx, number: 8, id: 7},
      {y: homePositions.RCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.STx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.CMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.CMx, number: 7, id: 6},
      {y: awayPositions.CCy, x: awayPositions.AMx, number: 8, id: 7},
      {y: awayPositions.RCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.STx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.CMx, number: 11, id: 10}
    ]
  },
  FOUR_TWO_THREE_ONE: {
    name: "4-2-3-1",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.LCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.DMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.CCy, x: homePositions.AMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.AMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.LCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.AMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.DMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.CCy, x: awayPositions.AMx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.AMx, number: 11, id: 10}
    ]
  },
  FIVE_FOUR_ONE: {
    name: "5-4-1",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DFx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.CMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.CMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.CMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DFx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.CMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.CMx, number: 11, id: 10}
    ]
  },
  FIVE_THREE_TWO: {
    name: "5-3-2",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RCy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DMx, number: 3, id: 2},
      {y: homePositions.CCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.DMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.RCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.CMx, number: 10, id: 9},
      {y: homePositions.LCy, x: homePositions.STx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DMx, number: 3, id: 2},
      {y: awayPositions.CCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.DMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 8, id: 7},
      {y: awayPositions.RCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 10, id: 9},
      {y: awayPositions.LCy, x: awayPositions.STx, number: 11, id: 10}
    ]
  },
  THREE_THREE_ONE_THREE: {
    name: "3-3-1-3",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DMx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DMx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.LIx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.CCy, x: homePositions.DMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.CCy, x: homePositions.AMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.AMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DMx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DMx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.LIx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.AMx, number: 7, id: 6},
      {y: awayPositions.CCy, x: awayPositions.DMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.CCy, x: awayPositions.AMx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.AMx, number: 11, id: 10}
    ]
  },
  THREE_FIVE_TWO: {
    name: "3-5-2",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RCy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.CMx, number: 3, id: 2},
      {y: homePositions.CCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.CMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.CMx, number: 8, id: 7},
      {y: homePositions.RCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.CMx, number: 10, id: 9},
      {y: homePositions.LCy, x: homePositions.STx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.CMx, number: 3, id: 2},
      {y: awayPositions.CCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.CMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 8, id: 7},
      {y: awayPositions.RCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 10, id: 9},
      {y: awayPositions.LCy, x: awayPositions.STx, number: 11, id: 10}
    ]
  },
  THREE_FOUR_THREE: {
    name: "3-4-3",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.CMx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.CMx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DFx, number: 4, id: 3},
      {y: homePositions.LCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.CCy, x: homePositions.DFx, number: 6, id: 5},
      {y: homePositions.RCy, x: homePositions.AMx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.DMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.DMx, number: 10, id: 9},
      {y: homePositions.LCy, x: homePositions.AMx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.CMx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.CMx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 4, id: 3},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.CCy, x: awayPositions.DFx, number: 6, id: 5},
      {y: awayPositions.RCy, x: awayPositions.AMx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.DMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.DMx, number: 10, id: 9},
      {y: awayPositions.LCy, x: awayPositions.AMx, number: 11, id: 10}
    ]
  },
  TWO_THREE_FIVE: {
    name: "2-3-5",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RCy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LCy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.CMx, number: 4, id: 3},
      {y: homePositions.CCy, x: homePositions.CMx, number: 5, id: 4},
      {y: homePositions.LCy, x: homePositions.CMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.STx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.STx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.STx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.STx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RCy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LCy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.CMx, number: 4, id: 3},
      {y: awayPositions.CCy, x: awayPositions.CMx, number: 5, id: 4},
      {y: awayPositions.LCy, x: awayPositions.CMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.STx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.STx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.STx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.STx, number: 11, id: 10}
    ]
  },
  W_M: {
    name: "W-M",
    home: [
      {y: homePositions.CCy, x: homePositions.GKx, number: 1, id: 0},
      {y: homePositions.RWy, x: homePositions.DFx, number: 2, id: 1},
      {y: homePositions.LWy, x: homePositions.DFx, number: 3, id: 2},
      {y: homePositions.RCy, x: homePositions.DMx, number: 4, id: 3},
      {y: homePositions.CCy, x: homePositions.DFx, number: 5, id: 4},
      {y: homePositions.LCy, x: homePositions.DMx, number: 6, id: 5},
      {y: homePositions.RWy, x: homePositions.STx, number: 7, id: 6},
      {y: homePositions.RCy, x: homePositions.AMx, number: 8, id: 7},
      {y: homePositions.CCy, x: homePositions.STx, number: 9, id: 8},
      {y: homePositions.LCy, x: homePositions.AMx, number: 10, id: 9},
      {y: homePositions.LWy, x: homePositions.STx, number: 11, id: 10}
    ],
    away: [
      {y: awayPositions.CCy, x: awayPositions.GKx, number: 1, id: 0},
      {y: awayPositions.RWy, x: awayPositions.DFx, number: 2, id: 1},
      {y: awayPositions.LWy, x: awayPositions.DFx, number: 3, id: 2},
      {y: awayPositions.RCy, x: awayPositions.DMx, number: 4, id: 3},
      {y: awayPositions.CCy, x: awayPositions.DFx, number: 5, id: 4},
      {y: awayPositions.LCy, x: awayPositions.DMx, number: 6, id: 5},
      {y: awayPositions.RWy, x: awayPositions.STx, number: 7, id: 6},
      {y: awayPositions.RCy, x: awayPositions.AMx, number: 8, id: 7},
      {y: awayPositions.CCy, x: awayPositions.STx, number: 9, id: 8},
      {y: awayPositions.LCy, x: awayPositions.AMx, number: 10, id: 9},
      {y: awayPositions.LWy, x: awayPositions.STx, number: 11, id: 10}
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