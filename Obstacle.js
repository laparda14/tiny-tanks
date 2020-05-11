function Obstacle(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.display = function() {
    fill(178, 144, 57);
    strokeWeight(5);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }
}