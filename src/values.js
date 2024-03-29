//GLOBAL VARIABLES
var FIELD_DIMENSIONS = {length: 120, width: 80},
    MARGIN_TOP = 0,
    FIELD_ID = "#tracker",
    FIELD_WIDTH = window.innerHeight,
    FIELD_LENGTH = window.innerWidth,
    SIZE_MULT = FIELD_LENGTH > 1240 ? 10 : 8.5,
    SIDELINE_MARGIN = {
        top: (FIELD_WIDTH - (FIELD_DIMENSIONS.width * SIZE_MULT))/2,
        side: (FIELD_LENGTH - (FIELD_DIMENSIONS.length * SIZE_MULT))/2
    }
    FIELD_COLOR = "#3cb25b",
    FIELD_COLOR_ALT = "#33994e", // "none"
    LINE_COLOR = "white",
    HOME = {
        name: "Home",
        color: "black",
        colorSecondary: "black",
        numColor: "white",
        formation: "4-3-3",
        playerIdTracker: 0,
        players: []
    },
    AWAY = {
        name: "Away",
        color: "white",
        colorSecondary: "white",
        numColor: "black",
        formation: "4-3-3",
        playerIdTracker: 0,
        players: []
    },
    COLORS = ["black", "white", "yellow", "blue", "skyblue", "cyan", "darkblue", "orange", "red", "maroon", "lightcoral", "magenta", "plum", "purple", "chartreuse"],
    PLAYER_CIRCLE_SIZE = 1.75,
    BALL_POSITION = {
        x: FIELD_LENGTH / 2,
        y: FIELD_WIDTH / 2
    },
    ANIMATION_HISTORY = [],
    CURRENT_ANIMATION_INDEX = 0,
    VERTICAL_ZONES = false,
    ATTACKING_ZONES = false,
    ATTACKING_ZONES_COLOR = "black",
    FONT = "Rubik",
    TRAINING_MODE = false,
    TRAINING_LINE_COLOR = "white",
    TRAINING_GOAL_COLOR = "white",
    TRAINING_GOAL_WIDTH = 15 * SIZE_MULT,
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
var PLAYER_RADIUS = PLAYER_CIRCLE_SIZE * SIZE_MULT;