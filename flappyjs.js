let oversizewidth = document.querySelector('.block').clientWidth;//Client Side block Width
let oversizeheight = document.querySelector('.block').clientHeight;//Client Side block Height because Of the game will be opne in the different Devices 
let player = document.querySelector('.flappy');//Main Player Of the Game Is Type of Bird Image
let speed = 5;//Setting Speed Of the Main Player
let MoveDown = (oversizeheight / 2) - 100;//To place the Main Player in the Center of the Screen
let can, canc;//Cancellation of animation frame
let gamebegin = false;//Game Begin Detector
let pipes = document.querySelector('.pipes');//Pipes
let pipesheight, pipesdownheigh;//Width and height of Pipes
let pipesdown = document.querySelector('.downpipe');//Down Pipes
let pipesne = document.querySelector('.pipes1');//Second Pipe Top
let pipesdownne = document.querySelector('.downpipe2');//Second Pipe Down
let isup = false;//Is moving Upside Checker
let iscom = false;//First Two Pipes Have Completed There Task
let ison = false;//Second Pipes Pair Should go
let music = new Audio();//Creating an Object OF the class Audio
music.src = "Upbeat-Forever(chosic.com).mp3";//Providing the path to the music
let Score = 0;//score is 0 at the beginning
let inc = 0;//collision not accure when there is inc not greater then 1
let onece = true;
let callone = true;
localStorage.setItem('high', 0);//Local Storage getting
let gameoverscreen = document.querySelector('.game-end');
let gameovermenu = document.querySelector('.game-over-menu');
//Score increment function
function scoreinc() {
    Score++;
    document.querySelector('span').innerHTML = Score;
}
//Restart Function
function restart() {
    player.style.top = ((oversizeheight / 2) - 100) + "px";//center position height code
    player.style.left = ((oversizewidth / 2) - 100) + "px";//center position width code
    player.style.transform = "rotate(0deg)"//making the player still
    pipesdown.style.right = 0 + "px";
    pipes.style.right = 0 + "px";
    pipesdownne.style.right = -250 + "px";
    pipesne.style.right = -250 + "px";
    up = (oversizeheight / 2) - 100;
    MoveDown = (oversizeheight / 2) - 100;
    console.log("called")
}
//Resetting the Game Object Main Player In the center loction before Starting the game
restart();
//game over display function
function gameover() {
    gameoverscreen.style.display = 'initial';
    gameovermenu.style.top = ((oversizeheight / 2) - 170) + "px";
    gameovermenu.style.left = ((oversizewidth / 2) - 133) + "px";
    document.querySelector('#score').innerHTML = Score;
    cancelAnimationFrame(can);
    cancelAnimationFrame(canc);
    if (callone) {
        document.querySelector('#restartButton').addEventListener('click', () => {
           location.reload();
        })
        callone = false;
    }
    music.pause();
    gamebegin = false;
}
let start = document.querySelector('.start-button');
let menu = document.querySelector('.start')
//speed Checker Start here
document.querySelector('.two').addEventListener('click', () => {//medium speed is 10
    speed = 7;
})
document.querySelector('.three').addEventListener('click', () => {//hard speed is 15
    speed = 10;
})
//Speed Checker End Here
start.addEventListener('click', () => {
    menu.style.display = "none"
    gamebegin = true
    if (gamebegin) {
        //Pipes Moves
        let rights = 0;
        let rightsd = 0;
        let nextup = -200;
        let nextdown = -200;
        let up = MoveDown;
        music.play()
        //Pipes Moves Are Contolled Here
        function PipesMove() {
            pipesdown.style.right = rightsd + "px";
            pipes.style.right = rights + "px";
            pipesdownne.style.right = nextdown + "px";
            pipesne.style.right = nextup + "px";
            if (iscom != true) {
                rights += (speed + 2);//First Pair Of Top pipe Mover
                rightsd += (speed + 3);//First Pair Of Down Pipe Mover
                //To generate The Given Size to the size we want formula math.floor(Math.random()*(max-min+1)+min);
                if (!ison) {
                    pipes.style.height = (Math.floor(Math.random() * (40 - 20 + 1) + 20)) + "%";
                    pipesdown.style.height = (Math.floor(Math.random() * (30 - 25 + 1) + 25)) + "%";
                }
                ison = true;
                if ((player.getBoundingClientRect().top) <= rights && (pipes.getBoundingClientRect().height) - 100 >= (player.getBoundingClientRect().top)) {//Collider Detection Of the Top Fist Piller Of the Game
                    gameover();
                }
                //console.log(player.getBoundingClientRect().top)
                if ((pipesdown.getBoundingClientRect().top - pipesdown.getBoundingClientRect().height) <= (player.getBoundingClientRect().top) && (document.querySelector('body').getBoundingClientRect().height - player.getBoundingClientRect().top) <= rightsd && inc >= 1) {
                    gameover();
                }
                if ((player.getBoundingClientRect().x) >= rights) {
                    if (onece) {
                        scoreinc();
                    }
                    onece = false
                }
                inc++;
            }
            else {
                nextup += (speed + 2);//Second Pair of Top pipe Mover
                nextdown += (speed + 3);//Second Pair Of down pipe Mover
                if (ison) {
                    pipesne.style.height = (Math.floor(Math.random() * (40 - 20 + 1) + 10)) + "%";
                    pipesdownne.style.height = (Math.floor(Math.random() * (40 - 25 + 1) + 25)) + "%";
                }
                ison = false;
                if ((player.getBoundingClientRect().top) <= nextup && (pipesne.getBoundingClientRect().height) - 100 >= (player.getBoundingClientRect().top)) {//Collider Detection Of the Top Second Piller Of the Game 
                    gameover();
                }
                if ((pipesdownne.getBoundingClientRect().top - pipesdownne.getBoundingClientRect().height) <= (player.getBoundingClientRect().top) && (document.querySelector('body').getBoundingClientRect().height - player.getBoundingClientRect().top) <= nextdown) {
                    gameover();
                }
                if ((player.getBoundingClientRect().x) >= nextup) {
                    if (!onece) {
                        scoreinc();
                    }
                    onece = true
                }
                inc++;
            }
            //Reseting the Pillers of first pair
            if (rights > oversizewidth - 98 && gamebegin == true) {
                rights = -100;
                rightsd = -100;
                iscom = true
            }
            //Reseting the Pillers of Second pair
            if (nextup > oversizewidth - 98 && gamebegin == true) {
                nextup = (rights - 100);
                nextdown = (rightsd - 100);
                iscom = false
            }
            //Checking the if the player hit the top of the frame and cancelling animation
            if (nextup < oversizewidth + 98 && gamebegin == true) {
                canc = requestAnimationFrame(PipesMove);
                //Animation cancellation basef on the condition
            }
            //Do Noting HaHaHaHa
            else {
                canc = requestAnimationFrame(PipesMove);
            }
        }
        PipesMove()
        //Moving Of the Player Are Controlled By here
        function Moves() {
            //If the player Collide to the Bottom floor the game will re begin from start
            if (oversizeheight > (MoveDown + 100) && up >= -100) {
                player.style.top = MoveDown + "px";
                can = requestAnimationFrame(Moves);
                MoveDown += speed;
                up = MoveDown
                player.style.transform = "rotate(10deg)"
            }
            else {
                gameover();
                restart()
                gamebegin = false
                start.style.display = "initial"
            }

        }
        //Clicking Event Generate Here
        window.addEventListener('click', () => {
            player.style.top = up + "px";
            up -= (speed + 40);
            MoveDown = up;
            player.style.transform = "rotate(350deg)"//IF the player Jumps the Player in the 350 deg 
            cancelAnimationFrame(can)//Animation will be cancelled if the player is jumping
            setTimeout(() => {//Delay While Jumping the player
                requestAnimationFrame(Moves)//Reviving the Animation after the 100 mili second sleep in Event Stack
            }, 100)
        })
        Moves();//Function Calling Of the Main Player
    }
})