let counter = 1;
let numbers = {
    number1: '',
    number2: '',
    operator: '',
    result: '',
};

function add(num1,num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 + num2;
}

function subtract(num1,num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 - num2;
}

function multiply(num1,num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    return num1*num2;
}

function divide(num1,num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    let number = num1/num2;

    return number;
}

function operate(operator, num1, num2) {
    if(operator === 'add') {
        return add(num1,num2);
    } else if(operator === 'subtract') {
        return subtract(num1,num2);
    } else if(operator === 'multiply') {
        return multiply(num1,num2);
    } else {
        return divide(num1,num2);
    } 
}



function display(event) {
    const bottomScreen = document.querySelector('.bottomDisplay');
    if(event.target.className !== 'operator') {
        if(event.target.className === 'decimal') {
            if(bottomScreen.textContent.includes('.')) {
                bottomScreen.textContent = bottomScreen.textContent;
            } else {
                bottomScreen.textContent += '.';
            }
        }else if(event.target.className === 'result') {
            const topScreen = document.querySelector('.topDisplay');
            bottomScreen.textContent = '';
            numbers['result'] = operate(numbers.operator,numbers.number1,numbers.number2);
            topScreen.textContent = numbers.result;
            counter = 1;
        }
        else{
            bottomScreen.textContent += event.target.value;
            numbers[`number${counter}`] = bottomScreen.textContent;
        }
    } else if(event.target.className === 'operator') {
        const topScreen = document.querySelector('.topDisplay');
        topScreen.textContent +=bottomScreen.textContent + ' ' + event.target.textContent;
        bottomScreen.textContent ='';
        counter = 2;
        if(numbers['number1'] && numbers['number2'] && numbers['operator']) {
            numbers['result'] = operate(numbers.operator,numbers.number1,numbers.number2);
            topScreen.textContent = numbers['result'] + ' ' + event.target.textContent;
            numbers['number1'] = numbers['result'];
            numbers['number2'] = '';
            numbers['result'] = '';
        }
        numbers['operator'] = event.target.value;
        
    }
    console.log(numbers);

}

function erase (event) {
    const topScreen = document.querySelector('.topDisplay');
    const bottomScreen = document.querySelector('.bottomDisplay');
    if(event.target.textContent === 'CLEAR') {
        topScreen.textContent = '';
        bottomScreen.textContent = '';
        counter = 1;
        numbers = {
            number1: '',
            number2: '',
            operator: '',
            result: '',
        }
    } else {
        bottomScreen.textContent = bottomScreen.textContent.slice(0,bottomScreen.textContent.length -1);
    }
}


const userInput = document.querySelector('.btnsContainer');
const buttons = userInput.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('mousedown', display)
});

const delClear = document.querySelector('.clearDelBtn');
const clearDelete = delClear.querySelectorAll('button');
clearDelete.forEach((button) => {
    button.addEventListener('mousedown', erase);
});
