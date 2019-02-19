//GLOBAL VARIABLES
var FIELD_DIMENSIONS = {length: 105, width: 80},
    SIZE_MULT = 7,
    SIDELINE_MARGIN = 10,
    MARGIN_TOP = 0,
    FIELD_ID = "#tracker",
    FIELD_LENGTH = (FIELD_DIMENSIONS.length * SIZE_MULT) + (2 * SIDELINE_MARGIN),
    FIELD_WIDTH = (FIELD_DIMENSIONS.width * SIZE_MULT) + (2 * SIDELINE_MARGIN),
    // FIELD_COLOR = "olivedrab",
    FIELD_COLOR = "#3cb25b",
    LINE_COLOR = "white",
    HOME = {
        name: "Home",
        color: "black",
        numColor: "white",
        formation: "4-3-3",
        playerIdTracker: 11,
        players: []
    },
    AWAY = {
        name: "Away",
        color: "white",
        numColor: "black",
        formation: "4-3-3",
        playerIdTracker: 11,
        players: []
    },
    COLORS = ["black", "blue", "chartreuse", "cyan", "darkblue", "lightcoral", "magenta", "maroon", "orange", "plum", "purple", "red", "white", "yellow"],
    PLAYER_CIRCLE_SIZE = 2;
var PLAYER_RADIUS = PLAYER_CIRCLE_SIZE * SIZE_MULT;