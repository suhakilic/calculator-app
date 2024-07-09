const display_1 = document.getElementById("display_1")
const display_2 = document.getElementById("display_2")
const buttons = document.querySelector(".buttons")


let displayValue_1 = ""
let displayValue_2 = ""
let lastClickedBtn


function updateDisplay_1() {
    display_1.value = displayValue_1
}


function updateDisplay_2() {
    display_2.value = displayValue_2
}


updateDisplay_1()
updateDisplay_2()


// Event listener for button clicks
buttons.addEventListener("click", function (e) {
    const element = e.target

    // Ensure the clicked element is a button
    if (!element.matches("button")) return

    // Clear display_2 if "=" was the last clicked button and a number is now clicked
    if (lastClickedBtn === "=" && element.className === "number") {
        displayValue_2 = ""
    }

    // Handle button actions based on their class
    switch (element.className) {
        case "clear":
            clear();
            break;
        case "del":
            del();
            break;
        case "operator":
            mathOperation(element.value);
            break;
        case "decimal":
            decimal();
            break;
        default:
            numberEntry(element.value);
    }

    lastClickedBtn = element.value
})


function numberEntry(num) {
    displayValue_2 = displayValue_2 === "0" ? num : displayValue_2 + num
    updateDisplay_2()
}


function clear() {
    displayValue_1 = ""
    displayValue_2 = ""
    updateDisplay_1()
    updateDisplay_2()
}


function del() {
    displayValue_2 = displayValue_2.length <= 1 ? "" : displayValue_2.slice(0, -1)
    updateDisplay_2()
}


function decimal() {
    if (!displayValue_2.includes(".")) {
        displayValue_2 = displayValue_2 === "" || displayValue_2 === "-" ? displayValue_2 + "0." : displayValue_2 + ".";
        updateDisplay_2();
    }
}


function mathOperation(operator) {
    let firstNumber = parseFloat(displayValue_1)
    let firstOperator = displayValue_1.slice(-1)
    let secondNumber = parseFloat(displayValue_2)
    let secondOperator = operator


    if (operator === "=") {
        if (displayValue_1 !== "") {
            calculate(firstNumber, firstOperator, secondNumber, secondOperator);
        }
    } else {
        if (displayValue_1 === "" && displayValue_2 === "" && operator === "-") {
            displayValue_2 = "-"
            updateDisplay_2()
        }
        else if (displayValue_1 === "" && displayValue_2 !== "") {
            if (displayValue_2 !== "-") {
                displayValue_1 = displayValue_2 + operator
                displayValue_2 = ""
                updateDisplay_1()
                updateDisplay_2()
            }
        }
        else if (displayValue_1 !== "" && displayValue_2 === "") {
            displayValue_1 = firstNumber + operator
            updateDisplay_1()
        }
        else if (displayValue_1 !== "" && displayValue_2 !== "") {
            calculate(firstNumber, firstOperator, secondNumber, secondOperator);
        }
    }
}


function calculate(firstNumber, firstOperator, secondNumber, secondOperator) {
    function getResult() {
        switch (firstOperator) {
            case "+":
                return firstNumber + secondNumber;
            case "-":
                return firstNumber - secondNumber;
            case "*":
                return firstNumber * secondNumber;
            case "/":
                return firstNumber / secondNumber;
        }
    }

    let result = getResult()
    result = result.toFixed(8)
    result = parseFloat(result).toString();


    if (firstOperator === '/' && secondNumber === 0) {
        displayValue_1 = "";
        displayValue_2 = "undefined";
        updateDisplay_1()
        updateDisplay_2()
        displayValue_2 = ""
    }

    else if (secondOperator === "=" && isNaN(secondNumber)) {
        displayValue_2 = String(firstNumber)
        displayValue_1 = ""
        updateDisplay_1()
        updateDisplay_2()
    }

    else if (secondOperator === "=") {
        displayValue_1 = ""
        displayValue_2 = result
        updateDisplay_1()
        updateDisplay_2()

    } else {
        displayValue_1 = result + secondOperator
        displayValue_2 = ""
        updateDisplay_1()
        updateDisplay_2()
    }
}


