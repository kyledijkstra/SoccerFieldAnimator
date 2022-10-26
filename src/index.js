/**
 * TODO
 * Allow direct animation import
 * Remove all players button
 * CMD+D = Drawing enable/disable
 * Allow live resizing of field
 * Reordering slides
 */

$(document).ready(function() {
  function init() {
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