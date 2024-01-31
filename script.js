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

const currentInput = document.querySelector(".current-input");
let clearOnNextNum = false;
function updateCurrentInput(type, entry) {
	// numbers
  if (type === 0 && (currentInput.textContent.length <= 17 || clearOnNextNum)) {
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
    // fill obj with first number and operation
    if (!equationObj.firstNumber) {
      equationObj.firstNumber = +currentInput.textContent;
    } 
		equationObj.operation = entry;

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
			currentInput.textContent = calculate(equationObj);
			clearEquationObj();
			clearOnNextNum = true;
    }
  }


  console.log(equationObj);
}

function calculate(equationObj){
	switch(equationObj.operation){
		case '×':
			return equationObj.firstNumber * equationObj.secondNumber;
		case '÷':
			return equationObj.firstNumber / equationObj.secondNumber;
		case '+':
			return equationObj.firstNumber + equationObj.secondNumber;
		case '-':
			return equationObj.firstNumber - equationObj.secondNumber;
	}
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
  });
});

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
  updateCurrentInput(2, clearButton.textContent);
});

const equalButton = document.querySelector(".equals-button");
equalButton.addEventListener("click", () => {
  updateCurrentInput(3, equalButton.textContent);
});
