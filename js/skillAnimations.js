/**
 * Module for handling skill bar animations
 */

/**
 * Animates the skill bars to grow from 0 to their specified width
 * @returns {void}
 */
export function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');

    skillLevels.forEach(level => {
        const targetWidth = level.style.width;
        level.style.width = '0';

        setTimeout(() => {
            level.style.transition = 'width 1s ease-in-out';
            level.style.width = targetWidth;
        }, 300);
    });
}