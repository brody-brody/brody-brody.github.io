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

document.addEventListener('DOMContentLoaded', function () {
    // Define your name including the space
    const name = "Brody Silva";

    // Custom fonts configuration with your TTF files
    const customFonts = "@font-face {" +
        "font-family: 'ANDYB';" +
        "src: url('fonts/ANDYB.TTF') format('truetype');" +
        "}" +
        "@font-face {" +
        "font-family: 'FEASFBRG';" +
        "src: url('fonts/FEASFBRG.TTF') format('truetype');" +
        "}" +
        "@font-face {" +
        "font-family: 'HyliaSerif';" +
        "src: url('fonts/HyliaSerif.ttf') format('truetype');" +
        "}" +
        "@font-face {" +
        "font-family: 'm6x11';" +
        "src: url('fonts/m6x11.ttf') format('truetype');" +
        "}" +
        "@font-face {" +
        "font-family: 'MinecraftTen';" +
        "src: url('fonts/MinecraftTen-VGORe.ttf') format('truetype');" +
        "}" +
        "@font-face {" +
        "font-family: 'SuperMario256';" +
        "src: url('fonts/SuperMario256.ttf') format('truetype');" +
        "}";

    // Add the custom fonts style to the head
    const styleElement = document.createElement('style');
    styleElement.textContent = customFonts;
    document.head.appendChild(styleElement);

    // Define font array after adding the styles
    const fonts = [
        { name: 'Fira Sans', weight: '400' },
        { name: 'ANDYB', weight: 'normal' },
        { name: 'FEASFBRG', weight: 'normal' },
        { name: 'HyliaSerif', weight: 'normal' },
        { name: 'm6x11', weight: 'normal' },
        { name: 'MinecraftTen', weight: 'normal' },
        { name: 'SuperMario256', weight: 'normal' }
    ];

    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    let fontIndex = 0;

    // Type effect with letter-by-letter wave animation
    function typeText() {
        // Clear any existing content
        typedTextElement.innerHTML = '';

        // Set current font
        typedTextElement.style.fontFamily = fonts[fontIndex].name;
        typedTextElement.style.fontWeight = fonts[fontIndex].weight;

        let charIndex = 0;

        const typing = setInterval(() => {
            if (charIndex < name.length) {
                // Create a span for each character to animate individually
                const charSpan = document.createElement('span');
                charSpan.textContent = name.charAt(charIndex);
                charSpan.classList.add('wave-char');

                // Different animation phases for each letter
                charSpan.style.animationDelay = (charIndex * 0.08) + "s";

                // If it's a space, make sure it's preserved
                if (name.charAt(charIndex) === ' ') {
                    charSpan.style.display = 'inline-block';
                    charSpan.style.width = '0.3em'; // Ensure the space has width
                }

                typedTextElement.appendChild(charSpan);
                charIndex++;
            } else {
                clearInterval(typing);
                setTimeout(deleteText, 8000); // Wait 8 seconds before deleting
            }
        }, 100); // Typing speed (ms)
    }

    // Delete effect
    function deleteText() {
        let charIndex = typedTextElement.children.length;

        const deleting = setInterval(() => {
            if (charIndex > 0) {
                typedTextElement.removeChild(typedTextElement.children[charIndex - 1]);
                charIndex--;
            } else {
                clearInterval(deleting);
                // Move to next font
                fontIndex = (fontIndex + 1) % fonts.length;
                setTimeout(typeText, 500); // Wait 0.5 second before typing again
            }
        }, 50); // Deleting speed (ms)
    }

    // Start the effect
    typeText();

    // Cursor blinking effect
    setInterval(() => {
        cursorElement.classList.toggle('blink');
    }, 500);
});