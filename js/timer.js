/**
 * Timer object to manage the game time to complete the level.
 */
var Timer = function() {
  this.outOfTime = false;
  this.x = 395;
  this.y = 30;
};

/**
 * Inits the timer with a certain amount of time
 * depending on level passed by param.
 */
Timer.prototype.init = function(level) {
  var lvl = level || 1;
  this.timeLimit = Date.now() + 120000 / (lvl / 3);
};

/**
 * Renders the counter value to the canvas.
 */
Timer.prototype.render = function(ctx) {
  ctx.font = "30px sans";
  ctx.fillStyle = "black";
  ctx.fillText(this.counter, this.x, this.y);
};

/**
 * Updates the couter value based on current time.
 */
Timer.prototype.update = function() {
  if (this.timeLimit) {
    var now = Date.now();
    if (now < this.timeLimit) {
      var timeLeft = this.timeLimit - now;
      this.counter = this.getCounterFormatted(new Date(timeLeft));
    } else {
      this.counter = "You lose :(";
      this.outOfTime = true;
    }
  }
};

/**
 * Returns the time formated in MM:ss:mm format.
 */
Timer.prototype.getCounterFormatted = function(futureDate) {
  return (
    String(futureDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(futureDate.getSeconds()).padStart(2, "0") +
    ":" +
    String(futureDate.getMilliseconds())
      .slice(0, 2)
      .padStart(2, "0")
  );
};
