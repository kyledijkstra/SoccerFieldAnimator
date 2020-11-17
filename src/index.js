/**
 * TODO
 * 
 */

$(document).ready(function() {
  function init() {
    window.addEventListener('resize', function(event) {
      d3.selectAll(".field-marking").remove();
      d3.selectAll("#ball").remove();
      FIELD_WIDTH = window.innerHeight;
      FIELD_LENGTH = window.innerWidth;
      SIZE_MULT = FIELD_LENGTH > 1240 ? 10 : 8.5;
      SIDELINE_MARGIN = {
          top: (FIELD_WIDTH - (FIELD_DIMENSIONS.width * SIZE_MULT))/2,
          side: (FIELD_LENGTH - (FIELD_DIMENSIONS.length * SIZE_MULT))/2
      };
      drawField(FIELD_ID);
    })
    //draw editable field for tracking events
    drawField(FIELD_ID);
    //add color options for teams
    // addColorOptions();
    //add formation options for teams
    addFormationOptions();
    //event handlers
    handlers();
      
  }
  init();

  //add ability to move element to front or back
  d3.selection.prototype.moveToFront = function() {  
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };
  d3.selection.prototype.moveToBack = function() {  
      return this.each(function() { 
          var firstChild = this.parentNode.firstChild; 
          if (firstChild) { 
              this.parentNode.insertBefore(this, firstChild); 
          } 
      });
  };
  
  

});