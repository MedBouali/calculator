let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayContent = "0";
let clearDisplay = true;

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".num-btn");
const operatorButtons = document.querySelectorAll(".ope-btn");
const equalsButton = document.querySelector(".equ-btn");
const functionButtons = document.querySelectorAll(".fun-btn");
const messageErrorDiv = document.querySelector(".error-message");

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function(op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid operator!";
    }
}

const onDigitButtonClick = function(digitButtonValue) {
    if(displayContent === "0" || clearDisplay === true) displayContent = "";
    if(digitButtonValue === "." && displayContent === "") displayContent = "0.";
    if(digitButtonValue === "." && displayContent.includes(".")) digitButtonValue = "";

    if(isWithinMaxLength(displayContent)) {
        updateDisplay(displayContent + digitButtonValue);
        clearDisplay = false;
    }   
}

const onOperatorButtonClick = function(operatorButtonValue) {
    onEqualsButtonClick();

    operator = operatorButtonValue;
    firstNumber = displayContent;
    clearDisplay = true;
}

const onEqualsButtonClick = function() {
    if(operator !== "" && !clearDisplay) {
        secondNumber = displayContent;

        if(operator === "/" && secondNumber === "0") {
            displayErrorMessage("Dude, seriously? You can't divide by zero. Try again!");
        } else {
            const operationResult = operate(operator, firstNumber, secondNumber);
            updateDisplay(formatLargeNumber(operationResult));
        }
        
        operator = "";
        clearDisplay = true;
    }
}

const onAllClearButtonClick = function() {
    firstNumber = "";
    secondNumber = ""
    operator = "";
    updateDisplay("0");
    clearDisplay = true;
}

const onNegateButtonClick = function() {
    if(displayContent !== "0"){
        if(displayContent.startsWith("-")){
            updateDisplay(displayContent.slice(1));
        } else {
            updateDisplay("-" + displayContent);
        }
    }
}

const onPercentageButtonClick = function() {
    const percentageResult = parseFloat(displayContent) * 0.01;
    updateDisplay(formatLargeNumber(percentageResult));
    
    clearDisplay = true;
}

const formatLargeNumber = function(number) {
    let numberStr = String(number);

    if(numberStr.length > 15){
        let precision = 15;

        while(numberStr.length > 15 && precision > 0) {
            if(numberStr.includes(".")) {
                numberStr = String(number.toExponential(precision) * 1);
            } else {
                numberStr = String(number.toExponential(precision));
            }
            precision--;
        }
    }

    return numberStr;
}

const isWithinMaxLength = function(value, maxLength = 15) {
    const contentLength = String(value).replace("-", "").length;

    if(contentLength < maxLength) {
        return true;
    } else {
        displayErrorMessage("Input exceeds 15 characters. Please simplify the number or use fewer digits.");
        return false;
    }
}

const displayErrorMessage = function(message) {
    messageErrorDiv.textContent = message;
    messageErrorDiv.classList.add("show");
    setTimeout(() => messageErrorDiv.classList.remove("show"), 5000);
};

const updateDisplay = function(displayValue) {
    displayContent = displayValue;
    display.textContent = displayContent;
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => onDigitButtonClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => onOperatorButtonClick(button.textContent));
});

equalsButton.addEventListener("click", onEqualsButtonClick);

functionButtons.forEach(button => {
    if(button.textContent === "AC") button.addEventListener("click", onAllClearButtonClick);
    if(button.textContent === "+/-") button.addEventListener("click", onNegateButtonClick);
    if(button.textContent === "%") button.addEventListener("click",onPercentageButtonClick);
});
