
var torpUsed = 0;
var shipHits = 0;
var remTorp = 25;


$(document).ready(function(){ // Load content after page load

  function pickShipLocations() { // start shiplocation function
    var shipX;
    var shipY;

    //Place a 5 block ship
    shipX = generateRandomNum(9);
    shipY = generateRandomNum(5);
    // alert("5 block" + shipX.toString() + shipY.toString());
    for (var i = 0; i < 5; i ++) {
      $("#" + shipX + (shipY + i)).addClass("ship");
    }
    //End a 5 block ship

    // Place 1 horizontal four block ship
    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(9);
      shipY = generateRandomNum(6);

      if(checkCoordinates(shipX, shipY) && checkCoordinates(shipX, (shipY + 1)) && checkCoordinates(shipX, (shipY + 2)) && checkCoordinates(shipX, (shipY + 3))) {
        for (var i = 0; i < 4; i ++) {
          $("#" + shipX + (shipY + i)).addClass("ship");
        }
        spotNotFound = false;
      }
    }

    // End place 1 horizontal four block ship

    // Place 1 vertical four block ship
    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(6);
      shipY = generateRandomNum(9);

      if(checkCoordinates(shipX, shipY) && checkCoordinates((shipX + 1), shipY) && checkCoordinates((shipX + 2), shipY) && checkCoordinates((shipX + 3), shipY)) {
        for (var i = 0; i < 4; i ++) {
          $("#" + (shipX + i) + shipY).addClass("ship");
        }
        spotNotFound = false;
      }
    }

    // End place 1 vertical four block ship

    //Place 1 horizontal three block ship

    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(9);
      shipY = generateRandomNum(7);

      if(checkCoordinates(shipX, shipY) && checkCoordinates(shipX, (shipY + 1)) && checkCoordinates(shipX, (shipY + 2))) {
        for (var i = 0; i < 3; i ++) {
          $("#" + shipX + (shipY + i)).addClass("ship");
        }
        spotNotFound = false;
      }
    }

    // End place 1 horizontal three block ship

    //Place 1 vertical three block ship

    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(7);
      shipY = generateRandomNum(9);

      if(checkCoordinates(shipX, shipY) && checkCoordinates((shipX + 1), shipY) && checkCoordinates((shipX + 2), shipY)) {
        for (var i = 0; i < 3; i ++) {
          $("#" + (shipX + i) + shipY).addClass("ship");
        }
        spotNotFound = false;
      }
    }

    // End place 1 vertical three block ship

    //Place 1 horizontal two block ships

    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(9);
      shipY = generateRandomNum(8);

      if(checkCoordinates(shipX, shipY) && checkCoordinates(shipX, (shipY + 1))) {
        for (var i = 0; i < 2; i ++) {
          $("#" + shipX + (shipY + i)).addClass("ship");
        }
        spotNotFound = false;
      }
    }
    // End place 1 horizontal two block ship

    //Place 1 vertical two block ships

    var spotNotFound = true; // Initialize boolean to see whether a spot is found

    while(spotNotFound) {
      shipX = generateRandomNum(8);
      shipY = generateRandomNum(9);

      if(checkCoordinates(shipX, shipY) && checkCoordinates((shipX + 1), shipY)) {
        for (var i = 0; i < 2; i ++) {
          $("#" + (shipX + i) + shipY).addClass("ship");
        }
        spotNotFound = false;
      }
    }
    // End place 1 vertical two block ship


    // Place 1 block submarine
    spotNotFound = true;
    while(spotNotFound) {
      shipX = generateRandomNum(9);
      shipY = generateRandomNum(9);
      // alert("1 block" + shipX.toString() + shipY.toString());

      if (checkCoordinates(shipX, shipY)) {
        $("#" + shipX + shipY).addClass("ship").addClass("submarine");
        spotNotFound = false;
      }
    };
    // End 1 block submarine




  } // end ship location function


  // Begin random number generator function
  function generateRandomNum(max){
    return Math.floor(Math.random() * (max + 1));
  }
  // End random number generator function

  function checkCoordinates(x, y){
    if (!$("#" + x + y).hasClass("ship") && !$("#" + (x + 1) + y).hasClass("ship") && !$("#" + (x - 1) + y).hasClass("ship") && !$("#" + x + (y + 1)).hasClass("ship") && !$("#" + x + (y - 1)).hasClass("ship") && !$("#" + (x + 1) + (y + 1)).hasClass("ship") && !$("#" + (x + 1) + (y - 1)).hasClass("ship") && !$("#" + (x - 1) + (y + 1)).hasClass("ship") && !$("#" + (x - 1) + (y - 1)).hasClass("ship") ) {
      return true;
    } else {
      return false;
    }
  }



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
              $(this).removeClass("ship").removeClass("submarine").addClass("destroyed");
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
              if(!($(".submarine").hasClass("destroyed"))) {
                $(".submarine").addClass("showSubmarine");
              }
            }
            remTorp = 25 - torpUsed;
            $("#display").text("Torpedoes left: " + remTorp);
            $("#display2").text("Hits: " + shipHits);
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
  pickShipLocations();
  $("#show").on("click", function() {
    $(".ship").addClass("showShip");
    $(".submarine").addClass("showSubmarine");
  });
  // End testing




});  // End of loading content at page load
