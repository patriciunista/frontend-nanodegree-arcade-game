/**
 * Check if the player collides with something in the screen.
 * @param {Object} object Object that player may collide.
 */
function checkCollision(object) {
  var cellX = 50.5;

  if (object.y === player.y) {
    // used for gems
    if (object.x === player.x) return true;

    // used to calculate collision with bugs
    if (player.x >= object.x - cellX && player.x <= object.x + cellX * 1.5) {
      return true;
    }
  }

  return false;
}

// Enemies our player must avoid
var Enemy = function(startX, startY) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.startX = startX;
  this.startY = startY;
  this.speedX = Math.random() * 100 + 50;
  this.x = startX;
  this.y = startY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speedX * dt;
  if (this.x > 505) {
    this.x = this.startX;
    this.speedX = Math.random() * 100 + 60;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.startX = 202; // center of columns
  this.startY = 83 * 5 + 41.5; // center of rows
  this.speedX = 101;
  this.speedY = 83;
  this.x = this.startX;
  this.y = this.startY;
};

Player.prototype.update = function() {
  // nothing for now
};

/**
 * Renders player's image at it's position.
 */
Player.prototype.render = render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Event that occurs every time user press an allowed key.
 * Updates the position of the player given a direction and
 * checks if is in the limit of the canvas to allow it.
 */
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case "left":
      if (this.x > this.speedX / 2) {
        this.x -= this.speedX;
      }
      break;
    case "up":
      if (this.y > 0) {
        this.y -= this.speedY;
      }
      break;
    case "right":
      if (this.x + this.speedX < 505 - this.speedX / 2) {
        this.x += this.speedX;
      }
      break;
    case "down":
      if (this.y + this.speedY <= this.startY) {
        this.y += this.speedY;
      }
      break;
    default:
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(-101, 41.5),
  new Enemy(-101, 83 + 41.5),
  new Enemy(-101, 83 * 2 + 41.5),
  new Enemy(-101, 83 * 3 + 41.5),
  new Enemy(-101, 83 * 4 + 41.5)
];
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
