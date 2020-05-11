function Enemy(x, y, size, speed, type) {
  
  this.x = x;
  this.y = y;
  this.type = type;
  this.size = size;
  
  if (floor(random(2)) == 0)
    speed *= -1;
 
  this.yspeed = speed;
  
  if (floor(random(2)) == 0)
    speed *= -1;
  
  this.xspeed = speed;
  
  this.color = function() {
  	switch(this.type){ 
      case 1:
        return color(147, 31, 31);
        break;
      case 2:
        return color(55, 108, 168);
        break;
      case 3:
        return color(164, 30, 185);
        break;
    }
  }

  this.display = function() {
    var player = levels[currentLevel].player;
    var playerPos = createVector(player.x, player.y);
    playerPos.sub(createVector(this.x, this.y));
    playerPos.setMag(this.size);
    
    strokeWeight(2);
    
  	fill(this.color());
    rect(this.x, this.y, this.size, this.size);
    
    line(this.x, this.y, playerPos.x + this.x, playerPos.y + this.y);
  }
  
  this.update = function() {
    if (this.collides(this.x + this.xspeed, this.y))
      this.xspeed *= -1;
    if (this.collides(this.x, this.y + this.yspeed))
      this.yspeed *= -1;
    
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    var chance = floor(createVector(this.x, this.y).dist(createVector(levels[currentLevel].player.x, levels[currentLevel].player.y)));
    chance -= 150;
    if (chance < 50)
      chance = 50;
    if (floor(random(chance)) == chance - 1)
      this.addBullet();
  }
  
 this.collides = function(x, y) {
   var obstacles = levels[currentLevel].obstacles;
  	for (var i = 0; i < obstacles.length; i++) {
      if (collideRectRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h, x, y, this.size, this.size))
		return true;      
      }
    return false;
  }
 
 this.addBullet = function() {
   var bulletSpeed, bulletSize;
   switch (this.type) {
     case 1:
       bulletSpeed = scl(6);
       bulletSize = scl(10);
       break;
     case 2:
       bulletSpeed = scl(10);
       bulletSize = scl(10);
       break;
     case 3:
       bulletSpeed = scl(6);
       bulletSize = scl(20);
       break;
   }
   
   var player = levels[currentLevel].player;
   var playerPos = createVector(player.x, player.y);
   playerPos.sub(createVector(this.x, this.y));
   playerPos.setMag(this.size);
   
   
   var bullets = levels[currentLevel].bullets;
   var bullet = new Bullet(playerPos.x + this.x, playerPos.y + this.y, bulletSize, bulletSpeed, false, playerPos.heading());
   if (!bullet.collides(bullet.x, bullet.y)) {
     bullets.push(bullet);
     gun.play();
   }
 
 }
 
 this.deactivate = function() {
   explode.play();
   fill (255, 0, 0);
   ellipse(this.x, this.y, this.size * 2, this.size * 2);
 }
}