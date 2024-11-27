const input = document.querySelector("#input")
const go = document.querySelector("#go")
const inputpage = document.querySelector('.landingpage')
const playerdatamain = document.querySelector(".playersdata")
const container = document.querySelector(".container")
playerdatamain.style.display = "none"
container.style.display = "none"  


const playerlimit = 5
let playerlist = []
let playernumberlist = []
let currentplayer =0
let game = true


go.addEventListener('click',()=>{
    let x = input.value
    if (!isNaN(x) && 2<= x && x <=5 ){
        inputpage.style.display = "none";
        playerinput(x)
        randomnumbers(x)
    }
    else{
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 350);
    }
})


const playerinputs = document.querySelector('.playerinputs')

function playerinput(n){
    playerdatamain.style.display = "flex"
    console.log("hi")
    for(let i =0 ;i<n;i++){
        const d = document.createElement("div")
        const p = document.createElement("p")
        const inputfield = document.createElement("input")
        p.textContent = `Player ${i+1}:`
        inputfield.placeholder = 'Enter Name'
        p.classList.add('playerdatapara')
        inputfield.classList.add('playerdatainput')

        d.classList.add('playerdatadiv')
        d.append(p)
        d.append(inputfield)
        playerinputs.append(d)
    }
    const button = document.createElement('button')
    button.textContent = "Start"
    button.classList.add('playerdatabutton')
    playerinputs.append(button)

    button.addEventListener('click',()=>{
        const playernames = document.querySelectorAll('.playerdatainput')
        playernames.forEach(playername => {
            let PNAME = playername.value.trim()
            if ((PNAME) && !playerlist.includes(PNAME) ){
                playerlist.push(PNAME)
            }   
            else{
                playerlist = []
                playername.classList.add("shake")
                button.classList.add("shake")
                setTimeout(() => {
                    button.classList.remove("shake")
                    playername.classList.remove("shake")
                }, 350);
            }
        });
        if (playerlist.length == n){
            gamers(playerlist)}
        else
            {console.log("still trying")}
    })
    
}


function gamers(playerlist){
    playerdatamain.style.display = "none" 
    container.style.display = "flex"
}







const gameboard = document.querySelector(".gameboard");
function randomnumbers(x){
    let numbers = []
    for ( let i = 0 ; i<25 ; i++){
        numbers[i] = i+1
    }
    for (let j =0;j<x;j++){
        playernumberlist[i]= randomise(numbers)
    }
}

function randomise(array){
    for (let i =0;i<25;i++){
        
        let randomindex = Math.floor(Math.random()*24);
        [array[randomindex] ,array[i]] = [array[i],array[randomindex]]
    }
    return array
}

function giverandomelement(arr){
    poped = arr.pop()
    return poped
}



while (game==true){

}






for(let i =0; i<5;i++){
    let newrow = document.createElement("div")
    for(let j = 0 ;j<5;j++){
        let box = document.createElement('div')
        value = giverandomelement(shufflearr)
        box.innerHTML = value
        box.classList.add(`cords-{i}{j}` ,`num-{value}`,`box`)
        newrow.append(box)
    }
    newrow.classList.add(`row`)
    gameboard.append(newrow)
    
}
const boxes = document.querySelectorAll('.box')
boxes.forEach(box =>{
    box.addEventListener('click',()=>{
        console.log("clicked");
        if (box.classList.contains("marked")){
            alert("already clicked")
        }
        else
        box.classList.add('marked');

    })
})












// --------------TIMEOUT--------------


// for(let i=25;i>=1;i--){
//     setTimeout(()=>{
//         console.log(i)
//         gameboard.textContent = i;
//     },(26-i)*1000);
//     if(i==1){
//         gameboard.textContent = 'switchingsides';
//     }

// }
    
