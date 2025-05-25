/**
 * Module for handling link-related utilities
 */

/**
 * Shows link addresses when hovering over links
 * @returns {void}
 */
export function showLinkAddresses() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Only add title for external links (not internal page anchors)
        if (href && !href.startsWith('#')) {
            link.setAttribute('title', href);
        }
    });
}