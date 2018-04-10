$(document).ready(function() {
  $(".start").click(function() {

    $(".rules").toggle();
  });
});

$(document).ready(function() {
  $(".next").click(function() {

    $(".section1").toggle();

  });
});

$(document).ready(function() {
  $("#saveForm").click(function() {

    $(".game").toggle();

  });
});


// business logic

var playersArray = []
var turnRollArray = []

function Player(playerName, score) {
  this.playerName = playerName;
  this.score = score;
  playersArray.push(this);
}

Array.prototype.sum = function() {
  return this.reduce(function(a, b) {
    return a + b
  });
}

// user interface logic
$(document).ready(function() {
  $("form#player-details").submit(function(event) {
    event.preventDefault();

    var inputtedplayer1 = $("input#player1").val();
    var inputtedplayer2 = $("input#player2").val();
    var player1 = new Player(inputtedplayer1, 0);
    var player2 = new Player(inputtedplayer2, 0);
    $("#player1Display").text(playersArray[0].playerName).show();
    showNamesAndScores();
    $("form").hide();
    $(".game").show();
  });

  $("#diceRoll").click(function(event) {
    event.preventDefault();
    $("#result").show();
    var randomRoll = (1 + Math.floor(Math.random() * 6));
    $("#result").text(randomRoll);
    if (randomRoll >= 2) {
      turnRollArray.push(randomRoll);
      $("#totaltotal").text(turnRollArray.sum());
    } else {
      rollOneChangePlayers();
    }
  });

  // winner
  $("#hold").click(function(event) {
    changePlayers();
    if (playersArray[0].score >= 100) {
      alert(playersArray[0].playerName + "wins!!");
      document.location.reload(true);
    } else if (playersArray[1].score >= 100) {
      alert(playersArray[1].playerName + "wins!!")
      document.location.reload(true);
    }
  });

  // fxns
  function showNamesAndScores() {
    $("#player1Name").text(playersArray[0].playerName);
    $("#player2Name").text(playersArray[1].playerName);
    $("#player1TotalScore").text(playersArray[0].score);
    $("#player2TotalScore").text(playersArray[1].score);
  }


  function rollOneChangePlayers() {
    if ($("#player1Display").is(":visible")) {
      turnRollArray = [0];
      $("#totaltotal").text(turnRollArray);
      setTimeout(function() {
        alert("You rolled a 1. Sorry bruh!");
      }, 50);
      setTimeout(function() {
        $("#player2Display").text(playersArray[1].playerName).show();
      }, 100);
      $("#player1Display").hide();
      showNamesAndScores();
    } else if ($("#player2Display").is(":visible")) {
      turnRollArray = [0];
      $("#totaltotal").text(turnRollArray);
      setTimeout(function() {
        alert("You rolled a 1. Sorry bruh!");
      }, 50);
      setTimeout(function() {
        $("#player1Display").text(playersArray[0].playerName).show();
      }, 100);
      $("#player2Display").hide();
      showNamesAndScores();
    }
  }

  function changePlayers() {
    if ($("#player1Display").is(":visible")) {
      playersArray[0].score = (playersArray[0].score += turnRollArray.sum());
      alert("Congrats bruh!" + " You got " + turnRollArray.sum() + " points!");
      turnRollArray = [0];
      $("#totaltotal").text(turnRollArray)
      $("#player1Display").hide();
      $("#player2Display").text(playersArray[1].playerName).show();
      console.log(playersArray[0].score);
      showNamesAndScores();
    } else {
      alert("Congrats bruh!" + " You got " + turnRollArray.sum() + " points!");
      playersArray[1].score = (playersArray[1].score += turnRollArray.sum());
      turnRollArray = [0];
      $("#totaltotal").text(turnRollArray)
      $("#player2Display").hide();
      $("#player1Display").text(playersArray[0].playerName).show();
      console.log(playersArray[1].score);
      showNamesAndScores();
    }
  }
});
