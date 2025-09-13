// --- State ---
let currentStep = 1;
const totalSteps = 7;
let userName = "Meri Love";

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
    createPetals();
});

// ---- STEP HANDLER ----
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`step${step}`);
    if (el) el.classList.add('active');

    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBar", {
        width: `${progressPercentage}%`,
        duration: 0.8,
        ease: "power2.out"
    });

    switch (step) {
        case 2:
            gsap.from("#step2 h2", { opacity: 0, y: -30, duration: 1 });
            break;
        case 3:
            const nameSpan = document.getElementById('displayName');
            if (nameSpan) nameSpan.textContent = userName;
            const msg = document.getElementById('heartMessage');
            if (msg) {
                msg.classList.add('show');
            }
            gsap.from("#step3 h2", { opacity: 0, scale: 0.5, duration: 1, ease: "back.out(1.7)" });
            setTimeout(() => {
                typeMessage();
            }, 500);
            break;
        case 4:
            const typedMsgBox = document.getElementById('typedMessage');
            if (typedMsgBox) {
                typedMsgBox.classList.add('show');
            }
            gsap.from("#step4 .message-box", { opacity: 0, scale: 0.8, duration: 1.2, ease: "back.out(1.7)" });
            typeQuote(); // Start the first quote typing
            break;
        case 5:
            gsap.from(".polaroid", { y: 100, opacity: 0, stagger: 0.15, duration: 0.9, ease: "back.out(1.7)" });
            break;
        case 6:
            gsap.from("#step6 h1", { opacity: 0, y: 40, duration: 1, ease: "power2.out" });
            break;
        case 7:
            gsap.from("#step7 h1", { opacity: 0, y: 40, duration: 1, ease: "power2.out" });
            break;
    }
}

// ---- NEXT ----
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

// ---- NAME HANDLING ----
function updateUserNameElements() {
    const nameElements = ['displayName', 'finalName'];
    nameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = userName;
        }
    });
}

function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();

    if (nameInput === '') {
        gsap.to(".name-input", {
            backgroundColor: "#ffebee",
            borderColor: "#e53935",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        });
        alert("Please apna pyaara naam likho 💗");
    } else if (nameInput.toLowerCase() === 'priyanshi') {
        userName = 'Priyanshi';
        updateUserNameElements();
        nextStep();
        gsap.to(".name-input", {
            backgroundColor: "#e8f5e9",
            borderColor: "#81c784",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        });
    } else {
        gsap.to(".name-input", {
            backgroundColor: "#ffebee",
            borderColor: "#e53935",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        });
        alert("Sorry, this is not a surprise for you. 🥲");
    }
}

// ---- FLOATING HEARTS ----
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab'];
    let total = Math.floor(10 + Math.random() * 3);
    for (let i = 0; i < total; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = `${20 + Math.random() * 60}%`;
        heart.style.top = `${50 + Math.random() * 20}%`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = `${3 + Math.random() * 2}s`;
        heart.style.fontSize = `${28 + Math.random() * 20}px`;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    gsap.to("#interactiveHeart", { scale: 1.3, duration: 0.25, yoyo: true, repeat: 1 });
}

// ---- FALLING PETALS ----
function createPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;
    const colors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const type = Math.floor(Math.random() * 3);
        let path = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0";
        if (type === 1) path = "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0";
        if (type === 2) path = "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0";
        petal.style.width = `${10 + Math.random() * 20}px`;
        petal.style.height = `${10 + Math.random() * 20}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = '-20px';
        petal.style.opacity = 0.8;
        petal.innerHTML = `<svg viewBox="0 0 100 50" width="100%" height="100%"><path d="${path}" fill="${colors[Math.floor(Math.random() * colors.length)]}" /></svg>`;
        container.appendChild(petal);
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        const sway = 50 + Math.random() * 100;
        gsap.to(petal, {
            y: window.innerHeight + 50,
            x: `+=${sway}`,
            rotation: 360,
            duration,
            delay,
            ease: "none",
            onComplete: () => {
                petal.remove();
            }
        });
    }
}

// ---- TYPEWRITER MESSAGES (Step 3 & 4) ----
function typeMessage() {
    const message = `Har dhadkan ke saath tera hi naam aata hai 🫀,
Har khushi ke sath tera hi ehsaas aata hai 😊,
Tu mile ya na mile zindagi ke safar me 💗,
Aage ki line tu khud soch liyo mujhe nhi aa rahi`;
    const typingText = document.getElementById('typingText');
    let i = 0;
    function type() {
        if (i < message.length) {
            typingText.innerHTML += message.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    if (typingText) {
        typingText.innerHTML = "";
        type();
    }
}

function typeQuote() {
    const quote1 = `Teri baaton pr dil haru,
       Teri surat pr jaan varu..
       jis din tumhara msg nhi aata,
       Man karta hai patak patak ke maaru..
       
       🤭🤭`;
    const quoteEl = document.getElementById('step4Quote');
    let i = 0;
    function type() {
        if (i < quote1.length) {
            quoteEl.innerHTML += quote1.charAt(i);
            i++;
            setTimeout(type, 70);
        } else {
            // After typing, wait, then start deleting
            setTimeout(() => deleteQuote(quote1), 3000); // 3-second delay before deleting
        }
    }
    if (quoteEl) {
        quoteEl.innerHTML = "";
        type();
    }
}

function deleteQuote(quoteToDelete) {
    const quoteEl = document.getElementById('step4Quote');
    let i = quoteToDelete.length;
    function del() {
        if (i >= 0) {
            quoteEl.innerHTML = quoteToDelete.substring(0, i);
            i--;
            setTimeout(del, 50); // Speed of deletion
        } else {
            // After deleting, wait, then type the next quote
            setTimeout(typeNextQuote, 1000); // 1-second delay before typing next quote
        }
    }
    if (quoteEl) {
        del();
    }
}

function typeNextQuote() {
    const quote2 = `Kaash Tu chaand aur mai sitara hota..
Asmaan me ashiyaana hamara hota..
Log tumhe door se dekhte..
Paas se dekhne ka huq sirf..
hamara hota..!❤️🌙`;
    const quoteEl = document.getElementById('step4Quote');
    let i = 0;
    function type() {
        if (i < quote2.length) {
            quoteEl.innerHTML += quote2.charAt(i);
            i++;
            setTimeout(type, 70);
        }
    }
    if (quoteEl) {
        quoteEl.innerHTML = ""; // Ensure it's empty before starting new type
        type();
    }
}

// Ye function user ko Reel.html par redirect karega
function Watchreel() {
    window.location.href = `Reel.html`;
}
