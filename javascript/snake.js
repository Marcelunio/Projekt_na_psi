const width=17;
const height=17;
const BlockSize=32;
const SnakeColor="blue"
const FoodColor="red"
const SnakeBodyColor="cyan"
var context

var body=new Image()
body.src="./Images/body.png"

var head=new Image()
head.src="./Images/head.png"

var tail=new Image()
tail.src="./Images/tail.png"

var bodyV=new Image()
bodyV.src="./Images/body-v.png"

var headV=new Image()
headV.src="./Images/head-v.png"

var tailV=new Image()
tailV.src="./Images/tail-v.png"







var turn=new Image()
turn.src="./Images/turn.png"

var snakeX=BlockSize*Math.floor(width/2-1);
var snakeY=BlockSize*Math.floor(height/2);

var foodX;
var foodY;

var dx=0;
var dy=0;
var delay=200;

var snakeBody = [
    [snakeX-BlockSize,snakeY]
];

var score;

var gameOver=false;

window.onload=function()
{
    const canvas=document.getElementById("canvas");
    canvas.height=height*BlockSize;
    canvas.width=width*BlockSize;
    context=canvas.getContext("2d");
    placefood();
    document.addEventListener("keyup",changeDirection);
    game=setInterval(update,delay);

}

function update()
{
    if(gameOver)
        return;
    context.clearRect(0,0,width*BlockSize,height*BlockSize);
    
    context.fillStyle=FoodColor
    context.fillRect(foodX,foodY,BlockSize,BlockSize)
    
    if(snakeX==foodX && snakeY==foodY)
        {
            snakeBody.push([foodX,foodY]);
            placefood()
        }
 
    for(let i=snakeBody.length-1;i>0;i--)
        {
            snakeBody[i]=snakeBody[i-1];
        }
        
        if(dx!=0||dy!=0)
            snakeBody[0]=[snakeX,snakeY];

    snakeX+=dx*BlockSize;
    snakeY+=dy*BlockSize;
 
    context.fillStyle=SnakeColor;
    //context.fillRect(snakeX,snakeY,BlockSize,BlockSize)
   //context.drawImage(head,snakeX,snakeY)
    //flip(turn,snakeX,snakeY,-1,-1);
    draw(head,headV,snakeX,snakeY,dx,dy)

    context.fillStyle=SnakeBodyColor
    if(snakeBody.length-1)
    {
        let h1=-(snakeBody[0][0]-snakeX)/BlockSize;
        let v1=-(snakeBody[0][1]-snakeY)/BlockSize;
        let h2=(snakeBody[0][0]-snakeBody[1][0])/BlockSize;
        let v2=(snakeBody[0][1]-snakeBody[1][1])/BlockSize;
        if(h1==h2&&v1==v2)
        {
            draw(body,bodyV,snakeBody[0][0],snakeBody[0][1],h1,v1);
        }
        else
        {
            flip(turn,snakeBody[0][0],snakeBody[0][1],h1-h2,v1-v2);
        }
    }
    for(let i=1;i<snakeBody.length-1;i++)
    {
    
        let h1=-(snakeBody[i][0]-snakeBody[i-1][0])/BlockSize;
        let v1=-(snakeBody[i][1]-snakeBody[i-1][1])/BlockSize;
        let h2=(snakeBody[i][0]-snakeBody[i+1][0])/BlockSize;
        let v2=(snakeBody[i][1]-snakeBody[i+1][1])/BlockSize;
        if(h1==h2&&v1==v2)
        {
            draw(body,bodyV,snakeBody[i][0],snakeBody[i][1],h1,v1);
        }
        else
        {
            flip(turn,snakeBody[i][0],snakeBody[i][1],h1-h2,v1-v2);
        }





       //draw(body,bodyV,snakeBody[i][0],snakeBody[i][1])
    }


    if (snakeX < 0 || snakeX > (width-1)*BlockSize || snakeY < 0 || snakeY > (height-1)*BlockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
    
    if(snakeBody.length-1)
    {
        let h=-(snakeBody[snakeBody.length-1][0]-snakeBody[snakeBody.length-2][0])/BlockSize;
        let v=-(snakeBody[snakeBody.length-1][1]-snakeBody[snakeBody.length-2][1])/BlockSize;
        draw(tail,tailV,snakeBody[snakeBody.length-1][0],snakeBody[snakeBody.length-1][1],h,v)
    }
    else
    {
        draw(tail,tailV,snakeBody[snakeBody.length-1][0],snakeBody[snakeBody.length-1][1],dx,dy)
    }
}



function placefood()
{
    foodX=Math.floor(Math.random()*width)*BlockSize;
    foodY=Math.floor(Math.random()*height)*BlockSize;
}

function changeDirection(e)
{
    
    if(e.code=="ArrowUp" && dy!=1)
    {
        dx=0
        dy=-1;
    }
    else if(e.code=="ArrowDown"  && dy!=-1)
    {
        dx=0;
        dy=1;
    }
    else if(e.code=="ArrowLeft"  && dx!=1)
    {
        dx=-1;
        dy=0;
    }
    else if(e.code=="ArrowRight"  && dx!=-1)
    {
        dx=1;
        dy=0;
    }
}
/*
function rotate(image,angle,positionX,positionY)
{
    context.save()
    context.rotate(Math.PI*angle/180)
    context.drawImage(image,positionX*Math.cos(angle)-positionY*Math.sin(angle),positionX*Math.sin(angle)+positionY*Math.cos(angle))
    context.restore()
}*/
function flip(image,positionX,positionY,fx,fy)
{
    let ddx=0,ddy=0;
    context.save()
    context.scale(fx,fy) 
    if(fx==-1)
    {
        ddx=BlockSize
    }
    if(fy==-1)
    {
        ddy=BlockSize
    }
    context.drawImage(image,fx*positionX-ddx,fy*positionY-ddy)
    context.restore()
}

function draw(image,imageV,posX,posY,Horizontality,Verticality)
{
    switch(Horizontality)
    {
        case 1:
            context.drawImage(image,posX,posY); //right
            break;
        case -1:
            flip(image,posX,posY,-1,1); //left
            break;
        default:
            switch(Verticality)
            {
                case -1: // up
                    context.drawImage(imageV,posX,posY);
                    break;
                case 1 : // down
                    flip(imageV,posX,posY,1,-1);
                    break;
                    default:
                        context.drawImage(image,posX,posY); //right
            }
    }
    
}