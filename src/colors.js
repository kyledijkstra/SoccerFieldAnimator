var TEAM_COLOR_OPTIONS = [
    {name: "Arsenal", abbr: "ARS", home: "#EF0107", away: "#4AA1CE", alt: "#000000"},
    {name: "Bournemouth", abbr: "BOU", home: "#E62333", away: "#000000", alt: "#95D5DF"},
    {name: "Brighton", abbr: "BHA", home: "#0055A9", away: "#F8BC1B", alt: "#000000"},
    {name: "Burnley", abbr: "BUR", home: "#53162F", away: "#FFFFFF", alt: "#8CCCE5"},
    {name: "Chelsea", abbr: "CHE", home: "#034694", away: "#FFFFFF", alt: "#000000"},
    {name: "Crystal Palace", abbr: "CRY", home: "#1B458F", away: "#000000", alt: "#FFFFFF"},
    {name: "Everton", abbr: "EVE", home: "#274488", away: "#FFFFFF", alt: "#2C1D46"},
    {name: "Huddersfield Town", abbr: "HDD", home: "#0073D2", away: "#F8191E", alt: "#EE4B66"},
    {name: "Leicester City", abbr: "LEI", home: "#0053A0", away: "#000000", alt: "#FFFFFF"},
    {name: "Liverpool", abbr: "LIV", home: "#D00027", away: "#FFFFFF", alt: "#FD6000"},
    {name: "Manchester City", abbr: "MCI", home: "#98C5E9", away: "#4B082C", alt: "#000000"},
    {name: "Manchester United", abbr: "MUN", home: "#DA020E", away: "#FFE500", alt: "#000000"},
    {name: "Newcastle", abbr: "NEW", home: "#FFFFFF", away: "#98C3ED", alt: "#000000"},
    {name: "Southampton", abbr: "SOU", home: "#ED1A3B", away: "#007C8E", alt: "#000000"},
    {name: "Stoke City", abbr: "STK", home: "#E03A3E", away: "#0162B3", alt: "#FFFFFF"},
    {name: "Swansea City", abbr: "SWA", home: "#FFFFFF", away: "#E50220", alt: "#000000"},
    {name: "Tottenham", abbr: "TOT", home: "#FFFFFF", away: "#001C58", alt: "#44364D"},
    {name: "Watford", abbr: "WAT", home: "#FBEE23", away: "#ED2127", alt: "#000000"},
    {name: "West Brom", abbr: "WBA", home: "#091453", away: "#A60026", alt: "#008558"},
    {name: "West Ham", abbr: "WHU", home: "#60223B", away: "#000000", alt: "#5299C6"}
];

//add array of color options to selects
function addColorOptions() {
    var defaults = d3.select("#home-team-color").append("optgroup").attr("label", "Defaults")
    for (c in COLORS) {
        var color = COLORS[c];
        defaults.append("option")
            .text(color);
    }  
    for (t in TEAM_COLOR_OPTIONS) {
        var team = TEAM_COLOR_OPTIONS[t];
        var teamgroup = d3.select("#home-team-color").append("optgroup").attr("label", team.name);
        teamgroup.append("option")
            .attr("value", team.home)
            .text(team.abbr + "-Home");
        teamgroup.append("option")
            .attr("value", team.away)
            .text(team.abbr + "-Away");
        teamgroup.append("option")
            .attr("value", team.alt)
            .text(team.abbr + "-Alt");
    }
    
    $("#home-num-color").html($("#home-team-color").html());
    $("#away-team-color").html($("#home-team-color").html());
    $("#away-num-color").html($("#home-team-color").html());
    // $("#home-pass-color").html($("#home-team-color").html());
    // $("#home-shot-color").html($("#home-team-color").html());
    // $("#home-goal-color").html($("#home-team-color").html());
    // $("#away-pass-color").html($("#home-team-color").html());
    // $("#away-shot-color").html($("#home-team-color").html());
    // $("#away-goal-color").html($("#home-team-color").html());
}