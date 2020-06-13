const qwerty = document.getElementById('qwerty')
const phrase = document.getElementById('phrase')
const buttonReset = document.querySelector('.btn__reset')
let missed = 0
const phrases = ['javascript','html','css','frontend','developer']

//return a random single character word in array  
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length)
    const getRandomWord = arr[randomNumber].split('')
    return getRandomWord
    
} 

//add each single character to the screen
function addPhraseToDisplay(arr){

    for(let i = 0; i < arr.length; i ++){

        const eachLetter = arr[i]

        const list = document.createElement('li')
        list.className = 'letter'

        list.textContent = eachLetter
        
        phrase.firstElementChild.appendChild(list)

    }
    
}

//store the word into the Variable, and cell the addPhraseTo Display 
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//check each character, if the character is same with the button event listener clicked, it will add "show" class
//return match if all the word is match

//THE SHOW CLASS IS ADDed a transition in CSS
function checkLetter(button){
    const allList = document.getElementsByClassName('letter')
    let match = null;
    for(let i = 0 ; i < allList.length; i++){
        
        if(allList[i].textContent == button.textContent){
            allList[i].className += " show"
            match = true
        }     
    }
    return match
}


// event listener to hide the overlay in first display
buttonReset.addEventListener('click', () =>{
    const overLay = document.getElementById("overlay")
    overLay.style.display = 'none'
})

// event listener for qwerty, work with the checkLetter function
qwerty.addEventListener('click', (e) => {
    //the event is only target the Button tagName
    //if the target is clicked, it will add a chosen class, and it will be disable
    if(event.target.tagName === 'BUTTON'){
        const clickButton = e.target
        clickButton.className = 'chosen'
        clickButton.disabled = true
        let letterFound = checkLetter(clickButton);
    //if user is miss the target, it will lose a heart
        if (letterFound === null) {
            
            const ol = document.querySelector('ol');
            ol.firstElementChild.remove()
            missed += 1
        }

    }
    checkwin()
})

//for the reset button
function removeLove(){
    const ol = document.querySelector('ol');
    ol.innerHTML = ''
}
//for the reset button
function createLove() {
    const ol = document.querySelector('ol');
    const createLove = document.createElement('li')
    createLove.className = 'tries'
    createLove.innerHTML = `<img src="images/liveHeart.png" height="35px" width="30px">`
    ol.appendChild(createLove)
}

//to reset the display, random word, the user's heart
function reset(){
    let resetButton = document.querySelector('.btn__reset');
    resetButton.textContent = "Play Again"
    resetButton.addEventListener('click', () => {
        const ul = document.querySelector('#phrase ul');
        const li = document.querySelectorAll('#phrase li');
        for (let i = 0; i < li.length; i++) {
            ul.removeChild(li[i]);
        }
        const buttons = document.querySelectorAll('button.chosen');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('chosen');
            buttons[i].disabled = false;
        }

        removeLove()
        for(let i = 0 ; i < 5; i ++){
            createLove()
        }

        const resetPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(resetPhrase);
        overlay.style.display = 'none';
        missed = 0
    });
}

// the check win function is to check the user is win or lose, if the user is win, the display will show the win,
// while the user lose all the heart, it will display a big red lose message
function checkwin(){
    const classLetter = document.getElementsByClassName('letter')
    const classShow = document.getElementsByClassName('show')
    const overLay = document.getElementById("overlay")

    if(classLetter.length == classShow.length){
        overLay.className = ' win'
        overLay.firstElementChild.textContent = "You WIN!!!!!!"
        overLay.style.display = 'flex'
        reset()
    }else if(missed >= 5){
        overLay.className = ' lose'
        overLay.firstElementChild.textContent = "You Lose, Please try again"
        overLay.style.display = 'flex'
        reset()
    }

}
