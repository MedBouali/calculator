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

    displayContent += digitButtonValue;
    display.textContent = displayContent;
    clearDisplay = false;
}

const onOperatorButtonClick = function(operatorButtonValue) {
    onEqualsButtonClick();

    operator = operatorButtonValue;
    firstNumber = displayContent;
    clearDisplay = true;
}

const onEqualsButtonClick = function() {
    if(operator !== "" && clearDisplay === false) {
        secondNumber = displayContent;
        displayContent = String(operate(operator, firstNumber, secondNumber));
        display.textContent = displayContent;
        operator = "";
        clearDisplay = true;
    }
}

const onAllClearButtonClick = function() {
    firstNumber = "";
    secondNumber = ""
    operator = "";
    displayContent = "0";
    display.textContent = displayContent;
    clearDisplay = true;
}

const onNegateButtonClick = function() {
    if(displayContent !== "0"){
        if(displayContent.startsWith("-")){
            displayContent = displayContent.slice(1);
        } else {
            displayContent = "-" + displayContent;
        }

        display.textContent = displayContent;
    }
}

const onPercentageButtonClick = function() {
    displayContent = String(parseFloat(displayContent) * 0.01);
    display.textContent = displayContent;
    clearDisplay = true;
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
