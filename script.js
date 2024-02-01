let equationObj = {
  firstNumber: null,
  operation: null,
  secondNumber: null,
};

function clearEquationObj(){
	equationObj = {
		firstNumber: null,
		operation: null,
		secondNumber: null,
	};
}

function clearOperationColor(){
  operationButtons.forEach((button)=>{button.classList.remove('hover')});
}

const currentInput = document.querySelector(".current-input");
let clearOnNextNum = false;
let savedSecondNumber = 0;
function updateCurrentInput(type, entry) {
  // numbers
  if (type === 0 && (currentInput.textContent.length <= 14 || clearOnNextNum)) {
    if (currentInput.textContent === "0" || clearOnNextNum) {
      currentInput.textContent = entry;
      clearOnNextNum = false;
    } else {
      currentInput.textContent = currentInput.textContent + entry;
    }
  }

  //operations
  if (type === 1) {
    // make number flash
    currentInput.classList.add("blink-class");
    setTimeout(() => {
      currentInput.classList.remove('blink-class');
    }, 300);

    // fill obj with first number and operation
    if (!equationObj.firstNumber) {
      equationObj.firstNumber = +currentInput.textContent;
    } 
		equationObj.operation = entry;
    currentInput.textContent = 0;

    clearOnNextNum = true;
  }


  //clear
  if (type === 2) {
    currentInput.textContent = 0;
    clearEquationObj();
  }
  //equal
  if (type === 3) {
    if (equationObj.firstNumber && equationObj.operation) {
      equationObj.secondNumber = +currentInput.textContent;
      savedSecondNumber = +currentInput.textContent;
			currentInput.textContent = calculate(equationObj);
			clearEquationObj();
			clearOnNextNum = true;
    }
  }
}


const enteredInput = document.querySelector(".entered-input");
function updateEnteredInput(type) {
  //operation
  if(type === 1){
    enteredInput.textContent = `${equationObj.firstNumber} ${equationObj.operation} `;
  }

  //clear
  if(type === 2){
    enteredInput.textContent = 0;
  }

  //enter
  if(type === 3){
    enteredInput.textContent = enteredInput.textContent + `${savedSecondNumber} = ${currentInput.textContent}`;
  }
}

function calculate(equationObj){
	let returnNum = 0;
	switch(equationObj.operation){
		case '×':
			returnNum = equationObj.firstNumber * equationObj.secondNumber;
			break;
		case '÷':
			returnNum = (Math.round((equationObj.firstNumber / equationObj.secondNumber)*100)/100);
			break;
		case '+':
			returnNum = equationObj.firstNumber + equationObj.secondNumber;
			break;
		case '-':
			returnNum = equationObj.firstNumber - equationObj.secondNumber;
			break;
	}
	if(returnNum >= 10e14) returnNum = returnNum.toExponential(2);
	return returnNum;
}

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    updateCurrentInput(0, numberButton.textContent);
  });
});

const operationButtons = document.querySelectorAll(".sign-button");
operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    updateCurrentInput(1, operationButton.textContent);
    updateEnteredInput(1);

    clearOperationColor();
    operationButton.classList.add('hover');
  });
});

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
  updateCurrentInput(2, clearButton.textContent);
  updateEnteredInput(2);
  clearOperationColor();
});

const equalButton = document.querySelector(".equals-button");
equalButton.addEventListener("click", () => {
  updateCurrentInput(3, equalButton.textContent);
  updateEnteredInput(3);
  clearOperationColor();
});
