function FinalBoss(x, y) { 
  this.x = x;
  this.y = y;
  this.size = scl(70);
  this.lives = 10;
  this.bulletSpeed = 10;
  this.bulletSize = 20;
  this.xspeed = scl(2);
  this.yspeed = scl(2);
  this.color = color(33, 84, 121);
  
  this.display = function() {
  	var player = levels[currentLevel].player;
    var playerPos = createVector(player.x, player.y);
    playerPos.sub(createVector(this.x, this.y));
    playerPos.setMag(this.size);
    
    strokeWeight(2);
    
  	fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    
    line(this.x, this.y, playerPos.x + this.x, playerPos.y + this.y);
    
    fill(0, 0, 0, 100);
    var w = scl(100);
    var h = scl(10);
    rect(this.x, this.y - this.size/1.5, w, h);
    fill(255, 0, 0);
    for (var i = 0; i < this.lives; i++) {
      rect(this.x - w / 2 + w/20 + i * w/10, this.y - this.size / 1.5, w/10, h);
    }
  }
  
  this.update = function() {
    if (this.collides(this.x + this.xspeed, this.y))
      this.xspeed *= -1;
    if (this.collides(this.x, this.y + this.yspeed))
      this.yspeed *= -1;
    
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    var chance = floor(createVector(this.x, this.y).dist(createVector(levels[currentLevel].player.x, levels[currentLevel].player.y)));
    chance -= 200;
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
   var player = levels[currentLevel].player;
   var playerPos = createVector(player.x, player.y);
   playerPos.sub(createVector(this.x, this.y));
   playerPos.setMag(this.size);
   
   var bullets = levels[currentLevel].bullets;
   var bullet = new Bullet(playerPos.x + this.x, playerPos.y + this.y, this.bulletSize, this.bulletSpeed, false, playerPos.heading());
   if (!bullet.collides(bullet.x, bullet.y)) {
     bullets.push(bullet);
     gun.play();
   }
 }
 
  

}