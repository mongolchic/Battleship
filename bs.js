
var torpUsed = 0;
var shipHits = 0;
var remTorp = 25;


$(document).ready(function(){ // Load content after page load

  function pickShipLocations() { // start shiplocation function
    var shipX;
    var shipY;
    var shipCount = 0
    while (shipCount < 5) {
      shipX = Math.floor(Math.random() * 10);
      shipY = Math.floor(Math.random() * 10);
      if ($("#" + shipX + shipY).hasClass("ship") === false) {
        $("#" + shipX + shipY).addClass("ship");
        shipCount ++;
      }
    }// end loop
  } // end ship location function

  /////// Begin makeBoard
  function makeBoard() { // Begin making table rows for the view
    var index = 0;  // Initialize the index variable
    $("#display").text("Torpedoes left: " + remTorp);
    $("#display2").text("Ships destroyed: " + shipHits);

    while(index < 10) { // Make ten table rows
      $("#viewBoard").append("<tr id=" + index + ">"); // Add opening tr
      var index2 = 0; // Initialize second index
      while(index2 < 10) {
        $("#" + index).append("<td id=" + index + index2 + "></td>");

        $("#" + index + index2).on("click", function() { //starting click function
          if(torpUsed === 25) { // I out of torpedoes, inform the user
            alert("You used all of your torpedoes.");
          } else {
            if ($(this).hasClass("destroyed") || $(this).hasClass("miss")) { // Can't fire twice in the same spot
              alert("You can't fire torpedoes at the same spot more than once.");
            }
            if ($(this).hasClass("ship")) { // Show destroyed ship if hit
              $(this).removeClass("ship").addClass("destroyed");
              torpUsed ++;
              shipHits ++;
            }
            if (!($(this).hasClass("miss")) && !($(this).hasClass("destroyed"))) { // Show miss
              $(this).addClass("miss");
              torpUsed ++;
            }
            if (shipHits === 5) { // If they won, tell them
              alert("you won");
            }
            if (torpUsed === 25) { // Show unhit ships after user runs out of torpedoes
              $(".ship").addClass("showShip");
            }
            remTorp = 25 - torpUsed;
            $("#display").text("Torpedoes left: " + remTorp);
            $("#display2").text("Ships destroyed: " + shipHits);
          }
        }); // End click function

        index2 = index2 + 1;
      }

    $("#viewBoard").append("</tr>"); // Add closing tr
    index = index + 1;  // Increment index
    }

  }
  //////// End of makeBoard





  // Testing section
  makeBoard();
  // End testing

  pickShipLocations();


});  // End of loading content at page load
