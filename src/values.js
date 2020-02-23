//GLOBAL VARIABLES
var FIELD_DIMENSIONS = {length: 120, width: 80},
    SIZE_MULT = 8.5,
    MARGIN_TOP = 0,
    FIELD_ID = "#tracker",
    // SIDELINE_MARGIN = 20,
    // FIELD_LENGTH = (FIELD_DIMENSIONS.length * SIZE_MULT) + (2 * SIDELINE_MARGIN),
    // FIELD_WIDTH = (FIELD_DIMENSIONS.width * SIZE_MULT) + (2 * SIDELINE_MARGIN),
    FIELD_LENGTH = 1280,
    FIELD_WIDTH = 720,
    SIDELINE_MARGIN = {
        top: (FIELD_WIDTH - (FIELD_DIMENSIONS.width * SIZE_MULT))/2,
        side: (FIELD_LENGTH - (FIELD_DIMENSIONS.length * SIZE_MULT))/2
    }
    FIELD_COLOR = "#3cb25b",
    FIELD_COLOR_ALT = "#33994e",
    LINE_COLOR = "white",
    HOME = {
        name: "Home",
        color: "black",
        colorSecondary: "black",
        numColor: "white",
        formation: "4-3-3",
        playerIdTracker: 11,
        players: []
    },
    AWAY = {
        name: "Away",
        color: "white",
        colorSecondary: "white",
        numColor: "black",
        formation: "4-3-3",
        playerIdTracker: 11,
        players: []
    },
    COLORS = ["black", "white", "yellow", "blue", "skyblue", "cyan", "darkblue", "orange", "red", "maroon", "lightcoral", "magenta", "plum", "purple", "chartreuse"],
    PLAYER_CIRCLE_SIZE = 1.75,
    BALL_POSITION = {
        x: FIELD_LENGTH / 2,
        y: FIELD_WIDTH / 2
    },
    ANIMATION_HISTORY = {},
    ANIMATION_NUMBER = 0,
    CURRENT_ANIMATION = 0,
    VERTICAL_ZONES = false,
    ATTACKING_ZONES = false,
    ATTACKING_ZONES_COLOR = "black",
    FONT = "Rubik",
    TRAINING_MODE = false,
    TRAINING_LINE_COLOR = "black"
    DRAWING = {
        enabled: false,
        line: false,
        dash: false,
        arrow: false,
        numberDrawings: 0,
        lineColor: "black",
        shapeColor: "black",
        shapeFill: false,
        shapeBorder: false,
        shapeDash: false,
        circle: false,
        square: false
    };
var PLAYER_RADIUS = PLAYER_CIRCLE_SIZE * SIZE_MULT;