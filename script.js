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



    document.addEventListener("DOMContentLoaded", () => {
        const stackWrapper = document.getElementById('home-stack-wrapper');

        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                // 1. Slice only the first 5 projects
                const featuredProjects = data.slice(0, 5);

                // 2. Loop and create HTML for each
                featuredProjects.forEach((project, index) => {
                    // Calculate top position for sticky effect (10vh + index*2vh)
                    const topValue = 10 + (index * 2);
                    // Calculate ID for CSS targeting if needed
                    const cardId = `card-${index + 1}`;
                    // Format index (01, 02...)
                    const num = (index + 1).toString().padStart(2, '0');

                    const html = `
                        <div class="stack-card" id="${cardId}" style="top: ${topValue}vh;">
                            <div class="card-body">
                                <div class="card-left">
                                    <span class="stack-num">${num}</span>
                                    <h3>${project.company}</h3>
                                    <div class="stack-tags">
                                        <span>${project.category}</span>
                                    </div>
                                    <p>${project.title}</p> <a href="project.html?id=${project.id}" class="btn-stack">VIEW CASE STUDY ↗</a>
                                </div>
                                <div class="card-right">
                                    <img src="${project.thumbnail}" alt="${project.company}">
                                </div>
                            </div>
                        </div>
                    `;
                    stackWrapper.insertAdjacentHTML('beforeend', html);
                });

                // 3. Add the Final CTA Card (Static)
                const finalTop = 10 + (featuredProjects.length * 2);
                const finalCardHTML = `
                    <div class="stack-card final-cta" style="top: ${finalTop}vh;">
                        <div class="card-body centered">
                            <h2>SEEN ENOUGH?</h2>
                            <a href="works.html" class="big-cta-btn">EXPLORE FULL PORTFOLIO</a>
                        </div>
                    </div>
                `;
                stackWrapper.insertAdjacentHTML('beforeend', finalCardHTML);
            })
            .catch(error => console.error('Error loading projects:', error));
    });
