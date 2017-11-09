
//MAIN
int xx, yy;
float x = random(20, 580);
float y = -40;
float x2 = random(20, 580);
float y2 = -140;
float x3 = random(20, 580);
float y3 = -240;
float x4 = random(20, 580);
float y4 = -240;
float x5 = random(20, 580);
float y5 = -60;
float x6 = random(20, 580);
float y6 = -190;
float x7 = random(20, 580);
float y7 = -280;
float x8 = random(20, 580);
float y8 = -80;
float X = random(20, 580);
float Xy = -1000;
float fx = random(20, 580);
float fy = random(-6000, -10000);
int f = 0;
float fs = 0;
float kx = width/2;
float ky = 500;
float kspeed = 10;
float speed = 1;
float a = 0.001;
int point = 0;
PImage img0, img1, img2, img3, img4, bg2, bg4;
PFont font;
int lvl;
long time;


void setup() {
  size(800, 600);
  smooth(); 
  frameRate(100);
  img0 = loadImage("pacman.png");  
  img1 = loadImage("gost.png");
  img2 = loadImage("gost2.png"); 
  img3 = loadImage("cherry.png"); 
  img4 = loadImage("orange.png");
  bg2 = loadImage("bg2.png");
  bg4 = loadImage("bg4.jpg");

}

void draw() {
  if(lvl==0) { 
    game1();
  }
 
  if(lvl==3) {
    gameover(); 
  }
}

void game1(){
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
  text(point, 120, 60);

 
  if ((y >= ky-30) && (y <= ky + 30) && (kx-30 < x) && (x < kx+30)) {
    x = random(20, 580);
    y = -40;
    point++;
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
    point++;
  }
   if ((y5 >= ky-30) && (y5 <= ky + 30) && (kx-30 < x5) && (x5 < kx+30)) {
    x5 = random(20, 580);
    y5 = -60;
    point++;
  }
  if ((y6 >= ky-30) && (y6 <= ky + 30) && (kx-30 < x6) && (x6 < kx+30)) {
    x6 = random(20, 580);
    y6 = -140;
    lvl = 3;
  }

    if ((y8 >= ky-30) && (y8 <= ky + 30) && (kx-30 < x8) && (x8 < kx+30)) {
    x8 = random(20, 580);
    y8 = -240;
    point++;
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

void gameover(){
    image(bg4, 0, 0);
    image(img1, mouseX, mouseY, 100, 100);
    
    if (mousePressed) {
  if (lvl == 3) {
    lvl = 0;
    point = 0;
    kspeed = 10;
    speed = 1;
  }
}
   
}  
  