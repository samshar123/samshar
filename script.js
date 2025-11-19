// (If you haven't added this yet)
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("spotlight-grid");
    const cards = document.querySelectorAll(".command-card");

    grid.onmousemove = e => {
        for(const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    }
});

    
    // 1. LIVE TIME (Kerala)
    function updateNavClock() {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        
        // Update Desktop Clock
        const clockEl = document.getElementById('nav-clock');
        if(clockEl) clockEl.innerText = timeString;
    }
    setInterval(updateNavClock, 1000);
    updateNavClock();

    // 2. SCROLL PROGRESS
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        document.getElementById('scroll-fill').style.width = scrolled + "%";
    });

    // 3. MOBILE TOGGLE
    function toggleNav() {
        const overlay = document.getElementById('mobileMenu');
        const trigger = document.querySelector('.menu-trigger');
        const body = document.body;

        overlay.classList.toggle('active');
        trigger.classList.toggle('active');

        if (overlay.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }
