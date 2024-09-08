class Bubbles{
    //str:name of the class in CSS
    //iter:how many times the loop will iterate
    //app:to which element we are appending the dots 
    append(str,iter,app){
        for (let index = 0; index < iter; index++) {
            let dotss = document.createElement('div');
            dotss.className = str;
            app.appendChild(dotss);
        }
    }
}
let dots = document.querySelector('.yellow');//refering "yellow" class
let app = document.querySelector(".innerdots");//refering ".innerdots" class
let bubbles=document.querySelector('.bubbles');//refering "bubbles" class
let bubbles1=document.querySelector('.bubless2');//refering "bubless2" class
let bubbles2=document.querySelector('.dots3');//refering dots 3
//To print dots in the Block so i have given flex-wrap:no wrap to the element or block 
let bob=new Bubbles();//object creation of Bubbles
bob.append("yellow",11,app);//4*3 bubbles
bob.append("yellow",2,bubbles)//2 bubbles only
bob.append("yellow",3,bubbles1);//3 bubbles only
bob.append("yellow",3,bubbles2)//
document.querySelector('#under-test1').addEventListener('click',()=>{
    alert("Under Testing Plaese Try Some Time Later")
})
document.querySelector('#under-test').addEventListener('click',()=>{
    alert("Under Testing Plaese Try Some Time Later")
})
/* Menu bar code*/
const ShowCase=()=>{
    document.querySelector('.icon').addEventListener('click',()=>{
        document.querySelector('.second-block').append(document.querySelector('.menubar'));//we are appeding it on the second block with the class name menubar
        document.querySelector('.menubar').style.transform="translateX(0%)";//we are using the transform property of CSS to transform the position of the menu bar from the left of the block to the center
        document.querySelector('.menubar').style.display="initial";//making the menu bar display asussal to show the menu bar
        document.querySelector('.icon').style.display="none";//and making icon display none when the menubar is activated
    });
}
ShowCase();
/* To toggle the menu bar */
const ToClose=()=>{
    document.querySelector('.close').addEventListener('click',()=>{
        document.querySelector('.menubar').style.transform="translateX(100%)";//making menubar going to left when the task is completed
        document.querySelector('.menubar').style.display="none";// making it's property to none after the use
        document.querySelector('.icon').style.display="initial";// making th e menu bar again visible after menubar not-visible 
        /* it will create a toglle function */
    });
}
ToClose();
//typing animation
new TypeIt(".name>h1", {
    //String:[document.querySelector('h1')],
    Infinity:100,
    speed: 100,
    waitUntilVisible: true,
  }).go();

