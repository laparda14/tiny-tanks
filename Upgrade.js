function Upgrade(x, y, type) {

  this.x = x;
  this.y = y;
  this.type = type;
  this.size = scl(30);
  this.player = levels[currentLevel].player;
  this.initSpeed = this.player.speed;
  this.timeConsumed = millis();
  
  this.isConsumed = false;
  
  this.color = function() {
  	switch (this.type) {
      case 1:
        return color(216, 23, 23, 180);
        break;
      case 2:
        return color(38, 181, 242, 180);
        break;
      case 3:
        return color(47, 188, 38, 180);
        break;
      case 4:
        return color(203, 47, 188, 180);
        break;
      case 5:
        return color(222, 110, 36, 180);
        break; 
    }
  
  }
  
  this.display = function() {
    fill(this.color());
    strokeWeight(3);
    if (!this.isConsumed) {
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      ellipse(width - scl(80), height- scl(25), this.size, this.size);
    }
  
  }
  
  this.reset = function() {
    switch (this.type) {
      case 2:
        this.player.speed = this.initSpeed;	
        break;
      case 3:
        this.player.bulletSize = scl(10);
        this.player.bulletSpeed = scl(5);
        break;
      case 4:
        this.player.shrink = false;
        break;
      case 5:
        this.player.tripleShot = false;
        break;
    }
  }
  
  this.effect = function() {
    switch (this.type) {
      case 1:
        lives++;
        break;
      case 2:
        this.player.speed = this.initSpeed * 1.8;
        break;
      case 3:
        this.player.bulletSpeed = scl(7);
        this.player.bulletSize = scl(17);
    	break;
      case 4:
        this.player.shrink = true;
        break;
      case 5:
        this.player.tripleShot = true;
        break;
    }
  }

  this.collides = function() {
    var obstacles = levels[currentLevel].obstacles;
  	for (var i = 0; i < obstacles.length; i++) {
      if (collideRectCircle(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h, this.x, this.y, this.size))
		return true;      
      }
    return false;
  }
  
  this.collidesPlayer = function() {
    var player = levels[currentLevel].player;
    return (collideRectCircle(player.x, player.y, player.size, player.size, this.x, this.y, this.size));  
  }

}