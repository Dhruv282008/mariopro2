var mario, mario_image;
var ground;
var pillar_image;
var forest, forest_image;
var PillarGroup;
var WAIT = 2;
var enemy,enemy_image,EnemyGroup;
var PLAY = 1;
var gameState = PLAY;
var END = 0;
var mario_standing;
var life,lifetime1,lifetime2,lifetime3;
var lifetime1_image,lifetime2_image,lifetime3_image;
var powerup,powerup_image;
var CoinGroup,coin_image,coinsound;
var bulletState = "rest"
function preload(){
  mario_image = loadAnimation("m.png","mario2.png");
  forest_image = loadImage("forest.png");
  pillar_image = loadImage("pillar_mario.png");
  //pillar1.visible = false;
  enemy_image = loadImage("corona.png")
  mario_standing = loadAnimation("mariostanding.png");
  lifetime1_image = loadImage("life.png");
  lifetime2_image = loadImage("life.png");
  lifetime3_image = loadImage("life.png");
  powerup_image = loadImage("powerup.png");
  coin_image = loadImage("coin.png");
  coinsound = loadSound("coin2.mp3")
}
function setup() {
  createCanvas(800,400);
  forest = createSprite(400,150,1500,1500);
  forest.addImage("image",forest_image);
  forest.scale=1.6
 //enemies = createSprite(400, 200, 50, 50);
  mario = createSprite(290,300,100,50);
  mario.addAnimation("animation",mario_image);
  mario.scale = 0.03;
  ground = createSprite(400,360,800,10);
  ground.visible = false;
  //pillar = createSprite(290,250,70,10);
  //pillar1 = createSprite(900,320,70,10);
  PillarGroup = createGroup();
  EnemyGroup = createGroup();
  mario.addAnimation("standing",mario_standing);
  life = 9;
  lifetime1 = createSprite(645,50,20,20);
  lifetime1.addImage("life1",lifetime1_image)
  lifetime2 = createSprite(690,50,20,20);
  lifetime2.addImage("life2",lifetime2_image)
  lifetime3 = createSprite(735,50,20,20);
  lifetime3.addImage("life3",lifetime3_image)
  powerup = createSprite(100,340,20,20);
  powerup.visible = false;
  powerup.addImage("fire",powerup_image);
  CoinGroup = createGroup();
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
}

function draw() {
  background(255,255,255);  
  drawSprites();
 if(gameState === PLAY){
 mario.collide(ground);
 if(keyDown(UP_ARROW)){
    mario.velocityY = -5;
    mario.addAnimation("animation",mario_image);
   
 }
 if((touches.length > 0 || keyDown("UP_ARROW")) && mario.y  >= height-120) {
  mario.velocityY = -10;
   touches = [];
}
powerup.scale = 0.5;
 //if(keyDown(RIGHT_ARROW)){
   forest.velocityX = -5;
 //}
if(keyWentUp(RIGHT_ARROW)){
  forest.velocityX = 0;
  
}

if (forest.x < 0){
  forest.x = forest.width/2;
}
 mario.velocityY = mario.velocityY +0.8;
 mario.x = 100;
 if(bulletState === "rest"){
 powerup.y = mario.y;
 }
  spawnPillars();
 mario.collide(PillarGroup);
 //forest.scale = 1.5;
 spawnEnemies();
 //.log(life);console
}
//console.log(powerup.y);
if(mario.isTouching(EnemyGroup)){
    gameState = WAIT;
  }
if(gameState === WAIT){
  life = life - 1;
  gameState = PLAY;
}


if(mario.isTouching(EnemyGroup)&&life === 0){
  gameState = END;
  lifetime3.destroy();
}
if(keyDown('space')){
  powerup.velocityX = 5;
  powerup.visible = true;
  bulletState = "released"
}
if(powerup.isTouching(EnemyGroup)||powerup.x>900){
  powerup.x = 100;
  powerup.velocityX = 0;
  console.log(powerup.isTouching(EnemyGroup));
  console.log(powerup.x);
  powerup.visible = false;
  EnemyGroup.destroyEach();
  bulletState = "rest"
  mario.velocityX = 0
  
}
if(mario.isTouching(CoinGroup)){
  CoinGroup.destroyEach();
  coinsound.play()
}
spawnCoins();
if(life === 6){
  lifetime1.destroy();
}
if(life === 3){
  lifetime2.destroy();
 
}
console.log(life)
if(gameState === END){
    forest.velocityX = 0;
    EnemyGroup.destroyEach(); 
    mario.collide(ground);
    mario.changeAnimation("standing",mario_standing);
    //mario.scale = 1.0;
    PillarGroup.setVelocityXEach(0);
    mario.velocityY = 0;
    CoinGroup.setVelocityXEach(0)
  }
}
function spawnPillars(){
  if (World.frameCount % 275 === 0) {
    var pillar1 = createSprite(800,320,70,10);
    pillar1.addImage("pillars",pillar_image);
    pillar1.y = random(200,230);
    pillar1.scale = 0.3;
    pillar1.velocityX = -3;
    pillar1.lifetime = -1;
    mario.bounceOff(pillar1);
    pillar1.depth = mario.depth;
    mario.depth = mario.depth + 1;
    PillarGroup.add(pillar1);
}
}

function spawnEnemies(){
  if(World.frameCount % 80 === 0){
  var enemy = createSprite(800,345,20,20);
  enemy.addImage("enemy",enemy_image);
  enemy.scale = 0.04;
  enemy.velocityX = -7;
  EnemyGroup.add(enemy);
  enemy.debug = true;
  }
}
function spawnCoins(){
  if(World.frameCount % 315 === 0){
  var coin = createSprite(800,200,20,20);
  coin.addImage("coin",coin_image);
  coin.scale = 0.01;
  coin.velocityX = -4;
  CoinGroup.add(coin);
  }
}