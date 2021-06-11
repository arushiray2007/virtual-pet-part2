class Food{
    constructor(){
        this.milkImg=loadImage("images/milk food.png");
       
        this.foodStock=0;
         this.lastFed=null;


    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
        
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock-=1;
        }
    }
    getFoodStock(){
        return this.foodStock;
    }

    display(){
        background(46,139,87);
        fill(255);
        textSize(15);
        if(lastFed>=12){
            text("last feed: "+ lastFed%12+ " pm",50,30);
        }
        else if(lastFed===0){
            text("last feed: 12 am",50,30);
        }
        else{
            text("last feed: "+ lastFed+" am",50,30);
        }
        var x=70;
        var y=100;
        imageMode(CENTER);
        if(this.foodStock!==0){
            for (var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=70;
                    y+=50;

                }
                image(this.milkImg,x,y,50,50);
                x+=30;

            }
        }
    }
    bedRoom(){
        background(bedRoom,550,500);
        
    }
    garden(){
        background(garden,550,500);
    }
    washRoom(){
        background(bathRoomImg,550,500);
    }
}