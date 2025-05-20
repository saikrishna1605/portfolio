// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// DOM Elements
const pageLoader = document.getElementById('pageLoader');
const backToTopButton = document.getElementById('backToTop');
const progressBars = document.querySelectorAll('.progress-fill');

// Navigation functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const navHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = section.offsetTop - navHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Back to top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize page
window.addEventListener('load', () => {
    pageLoader.style.display = 'none';
    
    // Animate progress bars
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
});

// Projects data - enhanced with more details
const projects = [
    {
        title: "AI Data Driven Student Mentoring System",
        category: "ai",
        image: "/api/placeholder/600/400",
        description: "Built an AI-driven student mentoring system that automates paperwork. Reduced manual paperwork by 90% and improved student engagement tracking.",
        tech: ["HTML", "CSS", "JavaScript", "MongoDB", "Node.js", "Chart JS"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "AI-Powered Personalized Email Generator",
        category: "ai",
        image: "/api/placeholder/600/400",
        description: "Built an AI-driven tool that generates personalized emails instantly. Automated email drafting, reducing effort while ensuring contextual accuracy.",
        tech: ["Fast API", "Firebase", "SendGrid", "Google AI Studio"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "Personal Portfolio Website",
        category: "web",
        image: "/api/placeholder/600/400",
        description: "Modern responsive portfolio website built with HTML, CSS, and JavaScript featuring animations and dark mode.",
        tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "AOS"],
        github: "#",
        demo: "#",
        featured: false
    },
    {
        title: "E-commerce Mobile App",
        category: "mobile",
        image: "/api/placeholder/600/400",
        description: "Full-featured shopping app with user authentication, product catalog, cart functionality, and payment processing.",
        tech: ["React Native", "Redux", "Firebase", "Stripe API"],
        github: "#",
        demo: "#",
        featured: false
    }
];

// Enhanced Project filtering with animations
function loadProjects(filter = 'all') {
    const projectsContainer = document.querySelector('#projects .grid');
    
    // If container doesn't exist, create it
    if (!projectsContainer) {
        const container = document.querySelector('#projects .container');
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 mt-8';
        container.appendChild(grid);
        
        // Reload function with the new container
        return loadProjects(filter);
    }
    
    // Clear existing projects with fade-out animation
    const existingProjects = projectsContainer.querySelectorAll('.project-card');
    if (existingProjects.length > 0) {
        existingProjects.forEach(project => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
        });
        
        // Wait for animation to finish before updating
        setTimeout(() => {
            updateProjectsHTML();
        }, 300);
    } else {
        updateProjectsHTML();
    }
    
    function updateProjectsHTML() {
        const filteredProjects = projects.filter(project => filter === 'all' || project.category === filter);
        
        projectsContainer.className = 'projects-grid';
        projectsContainer.innerHTML = filteredProjects.map((project, index) => `
            <div class="project-card" data-category="${project.category}" data-aos="fade-up" data-aos-delay="${index * 100}">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                <div class="project-content">
                    <div>
                        <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
                        <p class="text-gray-300">${project.description}</p>
                        <div class="tech-stack">
                            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <a href="${project.github}" class="hover:text-blue-400 transition-colors duration-300">
                            <i class="fab fa-github mr-1"></i> Source
                        </a>
                        <a href="${project.demo}" class="hover:text-blue-400 transition-colors duration-300">
                            <i class="fas fa-external-link-alt mr-1"></i> Demo
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize AOS for new elements
        AOS.refresh();
        
        // Add 3D tilt effect to cards
        addTiltEffect();
    }
}

// Add click event listeners to project filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadProjects(btn.dataset.filter);
    });
});

// Form Submission with better error handling and validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loader
    pageLoader.style.display = 'block';
    
    // Simulate form submission
    setTimeout(() => {
        // Display success message
        const formElements = contactForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
        }
        
        showFormMessage('Your message has been sent. I\'ll get back to you soon!', 'success');
        
        // Hide loader
        pageLoader.style.display = 'none';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = false;
            }
            
            // Remove success message
            const message = contactForm.querySelector('.form-message');
            if (message) {
                message.classList.add('opacity-0');
                setTimeout(() => message.remove(), 300);
            }
        }, 5000);
    }, 1500);
});

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper function to show form messages
function showFormMessage(text, type) {
    // Remove any existing messages
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message transition-opacity duration-300 px-4 py-3 rounded relative mt-4 ${
        type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
    }`;
    
    messageDiv.innerHTML = `
        <strong class="font-bold">${type === 'success' ? 'Success!' : 'Error!'}</strong>
        <span class="block sm:inline"> ${text}</span>
    `;
    
    contactForm.appendChild(messageDiv);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-container.open');
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                document.getElementById('mobileMenuButton').innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation functionality with improved active state
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const navHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = section.offsetTop - navHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Update active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === sectionId) {
            link.classList.add('active');
        }
    });
}

// Highlight active section on scroll
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('nav').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkText = link.textContent.toLowerCase();
        if (linkText === current) {
            link.classList.add('active');
        }
    });
}

// Add 3D tilt effect to cards with improved performance
function addTiltEffect() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        // Remove existing event listeners first
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        
        // Add event listeners
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    function handleMouseMove(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            this.style.transition = 'transform 0.1s ease';
            
            // Add subtle shadow changes based on tilt
            this.style.boxShadow = `
                0 10px 20px rgba(0, 0, 0, 0.2),
                ${-rotateY/2}px ${rotateX/2}px 15px rgba(59, 130, 246, 0.3)
            `;
        });
    }
    
    function handleMouseLeave() {
        requestAnimationFrame(() => {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    }
}

// Create typed.js animation for hero section if element exists
function setupTypedAnimation() {
    if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['AI/ML Engineer', 'Full Stack Developer', 'Computer Science Student'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    } else {
        // If Typed.js is not available, load it from CDN
        const typedScript = document.createElement('script');
        typedScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js';
        typedScript.onload = setupTypedAnimation;
        document.head.appendChild(typedScript);
    }
}

// Add scroll reveal animation to section headings
function animateSectionHeadings() {
    const headings = document.querySelectorAll('section h2');
    
    headings.forEach(heading => {
        heading.classList.add('relative', 'inline-block');
        
        // Add animated underline
        const underline = document.createElement('span');
        underline.className = 'block h-1 bg-blue-500 mt-2 transform scale-x-0 transition-transform duration-700 origin-left';
        underline.style.width = '100%';
        heading.appendChild(underline);
        
        // Create intersection observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        underline.classList.add('scale-x-100');
                    }, 300);
                    observer.unobserve(heading);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
}

// Enhance loader with progress indicator
function enhanceLoader() {
    if (pageLoader) {
        // Create loader content if it doesn't exist
        if (!pageLoader.querySelector('.loader-content')) {
            pageLoader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">Loading</div>
                    <div class="loader-progress">
                        <div class="loader-progress-fill"></div>
                    </div>
                </div>
            `;
            
            // Animate progress bar
            const progressFill = pageLoader.querySelector('.loader-progress-fill');
            progressFill.style.width = '0%';
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                if (progress >= 100) {
                    clearInterval(interval);
                }
                progressFill.style.width = `${progress}%`;
            }, 20);
        }
    }
}

// Create parallax effect for section backgrounds
function createParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const speed = 0.1; // Adjust for more/less movement
            section.style.backgroundPositionY = `${scrollY * speed}px`;
        });
    });
}

// Initialize everything on page load
window.addEventListener('load', () => {
    // Hide loader
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }
    }, 500);
    
    // Initialize all functionality
    initTheme();
    setupMobileMenu();
    animateProgressBars();
    loadProjects('all');
    setupSmoothScrolling();
    setupTypedAnimation();
    animateSectionHeadings();
    createParallaxEffect();
    
    // Add scroll event listener for highlight active section
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initial highlight check
    highlightActiveSection();
});

// Show page loader during initial load
if (pageLoader) {
    pageLoader.style.display = 'block';
    enhanceLoader();
}

// Simplified navbar visibility
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-container');
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrolled > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});