
// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

//Resume download handler
const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://drive.google.com/file/d/1De4byim34eQe6vPe8moguXioOU4yr0V7/view?usp=drive_link', '_blank');
    });
}

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 17, 23, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat, .hero-content, .hero-image');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        const submitButton = contactForm.querySelector('.btn');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        fetch('/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(), // optional, if CSRF is enabled
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("✅ Message sent successfully!");
                contactForm.reset();
            } else {
                alert("❌ " + (data.error || 'Something went wrong.'));
            }
        })
        .catch(error => {
            alert('Something went wrong. Please try again.');
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Optional: CSRF token (only if using @csrf_protect instead of @csrf_exempt)
function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : '';
}


// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, "Hi, I'm Pratik Raut", 80);
        }, 500);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, "Full Stack Developer & Software Engineer", 60);
        }, 2500);
    }
});

// Add floating animation to skill items
function addFloatingAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('floating');
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 40);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start counter when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Add CSS for additional animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    .floating {
        animation: floating 3s ease-in-out infinite;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }

    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(31, 111, 235, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(31, 111, 235, 0); }
        100% { box-shadow: 0 0 0 0 rgba(31, 111, 235, 0); }
    }

    .btn-primary {
        animation: pulse 2s infinite;
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .hero-content {
        animation: slideInLeft 1s ease-out 0.5s both;
    }

    .hero-image {
        animation: slideInRight 1s ease-out 0.8s both;
    }

    .timeline-item:nth-child(odd) .timeline-content {
        animation: slideInLeft 0.8s ease-out both;
    }

    .timeline-item:nth-child(even) .timeline-content {
        animation: slideInRight 0.8s ease-out both;
    }

    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
        transition: all 0.3s ease;
    }

    .social-links a:hover {
        animation: pulse 1s infinite;
    }
`;
document.head.appendChild(animationStyles);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    addFloatingAnimation();
    animateCounters();
});
