// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// TEMP CONVERTER Functions
function updateFormula() {
    const operation = document.getElementById("conversion-type").value;
    const selectionDisplay = document.getElementById("formula");

    if (operation === 'ftoc') {
        selectionDisplay.innerHTML = "C = (°F - 32) * 5/9";

    } else {
        selectionDisplay.innerHTML = "F = (°C * 9/5) + 32";
    }
}


function assessTemperature(temp, scale) {
    console.log("Assessing temperature:", temp, scale);

    const tempElement = document.getElementById("temp-assessment");
    let assessment = "";
    let color = "";

    // Temperature thresholds differ based on scale
    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; // Red
        }
    

    
    } else if (scale === "fahrenheit") {
        if (temp <= 32) {
            assessment = "Very Cold";
            color = "#3498db";
        } else if (temp < 50) {
            assessment = "Cold";
            color = "#7fb3d5";
        } else if (temp < 68) {
            assessment = "Cool";
            color = "#f39c12";
        } else if (temp < 86) {
            assessment = "Moderate";
            color = "#2ecc71";
        } else if (temp < 104) {
            assessment = "Warm";
            color = "#f39c12";
        } else {
            assessment = "Hot";
            color = "#e74c4c"
        }
      }


    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";

    }
// Function to perform temperature conversion based on selection
function convertTemperature() {
    const temperatureInput = document.getElementById("temperature").value;
    const temperatureValue = parseFloat(temperatureInput);
  
    const conversionType = document.getElementById("conversion-type").value;
    
    // Get the result element
    const resultElement = document.getElementById("conversion-result");
    
    // Validate that the input is a number
    if (isNaN(temperatureValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }
    
    let result;

    if (conversionType === "ftoc") {
        result = (temperatureValue - 32) * 5/9;
        resultElement.textContent = `${temperatureValue}°F = ${result.toFixed(2)}°C`;
        assessTemperature(result, "celsius");
    } else {
        result = (temperatureValue * 9 / 5) + 32;
        resultElement.textContent = `${temperatureValue}°C = ${result.toFixed(2)} °F`;
        assessTemperature(result, "fahrenheit");
    }
    // please write the body of the function as specified above
}

function clearConverter() {
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("temp-assessment").textContent = "";
}


// Task List Functions
// 2D Array to store tasks - each task is [taskText, priority]
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
// TODO
/* 1. Create a function that validates the date string in MM/DD format
   2. Check if the string has exactly one '/' character
   3. Split the string by '/' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if month is between 1-12
   7. Check if day is valid for the given month (use an array for days in each month)
   8. Return true if date is valid, false otherwise
*/


function validateDate(dateStr) {
  if (dateStr.indexOf('/') !== dateStr.lastIndexOf('/') || dateStr.indexOf('/') === -1) {
  return false;
}

const parts = dateStr.split('/');
if (parts.length !== 2) return false;

const monthStr = parts[0];
const dayStr = parts[1];

if (monthStr.length !== 2 || dayStr.length !== 2) {
  return false;
}

for (let i = 0; i < monthStr.length; i++) {
  if (monthStr.charCodeAt(i) < 48 || monthStr.charCodeAt(i) > 57) {
    return false;
  }
}

for (let i = 0; i < dayStr.length; i++ ) {
  if (dayStr.charCodeAt(i) < 48 || dayStr.charCodeAt(i) > 57) {
    return false;
  }
} 


const monthNum = parseInt(monthStr, 10);
const dayNum = parseInt(dayStr, 10);

if (monthNum < 1 || monthNum > 12) {
  return false;
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (dayNum < 1 || dayNum > daysInMonth[monthNum - 1]){
  return false;
}

return true;

}

  // write the body of this function please


// Function to validate time in 24-hour format (HH:MM)
// TODO
/* 1. Create a function that validates the time string in 24-hour (HH:MM) format
   2. Check if the string has exactly one ':' character
   3. Split the string by ':' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if hours are between 0-23
   7. Check if minutes are between 0-59
   8. Return true if time is valid, false otherwise
*/
function validateTime(timeStr) {
  if (timeStr.indexOf(':') !== timeStr.lastIndexOf(':') || timeStr.indexOf(':') === -1) {
    return false;
  }

  const parts = timeStr.split(':');
  if (parts.length !== 2) return false;

  const hourStr = parts[0];
  const minuteStr = parts[1];

  if (hourStr.length !== 2 || minuteStr.length !== 2) {
    return false;
  }

  for (let char of hourStr + minuteStr) {
    if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) {
      return false;
    }
  }

  const hours = parseInt(hourStr);
  const minutes = parseInt(minuteStr);

  if (hours < 0 || hours > 23) {
    return false;
  }

  if (minutes < 0 || minutes > 59) {
    return false;
  }

  return true;

  // write the body of this function please
}


function calculatePriority(dateStr, timeStr) {
 

  const currentYear = new Date().getFullYear();
  
  // Parse the date and time
  // write the code to parse the date and time
  const [month, day] = dateStr.split('/').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // Create a date object for the due date
  // write the code to create a date object for the due date
  const dueDate = new Date(currentYear, month - 1, day, hours, minutes);

  
  // For sorting, we'll use a more precise priority based on exact timestamp
  // Return the timestamp itself for more accurate sorting
  return dueDate.getTime();
}

function addTask() {
    const taskText = taskInput.value.trim();
    const dateStr = dateInput.value.trim();
    const timeStr = timeInput.value.trim();

    // Validate inputs
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    if (!validateDate(dateStr)) {
        alert("Invalid date format. Use MM/DD.");
        return;
    }

    if (!validateTime(timeStr)) {
        alert("Invalid time format. Use HH:MM (24-hour).");
        return;
    }

    const priority = calculatePriority(dateStr, timeStr);
    tasks.push([taskText, priority]);
    taskDueDates.push([dateStr, timeStr]);

    // Sort tasks by priority (earliest first)
    tasks.sort((a, b) => a[1] - b[1]);

    // Re-render task list
    renderTaskList();

    // Clear input fields
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
}

function renderTaskList() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${task[0]} (Due: ${taskDueDates[index][0]} at ${taskDueDates[index][1]})`;
        taskList.appendChild(listItem);
    });
}

function addRandomTask() {
    const randomIndex = Math.floor(Math.random() * randomTasks.length);
    const taskText = randomTasks[randomIndex];
    taskInput.value = taskText;  // Just insert into the input field
}


function clearTasks() {
    tasks = [];
    taskDueDates = [];
    renderTaskList();
}



// Function to add a task
// Global Variables
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize display
display.value = "0";

// Functions for calculator operations
function appendToDisplay(value) {
    // If we just completed a calculation and start typing a new number
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }
    
    // If waiting for right operand, start a new input
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        // Handle leading zero
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
    
    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory.toString();
    currentInput = display.value;
    calculationDone = true;
}

function addToMemory() {
    try {
        // TODO: Replace this with safer code
        const result = evaluateExpression(display.value);
        if (!isNaN(result)) {
            memory += result;
            console.log("Memory updated: ", memory);
     } else {
      throw new Error("Invalid input");
    } 
} catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        // TODO: Replace this with safer code
        const result = evaluateExpression(display.value);
        if (!isNaN(result)) {
            memory -= result;
    } else {
        throw new Error("Invalid input");
    } 
} catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

/* Implement a function that parses and calculates mathematical expressions
   1. Create a function named evaluateExpression that takes an expression string as input
   2. First, handle simple number case: if the expression is a number, return it as a float
   3. Create an array to store tokens (numbers and operators)
   4. Loop through each character in the expression
   5. If the character is an operator (+, -, *, /), add the current number to tokens and then add the operator
   6. If the character is a digit or decimal point, add it to the current number string
   7. After the loop, add any remaining number to tokens
   8. Process multiplication and division first (following order of operations)
   9. Then process addition and subtraction
   10. Return the final calculated result
*/
function evaluateExpression(expression) {
     // If it's a simple number, return it
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }
    
    // Create a tokenizer to parse the expression
    const tokens = [];
    let currentNumber = '';
    
    // Tokenize the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNumber !== '') {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            if (tokens.length % 2 === 0) {
                throw new Error("Incomplete expression");
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentNumber += char;
        }
    }
    
    // Push the last number if exists
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }
    
    // Process multiplication and division first
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            tokens[i-1] = tokens[i-1] * tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        } else if (tokens[i] === '/') {
            tokens[i-1] = tokens[i-1] / tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        }
    }
    
    // Process addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += tokens[i+1];
        } else if (tokens[i] === '-') {
            result -= tokens[i+1];
        }
    }
    
    return result;
}


function insertMathFunction(func) {
    try {
        const value = parseFloat(display.value);

        switch (func) {
            case 'sqrt':
                if (value < 0) throw new Error("Invalid input for sqrt");
                history.textContent = `√(${value})`;
                display.value = Math.sqrt(value);
                break;
            case 'abs':
                history.textContent = `abs(${value})`;
                display.value = Math.abs(value);
                break;
            case 'sin':
                history.textContent = `sin(${value})`;
                display.value = Math.sin(value);
                break;
            case 'cos':
                history.textContent = `cos(${value})`;
                display.value = Math.cos(value);
                break;
            case 'tan':
                history.textContent = `tan(${value})`;
                display.value = Math.tan(value);
                break;
            case 'asin':
                history.textContent = `asin(${value})`;
                display.value = Math.asin(value);
                break;
            case 'acos':
                history.textContent = `acos(${value})`;
                display.value = Math.acos(value);
                break;
            case 'atan':
                history.textContent = `atan(${value})`;
                display.value = Math.atan(value);
                break;
            case 'log':
                if (value <= 0) throw new Error("Invalid input for log");
                history.textContent = `log(${value})`;
                display.value = Math.log10(value);
                break;
            case 'exp':
                history.textContent = `exp(${value})`;
                display.value = Math.exp(value);
                break;
            case 'round':
                history.textContent = `round(${value})`;
                display.value = Math.round(value);
                break;
            case 'ceil':
                history.textContent = `ceil(${value})`;
                display.value = Math.ceil(value);
                break;
            case 'floor':
                history.textContent = `floor(${value})`;
                display.value = Math.floor(value);
                break;
        }

        calculationDone = true;
        currentInput = display.value;
    } catch (e) {
        display.value = "Error";
    }
    // Your code here
}


function insertMathConstant(constant) {
    if (constant === 'Math.PI') {
        display.value = Math.PI;
        history.textContent = "π";
    } else if (constant === 'Math.E') {
        display.value = Math.E;
        history.textContent = "e";
    } else if (constant === 'Math.LN2') {
        display.value = Math.LN2;
        history.textContent = "ln2";
    } else if (constant === 'Math.LN10') {
        display.value = Math.LN10;
        history.textContent = "ln10";
    }

    currentInput = display.value;
    calculationDone = true;
}


function calculate() {
   try {
        if (currentOperator === "pow" && leftOperand !== null) {
            // Handle power operation
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            // Handle normal operations
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}



// TIMER APP FUNCTIONS
let countdownInterval;
let remainingTime = 0;

function startCountdown() {
    const secondsInput = document.getElementById("seconds").value;
    const motivationDisplay = document.getElementById("motivation");
    const timerDisplay = document.getElementById("timer");
    const statusDisplay = document.getElementById("status");

    const seconds = parseInt(secondsInput);
    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a positive number of seconds.");
        return;
    }

    clearInterval(countdownInterval);
    remainingTime = seconds;

    updateTimerDisplay();
    motivationDisplay.textContent = "Keep going! You can do it!";
    statusDisplay.textContent = "Timer is running...";

    countdownInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            motivationDisplay.textContent = "Time's up! Great job!";
            statusDisplay.textContent = "Completed!";
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById("timer");
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(countdownInterval);
    remainingTime = 0;
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("motivation").textContent = "Enter seconds and start the timer for motivation!";
    document.getElementById("status").textContent = "";
}



// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}


// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}

// Contacts App Functions
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
        `;
        contactsList.appendChild(div);
    });
}

function updateJSONDisplay() {
    const jsonContent = document.getElementById('json-content');
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayContacts();
        return;
    }
    
    const filteredContacts = contactsData.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.type.toLowerCase().includes(searchTerm);
    });
    
    displayContacts(filteredContacts);
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    let newId;
    if (contactsData.contacts.length > 0) {
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        newId = 1;
    }
    
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    contactsData.contacts.push(newContact);
    document.getElementById('contact-form').reset();
    displayContacts();
    updateJSONDisplay();
    alert('Contact added successfully!');
    switchTab('view');
    
    return false;
}

function resetSearch() {
    document.getElementById('search-input').value = '';
    displayContacts();
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}

// Initialize contacts on load
window.addEventListener('load', function() {
    displayContacts();
    updateJSONDisplay();
});
