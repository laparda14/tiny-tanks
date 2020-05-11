function Player(x, y) {
  this.x = x;
  this.y = y;
  this.size = scl(40);
  this.speed = scl(3);
  this.tripleShot = false;
  this.shrink = false;
  
  this.bulletSize = scl(10);
  this.bulletSpeed = scl(5);
  
  this.display = function() {
    fill(46, 89, 47);
    strokeWeight(2);
  	rect(this.x, this.y, this.size, this.size);
    
    mousePos.sub(createVector(this.x, this.y));
    mousePos.setMag(this.size);
	
    stroke(2);
    line(this.x, this.y, mousePos.x + this.x, mousePos.y + this.y);
    
    if (this.tripleShot) {
      var up = mousePos.copy();
      var down = mousePos.copy();
      
      up.rotate(.5);
      down.rotate(-.5);

      line(this.x, this.y, up.x + this.x, up.y + this.y);
      line(this.x, this.y, down.x + this.x, down.y + this.y);
    }
  }
  
  this.update = function() {
    var count = 0;
    for (var i = 0; i < direction.length; i++) {
      if (direction[i])
        count++;
    }
    var speedScl;
    if (count > 1)
      speedScl = this.speed / sqrt(2);
    else
      speedScl = this.speed;
    
    if (this.shrink) {
      if (this.size > scl(20))
        this.size -= scl(1);
    } else {
      this.size = scl(40);
    }
    
    if (direction[0] && !this.collides(this.x, this.y-speedScl))
     this.y-=speedScl;
    if (direction[1] && !this.collides(this.x + speedScl, this.y))
     this.x+=speedScl;
    if (direction[2] && !this.collides(this.x, this.y + speedScl))
      this.y+=speedScl;
    if (direction[3] && !this.collides(this.x - speedScl, this.y))
      this.x-=speedScl;
   
    this.x = constrain(this.x, borderSize + this.size/2, width - this.size/2 - borderSize);
    this.y = constrain(this.y, borderSize + this.size/2, height - this.size/2 - borderSize);
  }
  
  this.addBullet = function() {
    var count = 0;
    var bullets = levels[currentLevel].bullets;
    
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i].fromPlayer)
        count++;
    }
    if (count < 4 || this.tripleShot) {
      var m = mousePos.copy();
      m.sub(createVector(this.x, this.y));
      m.setMag(this.size);
      var bullet = new Bullet(m.x + this.x, m.y + this.y, this.bulletSize, this.bulletSpeed, true, m.heading());
      if (!bullet.collides(bullet.x, bullet.y)) {
        bullets.push(bullet);
        gun.play();
      }
     
      if (this.tripleShot) {
        var up = m.copy();
        var down = m.copy();
        up.rotate(.5);
        down.rotate(-.5);
        bullets.push(new Bullet(up.x + this.x, up.y + this.y, this.bulletSize, this.bulletSpeed, true, up.heading()));
        bullets.push(new Bullet(down.x + this.x, down.y + this.y, this.bulletSize, this.bulletSpeed, true, down.heading()));
        gun.play();
        gun.play();
      }      
    }
  }
  
  this.hit = function() {
    explode.play();
    fill (255, 0, 0);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
  }

  
  this.collides = function(x, y) {
    var obstacles = levels[currentLevel].obstacles;
      for (var i = 0; i < obstacles.length; i++) {
        if (collideRectRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h, x, y, this.size, this.size))
          return true;      
      }
    return false;
   }

}