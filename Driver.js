var direction = [];

var levels = [];
var borders = [];

var currentLevel;
var gamemode;
var state;

var font;

var reset;

var mousePos;
 
var borderSize;

var once;
var countDown;

var lives;

var explode, pop, upgrade, gun, main;

var pause;

var music;

function preload() {
  font = loadFont("armalite_rifle.ttf");
 
  explode = loadSound("explode.mp3");
  pop = loadSound("pop.mp3");
  upgrade = loadSound("powerup.mp3");
  gun = loadSound("gun.wav");
  main = loadSound("main.mp3");


}

function setup() {
  createCanvas(800,600);
  
  if (!main.isPlaying())
    main.loop();
  
  pause = false;
  showCutscene = true;
  music = true;
  
  currentLevel = 0;
  once = false;
  mousePos = createVector(mouseX, mouseY);  
  
  borderSize = scl(50);
  borders.push(new Obstacle(width/2, borderSize/2, width, borderSize));
  borders.push(new Obstacle(width/2, height - borderSize/2, width, borderSize));
  borders.push(new Obstacle(borderSize/2, height/2, borderSize, height));
  borders.push(new Obstacle(width - borderSize/2, height/2, borderSize, height));
  
  gamemode = -1;
  state = 0;
  reset = false;
 
  textFont(font);
  textAlign(CENTER);
  
  rectMode(CENTER);
}
 
function draw() {
  //Title Screen
  if (state == 0)
  	displayTitleScreen();
  
  //Game Screen
  if (state == 1) {
    //Campaign
    if (!pause) {
        levels[currentLevel].display();
        levels[currentLevel].update();
      
        //Next Level
        if (levels[currentLevel].enemies.length == 0 && currentLevel < levels.length - 1) {
          currentLevel++;
          state = -1;
        } else if (levels[currentLevel].enemies.length == 0)
          state = -1;
      
        //Death
        if (lives == 0)
          state = -1;
    } else {
      fill(255, 255, 255, 15);
      rect(width/2 + scl(20), height/2, scl(25), scl(75));
      rect(width/2 - scl(20), height/2, scl(25), scl(75));
    }
  }
  
  //Death Screen
  if (state == 2)
    displayDeathScreen();
  
  if (state == 3)
    displayWinScreen();
  
  //Fade
  if (state == -1)
    displayFade();
  
  //Level countdown
  if (state == -2)
    displayCountDown();
}

function displayWinScreen() {
 background(107, 89, 42);

 for (var i = 0; i < borders.length; i++)
    borders[i].display();

  fill(0);
  textAlign(CENTER);
  textSize(scl(160));
  strokeWeight(0);

  text("Win!", width/2, height/2);

}

function displayDeathScreen() {
  background(107, 89, 42);

  for (var i = 0; i < borders.length; i++)
    borders[i].display();

  fill(0);
  textAlign(CENTER);
  strokeWeight(0);

  textSize(scl(160));
  text("Game", width/2, height/3.5);
  text("Over", width/2, height/2);

  textSize(scl(80));
  
  if (gamemode == 0)
    text("Level " + (currentLevel + 1), width/2, (int) (height*5/6));
  else
    text("Wave " + (currentLevel + 1), width/2, (int) (height*5/6));

}

function displayFade() {
  var c = get(scl(20), scl(20));
    if (c[0] > 12 && c[1] > 12 && c[2] > 12) {
      fill(0,0,0,10);
      rect(width/2, height/2, width, height);
    } else {
      if (lives == 0 && !reset)
        state = 2;
      else if (currentLevel == levels.length - 1 && levels[currentLevel].enemies.length == 0 && !reset)
        state = 3;
  	  else if (reset) {
        levels = [];
        setup();
      }
      else
        state = -2;
    }  
}

function displayCountDown() {
  if (!once) { 
    countDown = millis();
    once = true;
  }
  levels[currentLevel].display();
    
  fill(255, 0, 0, 100);
  rect(width/2, height/2 - scl(35), width, scl(100));
    
  if (millis() - countDown >= 3000) {
    state = 1;
    once = false;
  }
   	
  fill(0);
  textSize(scl(100));
  strokeWeight(0);
  textAlign(CENTER);
  if (gamemode == 0)
    text("Level " + (currentLevel + 1), width/2, height/2);
  else
    text("Wave " + (currentLevel + 1), width/2, height/2);

}

function createLevels() {
  lives = 3;
  
  //Level 1
  var o1 = [], e1 = [];
  o1 = borders.slice();
  o1.push(new Obstacle(width/2, height/2 - scl(60), scl(300), scl(40)));
  e1.push(new Enemy(scl(200), scl(100), scl(40), scl(2), 1)); //Size = 40, Speed = 2, Type = 1
  var p1 = new Player(width/2, height * 3/4);
  levels.push(new Level(o1, e1, p1));
  
 //Level 2
  var o2 = [], e2 = [];
  o2 = borders.slice();
  o2.push(new Obstacle(width/2, (int)(height/3.5), scl(300), scl(90)));
  o2.push(new Obstacle(width/2, height * 2 / 3, scl(20), scl(200)));
  e2.push(new Enemy(scl(690), scl(80), scl(40), scl(2), 1)); //Size = 40, Speed = 3, Type = 1
  var p2 = new Player(scl(100), height - scl(100));
  levels.push(new Level(o2, e2, p2));
  
   //Level 3
  var o3 = [], e3 = [];
  o3 = borders.slice();
  o3.push(new Obstacle(width/2, scl(200), scl(500), scl(80)));
  o3.push(new Obstacle(width/2, height - scl(220), scl(100), scl(100)));
  o3.push(new Obstacle(width/4, height - scl(220), scl(50), scl(150)));
  o3.push(new Obstacle(width*3/4, height - scl(220), scl(50), scl(150)));
  e3.push(new Enemy(scl(80), scl(80), scl(40), scl(3), 1));
  e3.push(new Enemy(width - scl(80), scl(80),  scl(40), scl(2), 1));
  var p3 = new Player(width/2, height - scl(80));
  levels.push(new Level(o3, e3, p3));

  //Level 4
  var o4 = [], e4 = [];
  o4 = borders.slice();
  o4.push(new Obstacle(scl(300), scl(160), scl(300), scl(30)));
  o4.push(new Obstacle(width - scl(300), height - scl(160), scl(300), scl(30)));
  o4.push(new Obstacle(scl(165), height/2, scl(30), scl(307)));
  o4.push(new Obstacle(width - scl(165), height/2, scl(30), scl(307)));
  e4.push(new Enemy(width - scl(80), scl(80), scl(40), scl(3), 2));
  e4.push(new Enemy(scl(80), height - scl(80), scl(40), scl(3), 2));
  var p4 = new Player(width/2, height/2);
  levels.push(new Level(o4, e4, p4));
  
  var o5 = [], e5 = [];
  o5 = borders.slice();
  o5.push(new Obstacle(width/2, height - scl(130), width - scl(250), scl(50)));
  o5.push(new Obstacle(width/2, height/2+ scl(30), scl(140), scl(50)));
  o5.push(new Obstacle(width/5, height/2 - scl(80), scl(140), scl(50)));
  o5.push(new Obstacle(width - width/5, height/2 - scl(80), scl(140), scl(50)));
  e5.push(new Enemy(scl(80), height - scl(80), scl(40), scl(3), 2));
  e5.push(new Enemy(width - scl(80), scl(80), scl(40), scl(2), 3));
  var p5 = new Player(width/2, height /2 - scl(30));
  levels.push(new Level(o5, e5, p5));

  var o6 = [], e6 = [];
  o6 = borders.slice();
  e6.push(new Enemy(width/2, height / 4, scl(40), scl(3), 2));
  e6.push(new Enemy(width/2, height - height /4, scl(40), scl(2), 1));
  e6.push(new Enemy(width/2, height/2, scl(40), scl(3), 2));
  var p6 = new Player(scl(80), height/2 + scl(40));
  levels.push(new Level(o6, e6, p6));

  var o7 = [], e7 = [];
  o7 = borders.slice();
  o7.push(new Obstacle(width/2, height - height /4, scl(45), scl(45)));
  e7.push(new FinalBoss(width/2, scl(200)));
  var p7 = new Player(width/2, height - height / 7);
  levels.push(new Level(o7, e7, p7));
}

function createWaves() {
  lives = 5;
  
  for (var i = 1; i < 100; i++) {
    var player = new Player(width/2, height/2);
    var o = [];
    o = borders.slice();
    var e = [];
    for (var j = 0; j < i; j++) {
      var enemy;
      do {
        enemy = new Enemy(random(borderSize + scl(20), width - borderSize - scl(20)), random(borderSize + scl(20), height - borderSize - scl(20)), scl(40), scl(3), 1);
      } while (abs(enemy.x - width/2) < scl(100) && abs(enemy.y - height/2) < scl(100));
      e.push(enemy);
    }
    levels.push(new Level(o, e, player));
  }

}

function keyPressed() {
  if (keyCode == UP_ARROW || key == 'W')
    direction[0] = true;
  if (keyCode == RIGHT_ARROW || key == 'D')
    direction[1] = true;
  if (keyCode == DOWN_ARROW || key == 'S')
    direction[2] = true;
  if (keyCode == LEFT_ARROW || key == 'A')
    direction[3] = true;
  if (key == ' ')
    pause = !pause;
  if (key == 'M')
    pauseMusic();
}

function pauseMusic() {
  if (music)
    main.pause();
  else
    main.loop();
  music = !music;

}

function keyReleased() {
  if (keyCode == UP_ARROW || key == 'W')
    direction[0] = false;
  if (keyCode == RIGHT_ARROW || key == 'D')
    direction[1] = false;
  if (keyCode == DOWN_ARROW || key == 'S')
    direction[2] = false;
  if (keyCode == LEFT_ARROW || key == 'A')
    direction[3] = false;
}

function mousePressed() {
  if (state == 0) {
    if (mouseX > width/2 + scl(25) && mouseX < width/2 + scl(175) + scl(150) && mouseY < height *3/4 + scl(10) && mouseY > height * 3/4 - scl(50)) {
      fill(0,0,0,200);
      rect(width/2 + scl(175), height *3/4 - scl(20), scl(300), scl(60));
      gamemode = 0;
      createLevels();
      state = -1;
    } else if (mouseX > width/2 - scl(175) - scl(150) && mouseX < width/2 - scl(25) && mouseY < height *3/4 + scl(10) && mouseY > height * 3/4 - scl(50)) {
      fill(0,0,0,200);
      rect(width/2 - scl(175), height *3/4 - scl(20), scl(300), scl(60));
      gamemode = 1;
      createWaves();
      state = -1;
    }
    
  }
  
  if (state == 1)
    levels[currentLevel].player.addBullet();
  
  if (state == 2 || state == 3) {
  	reset = true;
    state = -1;
  }
    
}

function displayBorders() {
  for (var i = 0; i < borders.length; i++)
	borders[i].display(); 
}

function scl(x) {
  return x *= (width/800);
}

function displayTitleScreen() {
  background(107, 89, 42);
    
  displayBorders();
    
  strokeWeight(0);
  fill(0);
  textSize(scl(160));
  text("Tiny", width/2, height/3.5);
  text("Tanks", width/2, height/2);
   	
  fill(0,0,0,100); 
  strokeWeight(3);
  rect(width/2 - scl(175), height *3/4 - scl(20), scl(300), scl(60));
  rect(width/2 + scl(175), height *3/4 - scl(20), scl(300), scl(60));
    
  strokeWeight(0);
  fill(0);
  textSize(scl(60))
  text("Survival", width/2 - scl(175),(height*3/4));
  textSize(scl(60));
  text("Campaign", width/2 + scl(175), (height*3/4));
    
  textSize(scl(50));
  text("Ben Givertz Game Co.", width/2, height - scl(8));
  strokeWeight(3);

}

//Googled Algorithm
function collideRectCircle(rx, ry, rw, rh, cx, cy, cr) {
  rx -= rw/2;
  ry -= rh/2;

  var distX = abs(cx - rx-rw/2);
  var distY = abs(cy - ry-rh/2);

  if (distX > (rw/2 + cr)) { return false; }
  if (distY > (rh/2 + cr)) { return false; }

  if (distX <= (rw/2)) { return true; } 
  if (distY <= (rh/2)) { return true; }

  var dx=distX-rw/2;
  var dy=distY-rh/2;
  return (dx*dx+dy*dy<=(cr*cr));
}

function collideCircleCircle(x1, y1, r1, x2, y2, r2) {
 var c1 = createVector(x1, y1);
 var c2 = createVector(x2, y2);
 var dis = c1.sub(c2);
 if (dis.mag() < r1 + r2)
    return true;
 return false;
}

//Googled Algorithm 
function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  x1 -= w1/2;
  y1 -= h1/2;
  x2 -= w2/2;
  y2 -= h2/2;
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2;
}