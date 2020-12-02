// This is the main script

// Major DOM elements

const inputField = document.getElementById('number');
const submitButton = document.querySelector('button.btn');
const turnsContainer = document.getElementById('turns');
const outputContainer = document.getElementById('output');
let tries = 4;
let bcvhdeyerh = randInt(1, 11);

submitButton.addEventListener('click', checkUsersGuess);

function checkUsersGuess(e){
    const userGuess = parseInt(inputField.value);
    if (isNaN(userGuess)){
        sendMessage('You should enter a number', 'error');
    }else{
        checkNumber(userGuess);
    }
}

// The golden function which checks number and do things
function checkNumber(number){
    if (number === bcvhdeyerh){
        sendMessage('You have guessed Correctly', 'success');
        submitButton.innerHTML = 'PLAY AGAIN';
        submitButton.removeEventListener('click', checkUsersGuess);
        submitButton.addEventListener('click', reset);
        inputField.value = '';
        inputField.setAttribute('placeholder', '');
        inputField.disabled = true;
    }else{
        if (tries > 1){
            sendMessage('You missed the number. Try again!', 'error');
            tries -= 1;
            update(turnsContainer, tries);
            inputField.value = '';
            inputField.focus();
        }else{
            sendMessage('You have run out of tries. Game Over!', 'error', true);
            update(turnsContainer, 0);
            submitButton.innerHTML = 'TRY AGAIN';
            submitButton.removeEventListener('click', checkUsersGuess);
            submitButton.addEventListener('click', reset);
            inputField.value = '';
            inputField.setAttribute('placeholder', '');
            inputField.disabled = true;
        }
    }
}

//resets the game
function reset(){
    inputField.setAttribute('placeholder', 'Enter your guess...');
    inputField.disabled = false;
    submitButton.innerHTML = 'SUBMIT';
    submitButton.removeEventListener('click', reset);
    submitButton.addEventListener('click', checkUsersGuess);
    tries = 4;
    update(turnsContainer, tries);
    sendMessage('Thanks! I hope you will remember previous guesses this time :)', 'normal');
}
// creates a random number between given edges
function randInt(a, b){
    const difference = Math.abs(b - a);
    return Math.floor(a + (Math.random() * difference));
}


// Some UX functions
function update(containerElement, newContent){
    const span = containerElement.querySelector('span');
    span.style.opacity = '0';
    const transitionDuration = parseFloat(getComputedStyle(span).getPropertyValue('transition-duration'));
    setTimeout(function(){
        span.innerHTML = newContent;
        span.style.opacity = '1';
    }, transitionDuration * 1000);
}

// sends the message to the user
function sendMessage(message, status, hitBackground=false){
    if (status === 'normal'){
        outputContainer.style.color = '#333';
        outputContainer.style.borderColor = '#999';
        outputContainer.style.backgroundColor = '#fff';
    }else if(status === 'error'){
        outputContainer.style.color = '#c21807';
        outputContainer.style.borderColor = '#c21807';
        if (hitBackground){
            outputContainer.style.background = '#f3d1cd';
        }
    }else if(status === 'success'){
        outputContainer.style.color = '#32cd32';
        outputContainer.style.borderColor = '#32cd32';
        outputContainer.style.background = '#d6f5d6';
    }
    update(outputContainer, message);
}

