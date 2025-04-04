// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const service = document.getElementById('service').value;
            
            // Validate form
            let isValid = true;
            let errorMessages = [];
            
            // Name validation
            if (name === '') {
                isValid = false;
                errorMessages.push('Please enter your name');
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            // Subject validation
            if (subject === '') {
                isValid = false;
                errorMessages.push('Please enter a subject');
                document.getElementById('subject').classList.add('error');
            } else {
                document.getElementById('subject').classList.remove('error');
            }
            
            // Message validation
            if (message === '') {
                isValid = false;
                errorMessages.push('Please enter your message');
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            // Display error messages or submit form
            if (!isValid) {
                showFormErrors(errorMessages);
            } else {
                // Clear any previous error messages
                clearFormErrors();
                
                // Simulate form submission (in a real implementation, this would send data to a server)
                submitForm({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    service: service
                });
            }
        });
    }
    
    // Function to display form errors
    function showFormErrors(errors) {
        // Check if error container exists, create if not
        let errorContainer = document.getElementById('form-errors');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'form-errors';
            errorContainer.className = 'form-errors';
            contactForm.insertBefore(errorContainer, contactForm.firstChild);
        }
        
        // Clear previous errors
        errorContainer.innerHTML = '';
        
        // Add error heading
        const errorHeading = document.createElement('p');
        errorHeading.textContent = 'Please correct the following errors:';
        errorHeading.className = 'error-heading';
        errorContainer.appendChild(errorHeading);
        
        // Add error list
        const errorList = document.createElement('ul');
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorList);
        
        // Scroll to errors
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Function to clear form errors
    function clearFormErrors() {
        const errorContainer = document.getElementById('form-errors');
        if (errorContainer) {
            errorContainer.remove();
        }
        
        // Remove error class from all inputs
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    // Function to handle form submission
    function submitForm(formData) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // In a real implementation, you would send the data to a server here
        // For this example, we'll simulate a successful submission after a delay
        setTimeout(() => {
            // Show success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting me, ${formData.name}. I'll respond to your inquiry about ${formData.service || 'my services'} as soon as possible.</p>
                </div>
            `;
            
            // Scroll to success message
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    }
});

// Main JavaScript for website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (skillBars.length) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (barPosition < screenPosition) {
                    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                    bar.style.width = width;
                }
            });
        };
        
        // Initial check
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
    }
    
    // Network background animation
    const networkBg = document.getElementById('network-animation');
    
    if (networkBg) {
        // This would be implemented with Three.js in a production environment
        // For this example, we'll create a simple placeholder animation
        const createNetworkAnimation = () => {
            networkBg.innerHTML = '';
            const dotCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
            
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'network-dot';
                dot.style.left = `${Math.random() * 100}%`;
                dot.style.top = `${Math.random() * 100}%`;
                dot.style.animationDelay = `${Math.random() * 5}s`;
                networkBg.appendChild(dot);
                
                // Create some lines connecting dots
                if (i > 0 && i % 3 === 0) {
                    const line = document.createElement('div');
                    line.className = 'network-line';
                    const angle = Math.random() * 360;
                    const length = 50 + Math.random() * 100;
                    line.style.left = `${Math.random() * 100}%`;
                    line.style.top = `${Math.random() * 100}%`;
                    line.style.width = `${length}px`;
                    line.style.transform = `rotate(${angle}deg)`;
                    line.style.animationDelay = `${Math.random() * 5}s`;
                    networkBg.appendChild(line);
                }
            }
        };
        
        // Initial creation
        createNetworkAnimation();
        
        // Recreate on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(createNetworkAnimation, 300);
        });
    }
});

// Add CSS for network animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .network-dot {
            position: absolute;
            width: 3px;
            height: 3px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: pulse 3s infinite alternate;
        }
        
        .network-line {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform-origin: left center;
            animation: fade 4s infinite alternate;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.3;
            }
            100% {
                transform: scale(1.5);
                opacity: 0.7;
            }
        }
        
        @keyframes fade {
            0% {
                opacity: 0.1;
            }
            100% {
                opacity: 0.5;
            }
        }
        
        .form-errors {
            background-color: rgba(255, 0, 0, 0.1);
            border-left: 4px solid #ff3333;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: var(--border-radius-md);
        }
        
        .form-errors .error-heading {
            font-weight: 600;
            margin-bottom: 10px;
            color: #ff3333;
        }
        
        .form-errors ul {
            margin-left: 20px;
            list-style-type: disc;
        }
        
        .form-errors li {
            margin-bottom: 5px;
            color: #ff3333;
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #ff3333;
            background-color: rgba(255, 0, 0, 0.05);
        }
        
        .form-success {
            text-align: center;
            padding: 40px 20px;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .form-success h3 {
            margin-bottom: 15px;
            color: #4CAF50;
        }
    `;
    document.head.appendChild(style);
});
