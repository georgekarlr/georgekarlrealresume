/**
 * Module for generating PDF from the resume
 * Uses jsPDF library to create a PDF version of the resume
 */

/**
 * Sets up the PDF generation button and its functionality
 * @returns {void}
 */
export function setupPdfGeneration() {
    // Get the button element
    const pdfButton = document.getElementById('generate-pdf');

    // Add click event listener to the button
    if (pdfButton) {
        pdfButton.addEventListener('click', generatePdf);
    }
}

/**
 * Generates a PDF version of the resume
 * @returns {void}
 */
function generatePdf() {
    // Import jsPDF dynamically
    import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
        .then(() => {
            // Create a new jsPDF instance
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Set document properties
            doc.setProperties({
                title: 'George Karl M. Real - Resume',
                author: 'George Karl M. Real',
                subject: 'Resume',
                keywords: 'resume, cv, developer'
            });

            // Add content to the PDF
            doc.setFontSize(22);
            doc.text('George Karl M. Real', 105, 20, { align: 'center' });

            doc.setFontSize(16);
            doc.text('Software Developer', 105, 30, { align: 'center' });

            doc.setFontSize(12);
            doc.text('Contact: 09100868963 | georgekarlr@gmail.com | Pagadian City, Philippines', 105, 40, { align: 'center' });

            // Professional Summary
            doc.setFontSize(16);
            doc.text('Professional Summary', 20, 60);
            doc.setFontSize(12);
            doc.text('"Judge me by my works and my progress. Self-Learner."', 20, 70);

            // Skills
            doc.setFontSize(16);
            doc.text('Programming Languages', 20, 90);
            doc.setFontSize(12);
            doc.text('Kotlin: 95%', 20, 100);
            doc.text('Java: 80%', 20, 110);
            doc.text('JavaScript: 50%', 20, 120);
            doc.text('SQL: 85%', 20, 130);
            doc.text('Python: 60%', 20, 140);

            // Software Skill Stack with detailed descriptions
            let yPos = 160;
            doc.setFontSize(16);
            doc.text('Software Skill Stack', 20, yPos);
            doc.setFontSize(12);

            // Get skill stack data from the HTML
            const stackItems = document.querySelectorAll('.stack-item');
            yPos += 15;

            stackItems.forEach((item, index) => {
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;

                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(`${title}`, 20, yPos);
                doc.setFont(undefined, 'normal');

                // Handle long descriptions with text wrapping
                const splitDescription = doc.splitTextToSize(description, 170);
                yPos += 7;
                doc.text(splitDescription, 20, yPos);

                yPos += (splitDescription.length * 7) + 5;
            });

            // Projects with detailed descriptions and links
            yPos += 10;
            doc.setFontSize(16);
            doc.text('Projects & Links', 20, yPos);
            yPos += 15;

            // Get project data from the HTML
            const projectItems = document.querySelectorAll('.project-item');

            projectItems.forEach((item, index) => {
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                const details = item.querySelector('.project-details');

                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(`${title}`, 20, yPos);
                doc.setFont(undefined, 'normal');

                // Add description with text wrapping
                yPos += 7;
                const splitDescription = doc.splitTextToSize(description, 170);
                doc.text(splitDescription, 20, yPos);
                yPos += (splitDescription.length * 7) + 3;

                // Add credentials if available
                if (details) {
                    const credentials = details.querySelectorAll('p');
                    credentials.forEach(cred => {
                        if (cred.textContent.trim() !== '') {
                            doc.text(cred.textContent, 25, yPos);
                            yPos += 7;
                        }
                    });

                    // Add links
                    const links = details.querySelectorAll('a');
                    links.forEach(link => {
                        doc.setTextColor(0, 0, 255);
                        doc.text(`${link.textContent}: ${link.href}`, 25, yPos);
                        doc.setTextColor(0, 0, 0);
                        yPos += 7;
                    });
                }

                yPos += 5;

                // Add a new page if we're running out of space
                if (yPos > 270 && index < projectItems.length - 1) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            // Social Media with links
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(16);
            doc.text('Social Media', 20, yPos);
            yPos += 15;

            // Get social media data from the HTML
            const socialLinks = document.querySelectorAll('.social-link');

            socialLinks.forEach(link => {
                const platform = link.textContent.trim();
                const url = link.href;

                doc.setFontSize(12);
                doc.setTextColor(0, 0, 255);
                doc.text(`${platform}: ${url}`, 20, yPos);
                doc.setTextColor(0, 0, 0);

                yPos += 10;
            });

            // Save the PDF
            doc.save('George_Karl_Real_Resume.pdf');
        })
        .catch(error => {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again later.');
        });
}
