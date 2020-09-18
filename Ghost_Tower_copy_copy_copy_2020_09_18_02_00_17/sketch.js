var tower, towerImage;
var ghost, ghostImage, ghostJumping;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var PLAY = 1;
var END = 0;
var gameState;
var spookySound;

function preload() {
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  ghostJumping = loadImage("ghost-jumping.png");
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  spookySound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300, 600, 600);
  tower.addImage(towerImage);
  tower.velocityY = 6;
  ghost = createSprite(300, 200, 30, 30);
  ghost.addImage(ghostImage);
  ghost.scale = .4;
  gameState = PLAY;
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background("black");
  if (gameState === PLAY) {
    ghost.velocityY = ghost.velocityY + 0.8
    if (tower.y > 600) {
      tower.y = 300;
    }
    spawnDoor();
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -10;
      ghost.addImage(ghostJumping);
    }
    if (climberGroup.isTouching(ghost) ||  ghost.y > 600 ) {
      gameState = END;
      ghost.destroy();
    }
    drawSprites();
  }
  if (gameState === END) {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    
   }

}
function spawnDoor() {
  if (frameCount % 300 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    door.x = Math.round(random(120, 400))
    climber.x = door.x;
    climber.velocityY = 1;
    door.velocityY = 1;
    climber.lifetime = 600;
    door.lifetime = 600;
    door.addImage(doorImage);
    climber.addImage(climberImage);
    climberGroup.add(climber);
    doorGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;
  }

}