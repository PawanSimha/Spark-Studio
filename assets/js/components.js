/*
    assets/js/components.js
    Logic for reusable components (buttons, cards, etc.).
*/

// Intersection Observer for Animations
const observerOptions = {
    // Developer: Pawan Simha
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Preload critical images
const criticalImages = [
    'https://placehold.co/600x400/FF6F00/FFFFFF?text=Creative+Team',
    'https://placehold.co/400x300/FF6F00/FFFFFF?text=E-commerce+Platform',
    'https://placehold.co/400x300/00D4FF/FFFFFF?text=SaaS+Dashboard'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// -----------------------------------------------------------------------------

        document.addEventListener('DOMContentLoaded', () => {
            const quoteBtn = document.getElementById('quoteBtn');
            const customServiceCheckboxes = document.querySelectorAll('input[name="customService"]');
            const messageTextarea = document.getElementById('message');
            const contactSection = document.getElementById('contact');

            // Function to update the button text based on selection
            const updateQuoteButtonText = () => {
                const checkedCount = Array.from(customServiceCheckboxes).filter(cb => cb.checked).length;
                if (checkedCount > 0) {
                    quoteBtn.textContent = `Get a Quote for ${checkedCount} Service${checkedCount > 1 ? 's' : ''}`;
                } else {
                    quoteBtn.textContent = 'Get a Custom Quote';
                }
            };

            // Function to handle the button click event
            const handleQuoteButtonClick = () => {
                const selectedServices = Array.from(customServiceCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
                
                if (selectedServices.length > 0) {
                    messageTextarea.value = `I am interested in the following services: ${selectedServices.join(', ')}.`;
                } else {
                    messageTextarea.value = 'I would like to get a custom quote for services.';
                }
                
                // Smoothly scroll to the contact section
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            };

            // Event listeners
            customServiceCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateQuoteButtonText);
            });
            quoteBtn.addEventListener('click', handleQuoteButtonClick);

            // Initial button text update on page load
            updateQuoteButtonText();
        });