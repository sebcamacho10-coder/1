let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay(currentValue);
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay(currentValue);
}

function setOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || previousValue === null) return;

  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) {
        currentValue = 'Error';
        updateDisplay(currentValue);
        operator = null;
        previousValue = null;
        return;
      }
      result = a / b;
      break;
  }

  currentValue = parseFloat(result.toFixed(10)).toString();
  operator = null;
  previousValue = null;
  shouldResetDisplay = true;
  updateDisplay(currentValue);
}

function clearDisplay() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay(currentValue);
}

function toggleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay(currentValue);
}

function percent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay(currentValue);
}
