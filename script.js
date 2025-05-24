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

// Projects data - enhanced with better descriptions and images
const projects = [
    {
        title: "AI Email Generator",
        category: "projects",
        // Updated image URL with higher quality parameters
        image: "https://drive.google.com/thumbnail?id=1Z8igcEZWWWpaSFgisjNGuIkwxw0vNMAA&sz=w1000-h1000",
        description: "Built an AI-powered email generator using Goog. Features include personalized email composition, multiple tone options, and template management.",
        tech: ["Python", "FastAPI", "OpenAI API", "React", "Firebase", "TailwindCSS"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "AI Data Driven Student Mentoring System",
        category: "projects",
        image: "https://drive.google.com/thumbnail?id=1rIb6j4UhluOZeNt9DdMurOmvcRb8H6z0&sz=w1000-h1000",
        description: "Built an AI-driven student mentoring system that automates paperwork. Reduced manual paperwork by 90% and improved student engagement tracking.",
        tech: ["HTML", "CSS", "JavaScript", "MongoDB", "Node.js", "Chart JS"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "Google Cloud Computing",
        category: "certifications",
        image: "https://drive.google.com/thumbnail?id=12Q4VZhHvj5ehzAKftLhWU7hCHo_ZzTS9&sz=w500-h500",
        description: "Completed comprehensive training in cloud computing, covering infrastructure, deployment, and scalability.",
        tech: ["GCP", "Cloud Computing", "DevOps"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "Oracle Cloud Infrastructure - Generative AI",
        category: "certifications",
        image: "https://drive.google.com/thumbnail?id=1f62-FrYjUBzW6tw0-Gc-2_ZJyUU9r1K9&sz=w1000-h1000", // Updated size parameters
        description: "Achieved Oracle Cloud Infrastructure 2024 Generative AI Professional certification, demonstrating expertise in implementing and managing AI solutions.",
        tech: ["OCI", "Generative AI", "Cloud Infrastructure", "AI/ML"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "Postman API Fundamentals",
        category: "certifications",
        // Updated image URL with higher quality parameters
        image: "https://drive.google.com/thumbnail?id=1bwJvL2d8pL_b4feNV7_KFTHBsOIQHjnY&sz=w1000-h1000",
        description: "Achieved Postman Student Expert certification, demonstrating proficiency in API testing, documentation, and automation using Postman.",
        tech: ["API Testing", "Postman", "REST APIs", "API Documentation"],
        github: "#",
        demo: "#",
        featured: true
    },
    {
        title: "Development Tools",
        category: "tools",
        image: "assets/dev-tools.png",
        description: "Proficient in various development tools and technologies",
        tech: ["VS Code", "Git", "Docker", "AWS", "Firebase", "MongoDB"],
        github: "#",
        demo: "#",
        featured: true
    }
    // Add more items for each category...
];

// Enhanced Project filtering with animations
function filterProjects(filter) {
    const projectsContainer = document.querySelector('.projects-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    projectsContainer.innerHTML = '';
    
    // Hide/Show "Show More" button based on filter
    if (showMoreBtn) {
        if (filter === 'tools') {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
            showMoreBtn.innerHTML = 'Show More <i class="fas fa-chevron-down"></i>';
        }
    }

    if (filter === 'tools') {
        projectsContainer.innerHTML = `
            <div class="tools-image-container" onclick="showImageModal(this.querySelector('img').src)">
                <img src="https://drive.google.com/thumbnail?id=13vgRtM-mT6g5pRUHpaZZcINjWTolYrK9&sz=w2000" 
                     alt="Tech Stack" 
                     class="tools-image">
            </div>
        `;
    } else {
        // Regular projects display code...
        const filteredProjects = projects.filter(project => project.category === filter);
        
        filteredProjects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.category = project.category;
            card.dataset.aos = 'fade-up';
            card.dataset.aosDelay = index * 100;
            
            card.innerHTML = `
                <div class="project-image-link">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="project-image"
                         onclick="showImageModal(this.src)"
                         onerror="this.onerror=null; this.src='/api/placeholder/600/600'; console.log('Failed to load image: ${project.image}');">
                </div>
                <div class="project-content">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="tech-stack">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="hover:text-blue-400 transition-colors duration-300">
                            <i class="fab fa-github mr-1"></i> Source
                        </a>
                        <a href="${project.demo}" class="hover:text-blue-400 transition-colors duration-300">
                            <i class="fas fa-external-link-alt mr-1"></i> Demo
                        </a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(card);
        });
    }
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    addProjectCardEffects();
}

// Add image modal functionality
function showImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${src}" alt="Full size image">
        </div>
    `;
    
    modal.addEventListener('click', () => {
        modal.remove();
    });
    
    document.body.appendChild(modal);
}

// Update the click handler for filter buttons
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.project-filter');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                filterProjects(btn.dataset.filter);
            });
        });
        // Show projects by default
        filterProjects('projects');
    }
});

// Dynamic project loading function
function loadProjects(filter = 'all') {
    const projectsContainer = document.querySelector('.projects-grid');
    
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        card.dataset.aos = 'fade-up';
        card.dataset.aosDelay = index * 100;
        
        card.innerHTML = `
            <a href="${project.image}" target="_blank" class="project-image-link">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="project-image"
                     onerror="this.onerror=null; this.src='/api/placeholder/600/600'; console.log('Failed to load image: ${project.image}');">
            </a>
            <div class="project-content">
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="tech-stack">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="hover:text-blue-400 transition-colors duration-300">
                        <i class="fab fa-github mr-1"></i> Source
                    </a>
                    <a href="${project.demo}" class="hover:text-blue-400 transition-colors duration-300">
                        <i class="fas fa-external-link-alt mr-1"></i> Demo
                    </a>
                </div>
            </div>
        `;
        
        // Add image load error logging
        const img = card.querySelector('img');
        img.addEventListener('error', () => {
            console.error(`Failed to load image: ${project.image}`);
        });
        
        projectsContainer.appendChild(card);
    });
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    addProjectCardEffects();
}

// Add hover effects to project cards
function addProjectCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
}

// Back to top button functionality
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