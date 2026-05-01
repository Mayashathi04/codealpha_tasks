const filterButtons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('fullScreenOverlay');
const fullImg = document.getElementById('fullScreenImage');
const fullTitle = document.getElementById('fullScreenTitle');
const fullHistory = document.getElementById('fullScreenHistory');
const closeBtn = document.querySelector('.close-btn');

// 1. Filtering Logic
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.textContent.toUpperCase();

        cards.forEach(card => {
            const cardTag = card.querySelector('.tag').textContent.toUpperCase();
            if (filterValue === 'ALL' || cardTag === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 2. Full Screen Click Logic
cards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        const history = card.querySelector('p').textContent;

        overlay.style.display = 'flex';
        fullImg.src = img.src;
        fullTitle.textContent = title;
        fullHistory.textContent = history;
    });
});

// 3. Close Logic
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

// This part of your script handles opening the lightbox
cards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        
        // Even though 'p' is display:none in CSS, JS can still read the text!
        const history = card.querySelector('p').textContent;

        overlay.style.display = 'flex';
        fullImg.src = img.src;
        fullTitle.textContent = title;
        fullHistory.textContent = history; // This displays the 2 lines in full screen
    });
});