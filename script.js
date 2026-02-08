// Smooth scroll for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add parallax effect to background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.answer, .stop-overengineering');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.backgroundPositionY = `${yPos}px`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add hover effect to list items with slight delay
const listItems = document.querySelectorAll('ul li');
listItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        body.style.animation = '';
        style.remove();
    }, 5000);
}

// Add typing effect to main title (runs once on load)
const mainTitle = document.querySelector('.main-title');
if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    mainTitle.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (charIndex < text.length) {
            mainTitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 300);
}

// Add click counter for fun
let clickCount = 0;
const finalWord = document.querySelector('.final-word');

if (finalWord) {
    finalWord.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            finalWord.style.animation = 'shake 0.5s';
            setTimeout(() => {
                finalWord.style.animation = '';
            }, 500);
        }
        
        if (clickCount === 10) {
            const messages = [
                "Okay, you REALLY get it now.",
                "Seriously, just use a monolith.",
                "Stop clicking and go build something.",
                "I'm not going to change my mind.",
                "MONOLITH. M-O-N-O-L-I-T-H."
            ];
            alert(messages[Math.floor(Math.random() * messages.length)]);
            clickCount = 0;
        }
    });
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add subtle mouse movement parallax
document.addEventListener('mousemove', debounce((e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const header = document.querySelector('header');
    if (header) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        header.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}, 50));

console.log('🎯 Just Fucking Use a Monolith - Website loaded successfully!');
console.log('💡 Pro tip: Try the Konami code for a surprise...');
