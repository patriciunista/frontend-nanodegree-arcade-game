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
  this.collided = false;
  this.lives = 3;
};

Player.prototype.update = function() {
  // nothing for now
};

/**
 * Check if the player collides with something in the screen.
 * @param {Object} object Object that player may collide.
 */
Player.prototype.checkCollision = function(object) {
  var cellX = 50.5;

  if (object.y === this.y) {
    // used for gems or rocks
    if (object.x === this.x) return true;

    // used to calculate collision with bugs
    if (this.x >= object.x - cellX && this.x <= object.x + cellX * 1.5) {
      this.collided = true;
      this.lives--;
      return true;
    }
  }

  return false;
};

/**
 * Resets the player position to it's initial.
 */
Player.prototype.resetPosition = function() {
  this.x = this.startX;
  this.y = this.startY;
};

/**
 * Renders player's image at it's position.
 */
Player.prototype.render = function() {
  // draw player
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Event that occurs every time user press an allowed key.
 * Updates the position of the player given a direction and
 * checks if is in the limit of the canvas to allow it.
 */
Player.prototype.handleInput = function(direction) {
  if (!this.lives) return;
  switch (direction) {
    case "left":
      if (this.x > this.speedX / 2) {
        this.x -= this.speedX;
      }
      break;
    case "up":
      if (this.y > 0) {
        // in case of game won, don't let user walk on water;
        if (this.y - this.speedY < 0 && level > 10) return;

        this.y -= this.speedY;
        if (this.y < 0) {
          level += 1;
          this.collided = true;
          this.resetPosition();
        }
      }
      break;
    case "right":
      if (this.x + this.speedX < 505 - this.speedX / 2) {
        this.x += this.speedX;
      }
      break;
    case "down":
      // prevent user from returning at
      // start point outside the blocks
      if (this.y + this.speedY <= this.startY - 50.5) {
        this.y += this.speedY;
      }
      break;
    default:
      break;
  }
};
