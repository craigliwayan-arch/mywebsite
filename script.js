document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    let yesSize = 2;           // initial font size in em
    let noClickCount = 0;        // ← new counter
    const maxNoClicks = 20;      // disappears after this many clicks

    // ── Yes button grows ───────────────────────────────────────
    noBtn.addEventListener('click', () => {
		noClickCount++;
        // Grow Yes button
        yesSize += 2;
        yesBtn.style.fontSize = `${yesSize}em`;
        yesBtn.style.padding = `${10 + (yesSize - 2) * 10}px ${20 + (yesSize - 2) * 20}px`;

        // Make No button run away to random position
        moveNoButton();
		
		// After 10 clicks → hide / remove the No button
        if (noClickCount >= maxNoClicks) {
            noBtn.style.transition = 'opacity 0.8s ease';
			noBtn.style.opacity = '0';
			setTimeout(() => {
				noBtn.remove();
			}, 900);
			
			// make Yes button very prominent after No is gone
        yesBtn.style.fontSize = '2.8em';
        yesBtn.style.padding = '20px 60px';
        yesBtn.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.5)';

        // update the question text
        const p = document.querySelector('.question-wrapper p') || document.querySelector('p');
        if (p) {
            p.textContent = "Looks like 'No' ran out of places to hide... 😏💕";
            p.style.color = '#d81b60';
            p.style.fontWeight = 'bold';
        }
        }
    });

    // ── Yes button clicked → celebration ───────────────────────
    yesBtn.addEventListener('click', () => {
    window.location.href = 'yes.html';   // Redirect to the yes page
	});

    // ── Move No button to random position inside container ─────
    function moveNoButton() {
    const wrapper = document.querySelector('.question-wrapper');
    if (!wrapper) return;  // safety

    const rect = wrapper.getBoundingClientRect();

    // How far from center the button is allowed to wander (in pixels)
    const maxOffsetX = 200;   // ← adjust this: smaller = stays very close, larger = more area
    const maxOffsetY = 150;

    // Random offset from the center of the wrapper
    const randomX = (Math.random() * maxOffsetX * 2) - maxOffsetX;  // -140 to +140
    const randomY = (Math.random() * maxOffsetY * 2) - maxOffsetY;  // -100 to +100

    // Center of the wrapper relative to itself
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // New position (relative to .question-wrapper)
    const newLeft = centerX + randomX - (noBtn.offsetWidth / 2);   // center the button
    const newTop  = centerY + randomY - (noBtn.offsetHeight / 2);

    // Apply
    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top  = `${newTop}px`;

    // Optional: small rotation for fun
    const angle = (Math.random() - 0.5) * 30;   // -15° to +15°
    noBtn.style.transform = `translate(0,0) rotate(${angle}deg)`;
}

    // Optional: give No button absolute positioning from the start
    // (makes movement smoother - do this once on load)
    noBtn.style.position = 'absolute';
    noBtn.style.transition = 'all 0.4s ease-out';
});