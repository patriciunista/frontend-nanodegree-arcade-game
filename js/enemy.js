// Enemies our player must avoid
var Enemy = function(startX, startY) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.startX = startX;
  this.startY = startY;
  this.speedX = getRandomSpeed(level);
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
    this.speedX = getRandomSpeed(level);
  }

  if (player.checkCollision(this)) {
    player.resetPosition();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
