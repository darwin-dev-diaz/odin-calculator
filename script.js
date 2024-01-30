const currentInput = document.querySelector(".current-input");
function updateCurrentInput(entry){
    if(currentInput.textContent === "0"){
        currentInput.textContent = entry;
    }
    else {
        currentInput.textContent = currentInput.textContent + entry;
    }

}

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((numberButton)=>{
    numberButton.addEventListener('click',()=>{
        updateCurrentInput(numberButton.textContent);
    });
});