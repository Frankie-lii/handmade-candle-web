// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const closeMenuButton = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Open mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu when clicking close button or overlay
    closeMenuButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            // Name validation
            if (!name.value.trim()) {
                name.classList.add('error');
                showError(name, 'Name is required');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                email.classList.add('error');
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                email.classList.add('error');
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                message.classList.add('error');
                showError(message, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Form is valid - in a real app, you would send data to server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }
});

// Show error message
function showError(input, message) {
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Gallery Filter Functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-amber-800', 'text-white');
                    btn.classList.add('bg-amber-100', 'text-amber-800');
                });

                // Add active class to clicked button
                this.classList.add('active', 'bg-amber-800', 'text-white');
                this.classList.remove('bg-amber-100', 'text-amber-800');

                // Filter items
                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize gallery when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing mobile menu code ...

    // Initialize gallery filters
    initGalleryFilters();

    // Configure Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'positionFromTop': 100,
        'disableScrolling': true
    });
});


// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        document.querySelectorAll('[id$="-error"]').forEach(el => {
            el.classList.add('hidden');
        });

        // Validate name
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').classList.remove('hidden');
            nameInput.focus();
            isValid = false;
        }

        // Validate email
        if (!emailInput.value.trim()) {
            document.getElementById('email-error').classList.remove('hidden');
            if (isValid) emailInput.focus();
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            document.getElementById('email-error').classList.remove('hidden');
            if (isValid) emailInput.focus();
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            document.getElementById('message-error').classList.remove('hidden');
            if (isValid) messageInput.focus();
            isValid = false;
        }

        if (isValid) {
            // In a real app, you would send the form data to a server here
            // For demo purposes, we'll just show the success message
            contactForm.reset();
            successMessage.classList.remove('hidden');

            // Scroll to show success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });

    // Helper function to validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Initialize contact form when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing mobile menu code ...

    // Initialize contact form
    initContactForm();
});

// Mobile Menu Functionality (for all pages)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const closeMenuButton = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (mobileMenuButton && mobileMenu) {
        // Open mobile menu
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close mobile menu
        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close menu when clicking close button or overlay
        if (closeMenuButton) closeMenuButton.addEventListener('click', closeMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// Blog Listing Page Functionality
function initBlogListing() {
    // Only run on blog listing page
    if (!document.querySelector('.blog-listing')) return;

    // Add animation to blog cards when they come into view
    const blogCards = document.querySelectorAll('article');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Blog Post Page Functionality
function initBlogPost() {
    // Only run on blog post pages
    if (!document.querySelector('.blog-post')) return;

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add image zoom functionality
    const images = document.querySelectorAll('.prose img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            if (this.style.transform === 'scale(1.5)') {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '0';
            } else {
                this.style.transform = 'scale(1.5)';
                this.style.zIndex = '10';
                this.style.transition = 'transform 0.3s ease';
                // Scroll to center the image
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Estimate reading time
    function estimateReadingTime() {
        const article = document.querySelector('.prose');
        if (!article) return;

        const text = article.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 wpm

        const readingTimeElement = document.getElementById('reading-time');
        if (readingTimeElement) {
            readingTimeElement.textContent = `${readingTime} min read`;
        }
    }

    estimateReadingTime();
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initBlogListing();
    initBlogPost();

    // Add blog-specific class to body for styling
    if (window.location.pathname.includes('blog')) {
        document.body.classList.add('blog-page');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data (replace with real data from your CMS/API)
    const blogPosts = [{
            id: 1,
            title: "The Art of Wax Pouring",
            excerpt: "Master the techniques for perfect wax pouring every time with our comprehensive guide.",
            date: "May 15, 2023",
            readTime: "8 min read",
            image: "images/blog/wax-pouring.jpg",
            category: "Techniques"
        },
        {
            id: 2,
            title: "Essential Oils vs. Fragrance Oils",
            excerpt: "Discover the pros and cons of each and when to use them in your candle making.",
            date: "April 28, 2023",
            readTime: "6 min read",
            image: "images/blog/oils-comparison.jpg",
            category: "Ingredients"
        },
        {
            id: 3,
            title: "Creating Seasonal Scents",
            excerpt: "How to develop candle fragrances that capture the essence of each season.",
            date: "March 10, 2023",
            readTime: "5 min read",
            image: "images/blog/seasonal-scents.jpg",
            category: "Fragrances"
        },
        {
            id: 4,
            title: "Eco-Friendly Candle Packaging",
            excerpt: "Sustainable packaging ideas that protect your candles and the planet.",
            date: "February 22, 2023",
            readTime: "4 min read",
            image: "images/blog/eco-packaging.jpg",
            category: "Sustainability"
        }
    ];

    // Render blog posts
    const container = document.getElementById('blog-posts-container');

    blogPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-card bg-white rounded-lg shadow-md overflow-hidden';
        postElement.innerHTML = `
            <a href="blog/post-${post.id}.html" class="block h-full">
                <div class="relative pt-[56.25%] overflow-hidden bg-gray-100">
                    <img src="${post.image}" alt="${post.title}" class="absolute top-0 left-0 w-full h-full object-cover transition duration-500 hover:scale-105">
                </div>
                <div class="p-6">
                    <span class="inline-block px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-100 rounded-full mb-2">${post.category}</span>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">${post.title}</h2>
                    <p class="text-gray-600 mb-4">${post.excerpt}</p>
                    <div class="flex items-center text-sm text-gray-500">
                        <time datetime="${post.date}">${post.date}</time>
                        <span class="mx-2">•</span>
                        <span>${post.readTime}</span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(postElement);
    });

    // Animate blog cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            // Here you would typically send the email to your server
            console.log('Subscribed with email:', emailInput.value);
            emailInput.value = '';
            alert('Thank you for subscribing to our newsletter!');
        });
    }
});