const result = document.querySelector('.result');
const length = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const number = document.getElementById('number');
const symbols = document.getElementById('symbols');
const clipboard = document.getElementById('clipboard');
const generate = document.getElementById('generate');

const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumbers,
    symbol: getRandomSymbols
};

// Event listener to generate password
generate.addEventListener('click', () => {
    const len = length.value;
    const lowerEl = lowercase.checked;
    const upperEl = uppercase.checked;
    const numberEl = number.checked;
    const symbolEl = symbols.checked;

    // Generate password and display it
    result.innerText = generatePassword(len, lowerEl, upperEl, numberEl, symbolEl);
});

// Function to generate password
function generatePassword(len, lowerEl, upperEl, numberEl, symbolEl) {
    let generatePassword = '';
    
    // Create an array of selected character types
    const typesArr = [
        { lower: lowerEl },
        { upper: upperEl },
        { number: numberEl },
        { symbol: symbolEl }
    ].filter(item => Object.values(item)[0]); // Filter out unchecked options

    // If no types are selected, return an empty string
    if (typesArr.length === 0) {
        return '';
    }

    // Generate password with selected character types
    for (let i = 0; i < len; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const randomKey = Object.keys(randomType)[0];
        generatePassword += randomFunc[randomKey]();
    }

    return generatePassword.slice(0, len); // Return final password
}

// Character generation functions
function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
    const symbol = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";
    return symbol[Math.floor(Math.random() * symbol.length)];
}

// Clipboard functionality
clipboard.addEventListener('click', () => {
    const password = result.innerText;
    if (password) {
        // Create a temporary input to copy the password to clipboard
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Password copied to clipboard!');
    } else {
        alert('Please generate a password first!');
    }
});
