// Variable to keep track of the current step
let currentStep = 1;
let userName = "My Queen";

const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const totalSteps = steps.length;
const audio = document.getElementById('happyBdaySong');

// Function to move to the next step
function nextStep() {
    // Hide the current step
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // Increment the step counter
    currentStep++;

    // Show the next step
    if (currentStep <= totalSteps) {
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgressBar();
    } else {
        // Handle the end of the journey if needed
        console.log("Journey complete!");
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to save the user's name
function saveName() {
    const nameInput = document.getElementById('nameInput');
    userName = nameInput.value || "My Queen"; // Use "My Queen" as a default if no name is entered
    document.getElementById('displayName').innerText = userName;
    document.getElementById('finalName').innerText = userName;
    document.getElementById('finalCelebrationName').innerText = userName;
    nextStep();
}

// Typing effect for step 3
const typingTextElement = document.getElementById('typingText');
const messages = [
  "Har din tumhari khushi dekhna chahta hu.",
  "Tum meri bestie nahi, family ho."
];
let messageIndex = 0;
let charIndex = 0;
let typingSpeed = 50;

function typeMessage() {
    if (messageIndex >= messages.length) {
        // All messages typed
        return;
    }
    const currentMessage = messages[messageIndex];
    if (charIndex < currentMessage.length) {
        typingTextElement.textContent += currentMessage.charAt(charIndex);
        charIndex++;
        setTimeout(typeMessage, typingSpeed);
    } else {
        // Move to the next message after a short delay
        setTimeout(() => {
            typingTextElement.textContent = "";
            charIndex = 0;
            messageIndex++;
            typeMessage();
        }, 1000);
    }
}

// Function to create floating hearts on click
function createHearts() {
    const heartCount = 10;
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // 3s to 5s duration
        floatingHeartsContainer.appendChild(heart);
    }
    
    // Start the typing effect after the first click
    if (messageIndex === 0) {
        typeMessage();
    }
}

// Typing effect for step 4
const step4QuoteElement = document.getElementById('step4Quote');
const step4QuoteText = "Khushnaseeb hai wo pal jab tum meri life me aayi, Tumhara pyaar aur dosti mere liye sabse bada gift hai.";
let quoteCharIndex = 0;
let quoteTypingSpeed = 70;

function typeQuote() {
    if (quoteCharIndex < step4QuoteText.length) {
        step4QuoteElement.textContent += step4QuoteText.charAt(quoteCharIndex);
        quoteCharIndex++;
        setTimeout(typeQuote, quoteTypingSpeed);
    }
}

// Function to handle the "Let's Celebrate" button
function letsCelebrate() {
    audio.play();
    nextStep();
}

// Functions for step 8 animations and events
function turnOnLights() {
    document.getElementById('lightsContainer').classList.add('active');
}

function letsDecorate() {
    document.getElementById('balloonsContainer').classList.add('active');
    // Here you would add logic for confetti
}

function showCake() {
    document.getElementById('cakeContainer').style.display = 'block';
}

function burnCandle() {
    // Add logic to burn the candle (e.g., animate a flame)
}

function cutTheCake() {
    // Add logic for cutting the cake
}

// Initial call to set up the first step
updateProgressBar();
