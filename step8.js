document.addEventListener('DOMContentLoaded', () => {
    // Page load hone par sab buttons hide
    gsap.set('.step8-buttons-container .btn', { opacity: 0, visibility: 'hidden' });

    // Sirf pehla button dikhana  
    gsap.to('#turnOnLightsBtn', { opacity: 1, visibility: 'visible', duration: 1, delay: 0.5 });  
      
    // URL se name lena, agar na mile to default 'Meri Love' set karna  
    const params = new URLSearchParams(window.location.search);  
    const userName = params.get('name') || 'Meri Love';  
      
    document.getElementById('finalCelebrationName').textContent = userName;
});

function turnOnLights() {
    gsap.to('#turnOnLightsBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to('#lightsContainer', { opacity: 1, visibility: 'visible', duration: 1 });
    tl.to('.bulb', { opacity: 1, stagger: 0.2, duration: 1 }, "<");
    tl.to('#decorateBtn', { opacity: 1, visibility: 'visible' }, "+=1");
    gsap.to("body", { backgroundColor: "#e59bb3", duration: 1 });
}

function letsDecorate() {
    gsap.to('#decorateBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    const tlDecorate = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Banner ka animation yahan se hata diya gaya hai
    tlDecorate.to('.balloons', { opacity: 1, y: 0, stagger: 0.3, duration: 2, ease: 'power2.out', visibility: 'visible' });
    
    tlDecorate.to('#happyBirthdayBtn', { opacity: 1, visibility: 'visible' }, "+=0.5");

    document.body.style.backgroundImage = "url('https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyZTVkYnhtczVocWp0aWowa2x6NThkdGg1cm82dnFmenNtbHhuMG51NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4KhWPNyLHiB3TjVe/200w.webp')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
}

function happyBirthday() {
    gsap.to('#happyBirthdayBtn', { opacity: 0, visibility: 'hidden', duration: 0.5 });
    
    const tlFinal = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Cake show karein
    tlFinal.to('#cakeContainer', { opacity: 1, scale: 1, duration: 1.5, visibility: 'visible', ease: 'back.out(1.7)' });
    
    // Gaana aur confetti chalayein
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
    
    // Final messages show karein
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
