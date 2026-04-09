let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq = 600, duration = 0.06, volume = 0.08) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(num) {
  playTone(600);
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay(currentValue);
}

function appendDecimal() {
  playTone(550);
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay(currentValue);
}

function setOperator(op) {
  playTone(700);
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || previousValue === null) return;
  playTone(900, 0.12);

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
  playTone(400, 0.08);
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay(currentValue);
}

function toggleSign() {
  playTone(650);
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay(currentValue);
}

function percent() {
  playTone(650);
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay(currentValue);
}
