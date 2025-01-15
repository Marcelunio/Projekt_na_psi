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


var Apple=new Image()
Apple.src="./Images/Jablko.png"


var score=0;

var going=3;



var turn=new Image()
turn.src="./Images/turn.png"

var snakeX=BlockSize*Math.floor(width/2-1);
var snakeY=BlockSize*Math.floor(height/2);

var foodX;
var foodY;

var dy=0;
var dx=0;
var delay=200;

var snakeBody = [
    [snakeX-BlockSize,snakeY]
];

var score;

var gameOver=false;

var game;
var input;

window.onload=function()
{
    const canvas=document.getElementById("canvas");
    canvas.height=height*BlockSize;
    canvas.width=width*BlockSize;
    context=canvas.getContext("2d");
    placefood();
    input=document.addEventListener("keyup",changeDirection);
    game=setInterval(update,delay);

}

function update()
{
    if(gameOver)
    {
        context.fillStyle="rgba(0,0,0,0.7)"
        context.fillRect(0,0,width*BlockSize,height*BlockSize)
        context.font = "48px monospace";
        context.fillStyle="white"
        context.fillText("Score:",width*BlockSize/2-"Score:".length*24 ,height*BlockSize/2-48 );
        context.fillText(score*100,width*BlockSize/2-(score.toString().length*48),height*BlockSize/2 );
        clearInterval(game);
        removeEventListener("keyup",input);
        score=0;
        return;
    }
    context.clearRect(0,0,width*BlockSize,height*BlockSize);
    
    
    //context.fillRect(foodX,foodY,BlockSize,BlockSize)
    context.drawImage(Apple,foodX,foodY)
    if(snakeX==foodX && snakeY==foodY)
        {
            snakeBody.push([foodX,foodY]);
            placefood()
            score++;
        }
 
    for(let i=snakeBody.length-1;i>0;i--)
        {
            snakeBody[i]=snakeBody[i-1];
        }
        
        if(dx!=0||dy!=0)
            snakeBody[0]=[snakeX,snakeY];


    
 
    switch(dx)
    {
        case 1:
            going=1;
            break;
        case -1:
            going=3;
            break;
        default:
            switch(dy)
            {
                case 1:
                    going=2;
                    break;
                case -1:
                    going=0;
                    break;
                default:
            }
            
    }

    snakeX+=dx*BlockSize;
    snakeY+=dy*BlockSize;


    //context.fillStyle=SnakeColor;

    draw(head,headV,snakeX,snakeY,dx,dy)

    //context.fillStyle=SnakeBodyColor
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
        //alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            //alert("Game Over");
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
    
    if(e.code=="ArrowUp" && going!=2)
    {
        dx=0
        dy=-1; 
    }
    else if(e.code=="ArrowDown"  && going!=0)
    {
        dx=0;
        dy=1;
    }
    else if(e.code=="ArrowLeft"  && going!=1)
    {
        dx=-1;
        dy=0;
    }
    else if(e.code=="ArrowRight"  && going!=3)
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

function reset()
{
    if(gameOver)
    {
        going=3;
        gameOver=false
        snakeX=BlockSize*Math.floor(width/2-1);
        snakeY=BlockSize*Math.floor(height/2);
        dy=0;
        dx=0;
        
        snakeBody=[[snakeX-BlockSize,snakeY]]
        placefood();
        input=document.addEventListener("keyup",changeDirection);
        game=setInterval(update,delay);
    }
}