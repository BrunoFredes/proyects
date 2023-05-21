const result = document.getElementById('result');
const buttons = document.querySelectorAll('.calculator button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (buttonText === '=') {
      evaluateExpression();
    } else if (buttonText === 'Clear') {
      clearDisplay();
    } else if (button.classList.contains('delete')) {
      deleteLastNumber();
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

function deleteLastNumber() {
  const currentValue = result.value;
  result.value = currentValue.slice(0, -1);
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

document.addEventListener('keydown', event => {
  const key = event.key;

  if (key === 'Delete' || key === 'Backspace') {
    const deleteButton = [...buttons].find(button => button.classList.contains('delete'));

    if (deleteButton) {
      deleteButton.click();
    }
  } else if (key === 'Enter') {
    const equalButton = [...buttons].find(button => button.textContent === '=');

    if (equalButton) {
      equalButton.click();
    }
  } else if (key.toLowerCase() === 'c') {
    const clearButton = [...buttons].find(button => button.textContent.toLowerCase() === 'clear');

    if (clearButton) {
      clearButton.click();
    }
  } else {
    const keyButton = [...buttons].find(button => button.textContent === key);

    if (keyButton) {
      keyButton.click();
    }
  }
});
