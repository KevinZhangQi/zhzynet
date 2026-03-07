// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Add animation classes to elements
document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('fade-in');
    animateOnScroll.observe(card);
});

document.querySelectorAll('.benefit-card').forEach((card, index) => {
    if (index % 2 === 0) {
        card.classList.add('slide-in-left');
    } else {
        card.classList.add('slide-in-right');
    }
    animateOnScroll.observe(card);
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.classList.add('fade-in');
    animateOnScroll.observe(card);
});

// Sticky navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
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

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar .container').appendChild(mobileMenuButton);

const navLinks = document.querySelector('.nav-links');
mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuButton.classList.toggle('active');
});

// Add mobile styles
const mobileStyles = `
@media (max-width: 768px) {
    .nav-links {
        display: none;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nav-links.active {
        display: flex;
    }
    
    .mobile-menu-button {
        display: block;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary);
        cursor: pointer;
    }
    
    .mobile-menu-button.active i::before {
        content: "\\f00d";
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// Testimonial slider for mobile
const testimonialSlider = document.querySelector('.testimonial-slider');
let isDown = false;
let startX;
let scrollLeft;

testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialSlider.classList.add('active');
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
});

testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
});

testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
});

testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialSlider.scrollLeft = scrollLeft - walk;
});