let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayContent = "0";

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".num-btn");
const operatorButtons = document.querySelectorAll(".ope-btn");
const equalsButton = document.querySelector(".equ-btn");

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
    if(displayContent === "0") displayContent = "";

    displayContent += digitButtonValue;
    display.textContent = displayContent;
}

const onOperatorButtonClick = function(operatorButtonValue) {
    onEqualsButtonClick();

    operator = operatorButtonValue;
    firstNumber = display.textContent;
    displayContent = "0";
}

const onEqualsButtonClick = function() {
    if(operator !== "" && displayContent !== "0") {
        secondNumber = display.textContent;
        display.textContent = operate(operator, firstNumber, secondNumber);
        operator = "";
        displayContent = "0";
    }
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => onDigitButtonClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => onOperatorButtonClick(button.textContent));
});

equalsButton.addEventListener("click", onEqualsButtonClick);
