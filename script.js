// Three Kings Muay Thai Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery functionality
    initializeGallery();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// Gallery Modal Functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = createModal();
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-overlay span').textContent;
            openModal(modal, img.src, img.alt, caption);
        });
    });
}

function createModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-close">&times;</span>
            <img src="" alt="">
            <div class="modal-caption"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking the X or outside the image
    const closeBtn = modal.querySelector('.gallery-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
    
    return modal;
}

function openModal(modal, src, alt, caption) {
    const img = modal.querySelector('img');
    const captionDiv = modal.querySelector('.modal-caption');
    
    img.src = src;
    img.alt = alt;
    captionDiv.textContent = caption;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit, .pricing-card, .schedule-day, .gallery-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .benefit, .pricing-card, .schedule-day, .gallery-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-caption {
        text-align: center;
        color: #39ff14;
        font-weight: bold;
        margin-top: 1rem;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Contact form functionality (if you add a contact form later)
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you would typically send the data to your server
            console.log('Contact form submitted:', { name, email, message });
            
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Utility function to show messages
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#39ff14'};
        color: ${type === 'success' ? '#fff' : '#000'};
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 5000);
}

// Add keyframe animations
const keyframes = document.createElement('style');
keyframes.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(keyframes);