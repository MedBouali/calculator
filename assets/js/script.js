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
const clearButton = document.querySelector(".clr-btn");
const deleteButton = document.querySelector(".del-btn");
const messageErrorDiv = document.querySelector(".error-message");
const shortcutsButton = document.querySelector(".shortcuts-btn");
const shortcutsDiv = document.querySelector(".keyboard-shortcuts");

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

const onClearButtonClick = function() {
    if(clearButton.textContent === "AC") {
        firstNumber = "";
        secondNumber = ""
        operator = "";
        clearDisplay = true;
    }

    updateDisplay("0");
    clearButton.textContent = "AC";
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

const onDeleteButtonClick = function() {
    updateDisplay(displayContent.slice(0, -1));
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
    clearButton.textContent = "C";

    if(displayContent === "" || displayContent === "-") {
        displayContent = "0";
        clearButton.textContent = "AC";
    }

    display.textContent = displayContent;
}

const onKeyboardClick = function(event) {
    const isDigit = (event.key >= "0" && event.key <= "9") || event.key === ".";
    const isOperator = event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/";

    switch(true) {
        case isDigit:
            onDigitButtonClick(event.key);
            break;
        case event.key === "Backspace":
            onDeleteButtonClick();
            break;
        case isOperator:
            onOperatorButtonClick(event.key);
            break;
        case event.key === "=" || event.key === "Enter":
            onEqualsButtonClick();
            break;
        case event.key === "%":
            onPercentageButtonClick();
            break; 
        case event.key === "Escape":
            clearButton.textContent = "AC";
            onClearButtonClick();
            break;
        default:
            break;
    }

    event.target.blur();
}

const onShortcutsButtonClick = function() {
    if(shortcutsDiv.classList.contains("show")){
        shortcutsDiv.classList.remove("show");
        shortcutsButton.textContent = "Show Keyboard Shortcuts";
    } else {
        shortcutsDiv.classList.add("show");
        shortcutsButton.textContent = "Hide Keyboard Shortcuts";
    }
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => onDigitButtonClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => onOperatorButtonClick(button.textContent));
});

equalsButton.addEventListener("click", onEqualsButtonClick);

functionButtons.forEach(button => {
    if(button.textContent === "+/-") button.addEventListener("click", onNegateButtonClick);
    if(button.textContent === "%") button.addEventListener("click", onPercentageButtonClick);
});

clearButton.addEventListener("click", onClearButtonClick);

deleteButton.addEventListener("click", onDeleteButtonClick);

document.addEventListener("keydown", (event) => onKeyboardClick(event));

shortcutsButton.addEventListener("click", onShortcutsButtonClick);
