function Level(obstacles, enemies, player) {
  
  this.obstacles = obstacles;
  this.enemies = enemies;
  this.player = player;
  this.bullets = [];
  this.upgrades = [];
  
  this.display = function() {
    background(107, 89, 42);
  
    for (var i = 0; i < this.obstacles.length; i++)
      this.obstacles[i].display();
    for (var i = 0; i < this.upgrades.length; i++)
      this.upgrades[i].display();
    for (var i = 0; i < this.enemies.length; i++)
      this.enemies[i].display();
    for (var i = 0; i < this.bullets.length; i++)
      this.bullets[i].display();
    
    this.player.display();
    
    this.displayCounters();
  
  }
  
  
  this.update = function() {
    //CREATE POWERUPS RANDOMLY
    var chance;
    if (gamemode == 1)
      chance = floor(random(10));
    else {
      if (currentLevel == levels.length - 1)
        chance = floor(random(100));
      else 
        chance = floor(random(500));
    }
    if (chance == 5 && this.upgrades.length == 0)
      this.upgrades.push(this.getUpgrade());

    for (var i = this.upgrades.length - 1; i >= 0; i--) {
      if (this.upgrades[i].collidesPlayer(this.player.x, this.player.y) && !this.upgrades[i].isConsumed) {
        upgrade.play();
        this.upgrades[i].isConsumed = true;
        this.upgrades[i].effect();
        this.upgrades[i].timeConsumed = millis();
      }
      if ((millis() - this.upgrades[i].timeConsumed >= 5000 || this.upgrades[i].type == 1) && this.upgrades[i].isConsumed) {
        this.upgrades[i].reset();
        this.upgrades.splice(i,1);
      }
    }
    
    for (var i = 0; i < this.enemies.length; i++)
      this.enemies[i].update();
 	for (var i = 0; i < this.bullets.length; i++)
      this.bullets[i].update();
    
    this.player.update();
    
    mousePos.set(mouseX,mouseY);
  
    for (var i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].isActive)
        this.bullets.splice(i,1);
  	}
  }
  
  this.getUpgrade = function() {
    var r =  floor(random(5));
    var p;
    do {
      p = new Upgrade(random(width), random(height), r + 1);
    } while (p.collides());
   return p;
  }
  
  this.displayCounters = function() {
	//Upgrade doc
    strokeWeight(3);
    fill(220, 242, 29, 100);
    rect(width - scl(80), height - scl(20), scl(55), scl(55));

    //DISPLAY LIFE/LEVEL COUNTERS
    textAlign(CENTER);
    textSize(scl(40));
    fill(0);
    strokeWeight(0);
    if (gamemode == 0)
      text("Level " + (currentLevel+1), width/2, scl(40));
    else
      text("Wave " + (currentLevel+1), width/2, scl(40));
    fill(255, 0, 0, 100);
    strokeWeight(3);
    rect(width/2, height- scl(20), scl(170), scl(55));
    fill(0);
    strokeWeight(0);
    text("Lives: " + lives, width/2, height - scl(12));  
    strokeWeight(3);
  
  }

}