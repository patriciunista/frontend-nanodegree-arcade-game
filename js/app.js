/**
 * Returns a random number given a threshold.
 * @param {Number} threshold
 */
function getRandomSpeed(threshold) {
  return Math.random() * (threshold * 25) + 50;
}

/**
 * Generates the number of enemies we want for a game.
 *
 * @param {Number} num Number of enemies to generate.
 */
function generateEnemies(num) {
  var numEnemies = num !== undefined && num <= 10 ? num : 10;
  var newEnemies = [];

  for (var i = 0; i < numEnemies; ++i) {
    newEnemies.push(new Enemy(-101, 83 * (i % 5) + 41.5));
  }
  return newEnemies;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = generateEnemies(level);
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Project Constants
var WIDTH = 505;
var HEIGHT = 606;
var level = 3;
