/**
 * Module for handling project item effects
 */

/**
 * Adds hover effects to project items
 * @returns {void}
 */
export function setupProjectHoverEffects() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.transition = 'transform 0.3s ease';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}