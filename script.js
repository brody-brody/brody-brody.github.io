// event listeners for tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // removing active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // adding active class to clicked button
            button.classList.add('active');

            // show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Image expansion functionality
const galleryImages = document.querySelectorAll('.gallery-image');
const overlay = document.getElementById('imageOverlay');
const expandedImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close-overlay');

// Function to open the overlay
function openOverlay(imgSrc) {
    expandedImg.src = imgSrc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
}

// Function to close the overlay
function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Add click event to all gallery images
galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        openOverlay(this.src);
    });
});

// Close overlay when clicking on it or the close button
overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) {
        closeOverlay();
    }
});

// Close overlay with escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeOverlay();
    }
});

// Skills Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const header = item.querySelector('.skill-header');
        const details = item.querySelector('.skill-details');

        // Store the actual height of each details section
        details.style.maxHeight = '0px';
        details.style.paddingTop = '0px';
        details.style.paddingBottom = '0px';

        header.addEventListener('click', function () {
            // If this item is already active
            if (item.classList.contains('active')) {
                // Close it with animation
                details.style.maxHeight = '0px';
                details.style.paddingTop = '0px';
                details.style.paddingBottom = '0px';

                // Remove active class after transition completes
                setTimeout(() => {
                    item.classList.remove('active');
                }, 300); // Match this to your transition duration
            } else {
                // Close all other open items first
                skillItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        const otherDetails = otherItem.querySelector('.skill-details');
                        otherDetails.style.maxHeight = '0px';
                        otherDetails.style.paddingTop = '0px';
                        otherDetails.style.paddingBottom = '0px';

                        setTimeout(() => {
                            otherItem.classList.remove('active');
                        }, 300);
                    }
                });

                // Open this item with smooth animation
                item.classList.add('active');
                const contentHeight = details.scrollHeight;
                details.style.maxHeight = contentHeight + 'px';
                details.style.paddingTop = '0px';
                details.style.paddingBottom = '15px';
            }
        });
    });
});
