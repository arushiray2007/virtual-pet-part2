//Create variables here
var dog, happyDog,database,foodS,foodStock,img,img1;
var bathRoomImg,garden,bedRoom,foodObj;
var lastFed,fedTime,currentTime,gameState;
function preload()
{
	//load images here
  img=loadImage("images/dogImg.png");
  img1=loadImage("images/dogImg1.png");
  bathRoomImg=loadImage("virtual pet images/Wash Room.png");
  garden=loadImage("virtual pet images/Garden.png");
  bedRoom=loadImage("virtual pet images/Bed Room.png");
}

function setup() {
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

	createCanvas(500, 500);

  dog=createSprite(250,250,10,10);
  dog.addImage(img);
  dog.scale=0.2;

  foodObj=new Food();

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
 var readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
  
  feed=createButton("feed the dog");
  feed.position(200,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("add food");
  addFood.position(300,95);
  addFood.mousePressed(addFoodS);
}


function draw() {  
  background(46,139,87);
  currentTime=hour();
  if(currentTime=(lastFed+1)){
    update("playing");
    foodObj.garden();

  }
  else if(currentTime=(lastFed+2)){
    update("sleeping");
    foodObj.bedRoom();

    
  }

  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washRoom();
  }

  else {
    update("hungry");
    foodObj.display();
  }

  if(gameState !== "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
 else{
  feed.show();
  addFood.show();
  dog.addImage(img1);
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(img);
  }
  drawSprites();
  //add styles here
  fill(255);
  stroke("black");
  /*text("Food Remaining : "+foodS,170,100);
  textSize(13);
  text("Note: Press up arrow key to feed milk",130,10,300,20);*/

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
/*function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}*/

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function feedDog(){
  dog.addImage(img1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"hungry"
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}