document.addEventListener('DOMContentLoaded', () => {
    // Ye code page load hote hi chalega
    const initialButtons = document.querySelectorAll('.step8-buttons-container .btn');
    initialButtons.forEach(btn => {
      btn.style.opacity = 0;
      btn.style.visibility = 'hidden';
    });
    
    // Sirf pehla button dikhao
    gsap.to('#turnOnLightsBtn', { opacity: 1, visibility: 'visible', duration: 1, delay: 0.5 });
    
    // User ka naam URL se lo
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name') || "Meri Love";
    document.getElementById('finalCelebrationName').textContent = userName;
});

function turnOnLights() {
    gsap.to('#turnOnLightsBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to('#lightsContainer', { opacity: 1, visibility: 'visible', duration: 1 });
    tl.to('.bulb', { opacity: 1, stagger: 0.2, duration: 1 }, "<");
    tl.to('#decorateBtn', { opacity: 1, visibility: 'visible' }, "+=1");
}

function letsDecorate() {
    gsap.to('#decorateBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tlDecorate = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tlDecorate.to('#happyBdayBanner', { opacity: 1, y: 0, visibility: 'visible', duration: 1.5 });
    tlDecorate.to('.balloons', { opacity: 1, y: 0, stagger: 0.3, duration: 2, ease: 'power2.out', visibility: 'visible' }, "-=1");
    tlDecorate.to('#deliciousCakeBtn', { opacity: 1, visibility: 'visible' }, "+=0.5");
}

function showCake() {
    gsap.to('#deliciousCakeBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tlCake = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
    tlCake.to('#cakeContainer', { opacity: 1, scale: 1, duration: 1.5, visibility: 'visible' })
        .to('#burnCandleBtn', { opacity: 1, visibility: 'visible' }, "-=0.5");
}

function burnCandle() {
    gsap.to('#burnCandleBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tlCandle = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tlCandle.to('#customCakeVideo', { opacity: 1, scale: 1.1, duration: 1, yoyo: true, repeat: 1 });
    tlCandle.to('#cutCakeBtn', { opacity: 1, visibility: 'visible' }, "+=0.5");
}

function cutTheCake() {
    gsap.to('#cutCakeBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const song = document.getElementById('happyBdaySong');
    if (song) {
        song.play();
        song.loop = true;
    }
    if (!window.confetti) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
        script.onload = () => runFinalConfetti();
        document.body.appendChild(script);
    } else {
        runFinalConfetti();
    }
    const finalBdayMessage = document.getElementById('finalBdayMessage');
    const finalMessage = document.getElementById('finalMessage');
    const signature = document.getElementById('step8-signature');
    gsap.to(finalBdayMessage, { opacity: 1, duration: 1.5, delay: 0.5, visibility: 'visible' });
    gsap.to(finalMessage, { opacity: 1, duration: 1.5, delay: 2, visibility: 'visible' });
    gsap.to(signature, { opacity: 1, duration: 1.5, delay: 3.5, visibility: 'visible' });
}

function runFinalConfetti() {
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
