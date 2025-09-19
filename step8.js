/* --- The complete JavaScript code for the celebration screen --- */
document.addEventListener('DOMContentLoaded', () => {

    // Select all the elements we'll be animating
    const lightsContainer = document.querySelector('.lights-container');
    const balloonsContainer = document.querySelector('.balloons-container');
    const cakeContainer = document.querySelector('.cake-container');
    const finalBdayMessage = document.querySelector('.final-bday-message');
    const finalMessage = document.querySelector('.final-message');
    const signature = document.querySelector('.signature');
    const cornerGif = document.getElementById('cornerGif');
    
    // Select the buttons
    const turnOnLightsBtn = document.getElementById('turnOnLightsBtn');
    const decorateBtn = document.getElementById('decorateBtn');
    const happyBirthdayBtn = document.getElementById('happyBirthdayBtn');

    // Make the first button visible on page load
    turnOnLightsBtn.style.opacity = '1';
    turnOnLightsBtn.style.visibility = 'visible';
    
    // A function to show an element with a smooth transition
    function showElement(element) {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    }

    // A function to hide an element with a smooth transition
    function hideElement(element) {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
    }
    
    // --- Button Click Handlers ---

    // Turn On Lights
    turnOnLightsBtn.addEventListener('click', () => {
        hideElement(turnOnLightsBtn);
        showElement(lightsContainer);
        document.body.style.backgroundColor = '#e59bb3';
        setTimeout(() => {
            showElement(decorateBtn);
        }, 1000); // Show next button after a delay
    });

    // Let's Decorate
    decorateBtn.addEventListener('click', () => {
        hideElement(decorateBtn);
        showElement(balloonsContainer);
        
        // Animate balloons from the bottom
        const balloons = document.querySelectorAll('.balloons');
        balloons.forEach((balloon, index) => {
            setTimeout(() => {
                balloon.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                balloon.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Change background to GIF and show next button
        setTimeout(() => {
            document.body.style.backgroundImage = "url('https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyZTVkYnhtczVocWp0aWowa2x6NThkdGg1cm82dnFmenNtbHhuMG51NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4KhWPNyLHiB3TjVe/200w.webp')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center center";
            showElement(happyBirthdayBtn);
            
            // ⭐⭐⭐ NEW CODE TO START SONG AUTOMATICALLY ⭐⭐⭐
            // This is where we will trigger the song to play
            const happyBdaySong = document.getElementById('happyBdaySong');
            if (happyBdaySong) {
                happyBdaySong.play();
                happyBdaySong.loop = true;
            }
        }, 1500);
    });

    // Happy Birthday
    happyBirthdayBtn.addEventListener('click', () => {
        hideElement(happyBirthdayBtn);
        showElement(cakeContainer);

        // A function to trigger confetti
        function runConfetti() {
            const duration = 4 * 1000;
            const end = Date.now() + duration;
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }

        // Load confetti library if not already loaded
        if (!window.confetti) {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
            script.onload = () => runConfetti();
            document.body.appendChild(script);
        } else {
            runConfetti();
        }

        // Show final messages in a sequence
        setTimeout(() => {
            showElement(finalBdayMessage);
        }, 1000);
        setTimeout(() => {
            showElement(finalMessage);
        }, 2500);
        setTimeout(() => {
            showElement(signature);
        }, 4000);
        
        showElement(cornerGif);
    });
});
