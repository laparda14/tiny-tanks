function Bullet(x, y, size, speed, fromPlayer, theta) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.fromPlayer = fromPlayer;
  
  if (theta < 0)
    theta = abs(theta);
  else
    theta = 2 * PI - theta;
  
  this.xspeed = cos(theta) * speed;
  this.yspeed = -1 * sin(theta) * speed;
  
  this.timeCreated = millis();
  this.isActive = true;
  
  this.display = function() {
      if (this.fromPlayer)
        fill(70);
      else
        fill(147, 31, 31);
      strokeWeight(2);
      ellipse(this.x, this.y, this.size, this.size);
  }
  
  this.update = function() {
  	
    if (this.collides(this.x + this.xspeed, this.y))
      this.xspeed *= -1;
    if (this.collides(this.x, this.y + this.yspeed))
      this.yspeed *= -1;
    
    this.x+=this.xspeed;
    this.y+=this.yspeed;
  
    if (millis() - this.timeCreated >= 3000) {
      this.isActive = false;
      this.deactivate();
    }
    
    this.collideEnemy();
    this.collidePlayer();
    this.collideBullet();
  }
  
  this.collides = function(x, y) {
    var obstacles = levels[currentLevel].obstacles;
  	for (var i = 0; i < obstacles.length; i++) {
      if (collideRectCircle(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h, x, y, this.size))
		return true;      
      }
    return false;
  }
  
  this.collidePlayer = function() {
    var player = levels[currentLevel].player;
    if (collideRectCircle(player.x, player.y, player.size, player.size, this.x, this.y, this.size)) {
      this.deactivate();
      player.hit();
      lives--;
    }
  
  }
  
  this.collideBullet = function() {
    var bullets = levels[currentLevel].bullets;
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i] != this) {
       if (collideCircleCircle(bullets[i].x, bullets[i].y, bullets[i].size, this.x, this.y, this.size)) {
         this.deactivate();
         bullets[i].deactivate();
       }
      }
    
    }
  
  }
  
  this.deactivate = function() {
    this.isActive = false;
    pop.play();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size + scl(10), this.size + scl(10));
  }
  
  this.diversify = function(a) {
    var a = random(a - scl(30), a + scl(30));
    a = constrain(a, borderSize, width-borderSize);
  	return a;
  }
  
  this.collideEnemy = function() {
  	var enemies = levels[currentLevel].enemies;
    if (this.fromPlayer) {
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof FinalBoss && collideRectCircle(enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size, this.x, this.y, this.size)) {
          explode.play();
          if (enemies[i].lives == 1) {
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(2), 1));
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(2), 1));
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(3), 2));
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(3), 2));
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(2), 3));
            enemies.push(new Enemy(this.diversify(enemies[i].x), this.diversify(enemies[i].y), scl(40), scl(2), 3));
            enemies.splice(i,1);
          	fill (255, 0, 0);
            ellipse(this.x, this.y, this.size * 2, this.size * 2);
          } else {
          	enemies[i].lives--;
          }
          this.deactivate();
        } else if (collideRectCircle(enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size, this.x, this.y, this.size)) {
          this.deactivate();
          enemies[i].deactivate();
          enemies.splice(i, 1);    
        }                             
      }
    }
  }
}