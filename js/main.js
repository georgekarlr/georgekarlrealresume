/**
 * Main application module
 * This module initializes all the functionality for the resume website
 */

import { animateSkillBars } from './skillAnimations.js';
import { setupSmoothScrolling } from './navigation.js';
import { setupProjectHoverEffects } from './projectEffects.js';
import { showLinkAddresses } from './linkUtils.js';
import { setupPdfGeneration } from './pdfGenerator.js';

/**
 * Initializes all the functionality for the resume website
 * @returns {void}
 */
export function initApp() {
    console.log('Resume loaded ✨');

    // Animate skill bars on page load
    animateSkillBars();

    // Add smooth scrolling for navigation
    setupSmoothScrolling();

    // Add hover effects for project items
    setupProjectHoverEffects();

    // Show link addresses on hover
    showLinkAddresses();

    // Setup PDF generation functionality
    setupPdfGeneration();
}
