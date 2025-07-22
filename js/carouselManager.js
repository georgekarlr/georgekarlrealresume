/**
 * Module for managing image carousels
 */

/**
 * Sets up image carousels for all project items
 * @returns {void}
 */
export function setupImageCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');

    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        const dots = carousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;

        // Function to update the carousel display
        function updateCarousel() {
            const slideWidth = slides[0].clientWidth;
            container.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Function to go to a specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Event listeners for buttons
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        // Auto-advance carousel every 5 seconds
        let intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);

        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });

        // Resume auto-advance when mouse leaves
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });

        // Handle window resize
        window.addEventListener('resize', updateCarousel);

        // Initialize carousel
        updateCarousel();
    });
}