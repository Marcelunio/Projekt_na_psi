const width=17;
const height=17;
const BlockSize=32;
const SnakeColor="blue"
const FoodColor="red"
const SnakeBodyColor="cyan"
var context


var snakeX=BlockSize*6;
var snakeY=BlockSize*6;

var foodX;
var foodY;

var dx=0;
var dy=0;
var delay=100;

var snakeBody = [];

var score;

var gameOver=false;

window.onload=function()
{
    const canvas=document.getElementById("canvas")
    canvas.height=height*BlockSize;
    canvas.width=width*BlockSize;
    context=canvas.getContext("2d")
    placefood()
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
    if(snakeBody.length)
    {
        snakeBody[0]=[snakeX,snakeY];
    }

    snakeX+=dx*BlockSize;
    snakeY+=dy*BlockSize;
 
    context.fillStyle=SnakeColor;
    context.fillRect(snakeX,snakeY,BlockSize,BlockSize)

    
    context.fillStyle=SnakeBodyColor
    for(let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],BlockSize,BlockSize)
    }
    

    if (snakeX < 0 || snakeX > (width-1)*BlockSize || snakeY < 0 || snakeY > height*BlockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
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
