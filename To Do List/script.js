const result = document.getElementById('result');
const buttons = document.querySelectorAll('.calculator button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    
    if (buttonText === '=') {
      evaluateExpression();
    } else if (buttonText === 'Clear') {
      clearDisplay();
    } else {
      appendToDisplay(buttonText);
    }
  });
});

function appendToDisplay(value) {
  result.value += value;
}

function clearDisplay() {
  result.value = '';
}

function evaluateExpression() {
  try {
    const expression = result.value;
    const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
    const resultValue = eval(sanitizedExpression);
    
    if (Number.isFinite(resultValue)) {
      result.value = resultValue;
    } else {
      result.value = 'Error';
    }
  } catch (error) {
    result.value = 'Error';
    console.error(error);
  }
}
