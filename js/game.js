
var img0, img1, img2, img3, img4, bg2, bg4;
var font;
var lvl;
var time;

function preload() {
  img0 = loadImage("/Desktop/Game/pacman.png");  
  img1 = loadImage("/Desktop/Game/gost.png");
  img2 = loadImage("/Desktop/Game/gost2.png"); 
  img3 = loadImage("/Desktop/Game/cherry.png"); 
  img4 = loadImage("/Desktop/Game/orange.png");
  bg2 = loadImage("/Desktop/Game/bg2.png");
  bg4 = loadImage("/Desktop/Game/bg4.jpg");
}

function setup() {
	
  createCanvas(800, 600);
  smooth(); 
  frameRate(100);


}

function draw() {
	var xx, yy;
var x = random(20, 580);
var y = -40;
var x2 = random(20, 580);
var y2 = -140;
var x3 = random(20, 580);
var y3 = -240;
var x4 = random(20, 580);
var y4 = -240;
var x5 = random(20, 580);
var y5 = -60;
var x6 = random(20, 580);
var y6 = -190;
var x7 = random(20, 580);
var y7 = -280;
var x8 = random(20, 580);
var y8 = -80;
var X = random(20, 580);
var Xy = -1000;
var fx = random(20, 580);
var fy = random(-6000, -10000);
var f = 0;
var fs = 0;
var kx = width/2;
var ky = 500;
var kspeed = 10;
var speed = 1;
var a = 0.001;
var povar = 0;

	
  if(lvl==0) { 
    game1();
  }
 
  if(lvl==3) {
    gameover(); 
  }
}

function game1(){
  background(bg2);
  if (f == 1){
  stroke(255);
  fill(255);
  }
  image(img0, kx, ky, 80, 80);
  image(img3, x, y, 70, 70);
  image(img1, x2, y2, 70, 70);
  image(img2, x3, y3, 70, 70);
  image(img4, x4, y4, 70, 70);
  image(img3, x5, y5, 70, 70);
  image(img1, x6, y6, 70, 70);
  image(img2, x7, y7, 70, 70);
  image(img4, x8, y8, 70, 70);
  textSize(20);
  text(povar, 120, 60);

 
  if ((y >= ky-30) && (y <= ky + 30) && (kx-30 < x) && (x < kx+30)) {
    x = random(20, 580);
    y = -40;
    povar++;
  }
  if ((y2 >= ky-30) && (y2 <= ky + 30) && (kx-30 < x2) && (x2 < kx+30)) {
    x2 = random(20, 580);
    y2 = -280;
    lvl = 3;
  }
  if ((y3 >= ky-80) && (y3 <= ky + 30) && (kx-30 < x3) && (x3 < kx+30)) {
    x3 = random(20, 580);
    y3 = -140;
    lvl = 3;
  }
    if ((y4 >= ky-30) && (y4 <= ky + 30) && (kx-30 < x4) && (x4 < kx+30)) {
    x4 = random(20, 580);
    y4 = -40;
    povar++;
  }
   if ((y5 >= ky-30) && (y5 <= ky + 30) && (kx-30 < x5) && (x5 < kx+30)) {
    x5 = random(20, 580);
    y5 = -60;
    povar++;
  }
  if ((y6 >= ky-30) && (y6 <= ky + 30) && (kx-30 < x6) && (x6 < kx+30)) {
    x6 = random(20, 580);
    y6 = -140;
    lvl = 3;
  }

    if ((y8 >= ky-30) && (y8 <= ky + 30) && (kx-30 < x8) && (x8 < kx+30)) {
    x8 = random(20, 580);
    y8 = -240;
    povar++;
  }
  
  if (Xy > 600) {
    Xy = -1000;
  }
  if (f == 0) {
    ky = 600;
  }
  y += speed;
  y2 += speed;
  y3 += speed;
  y4 += speed;
  y5 += speed;
  y6 += speed;
  y7 += speed;
  y8 += speed;
  Xy += speed;
  fy += speed*2;
  speed += a;
  if (y > 600) {
    x = random(40, 550);
    y = -10;
  }
     if (y2 > 600) {
    x2 = random(40, 550);
    y2 = -40;
  }
       if (y3 > 600) {
    x3 = random(40, 550);
    y3 = -80;
  }
       if (y4 > 600) {
    x4 = random(40, 550);
    y4 = -100;
  }
  if (y5 > 600) {
    x5 = random(40, 550);
    y5 = -10;
  }
     if (y6 > 600) {
    x6 = random(40, 550);
    y6 = -40;
  }
       if (y7 > 600) {
    x7 = random(40, 550);
    y7 = -80;
  }
       if (y8 > 600) {
    x8 = random(40, 550);
    y8 = -100;
  }
   
  if (keyPressed && (key == CODED)) {
    if (keyCode == RIGHT) {
      kx += kspeed;
    }
    if (keyCode == LEFT) {
      kx -= kspeed;
    }
    if ((keyCode == UP) && (f == 1)) {
      ky -= kspeed;
    }
    if ((keyCode == DOWN) && (f == 1)) {
      ky += kspeed;
    }
  }
  if (kx < 0) {
    kx = 800;
  }
  if (kx > 800) {
    kx = 0;
  }
  if (ky < 40) {
    ky = 40;
  }
  if (ky > 410) {
    ky = 410;
  }
 
}

function gameover(){
    image(bg4, 0, 0);
    image(img1, touchX, touchY, 100, 100);
    
    if (mouseIsPressed) {
  if (lvl == 3) {
    lvl = 0;
    povar = 0;
    kspeed = 10;
    speed = 1;
  }
}
   
}  
  