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
        { name: 'Legothick', weight: 'normal' },
        { name: 'm6x11', weight: 'normal' },
        { name: 'MinecraftTen', weight: 'normal' },
        { name: 'SuperMario256', weight: 'normal' }
    ];

    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    let fontIndex = 0;

    // Function to ensure fonts are loaded before starting animation
    function preloadFonts() {
        return new Promise((mainResolve) => {
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    setTimeout(mainResolve, 200);
                });
            } else {
                setTimeout(mainResolve, 500);
            }
        });
    }

    // Set font before typing begins
    function setCurrentFont() {
        typedTextElement.style.fontFamily = fonts[fontIndex].name;
        typedTextElement.style.fontWeight = fonts[fontIndex].weight;
        updateCursorHeight();
    }

    // Update cursor height based on current font
    function updateCursorHeight() {
        const tempSpan = document.createElement('span');
        tempSpan.textContent = 'M';
        tempSpan.style.fontFamily = fonts[fontIndex].name;
        tempSpan.style.fontWeight = fonts[fontIndex].weight;
        tempSpan.style.fontSize = getComputedStyle(typedTextElement).fontSize;
        tempSpan.style.visibility = 'hidden';
        document.body.appendChild(tempSpan);

        const height = tempSpan.offsetHeight;
        cursorElement.style.height = height + 'px';

        document.body.removeChild(tempSpan);
    }

    // Start wave animation for all characters using JavaScript
    function startWaveAnimation(characters) {
        const waveStep = 0.2; // How much to offset each character's wave
        const waveHeight = 3; // Maximum pixels to move up/down
        const duration = 2000; // Complete cycle in ms

        characters.forEach((charSpan, index) => {
            // Each character gets a different starting point in the sine wave
            const offset = index * waveStep;

            function animateChar(timestamp) {
                // Calculate position in the wave (0 to 2pi)
                const progress = ((timestamp % duration) / duration) * 2 * Math.PI;
                // Calculate y position using sine wave (-1 to 1) * height
                const y = Math.sin(progress + offset) * waveHeight;

                // Apply the transform
                charSpan.style.transform = "translateY(" + y + "px)";

                // Continue the animation
                requestAnimationFrame(animateChar);
            }

            // Start the animation
            requestAnimationFrame(animateChar);
        });
    }

    // Type effect with normal typing and separate wave animation
    function typeText() {
        typedTextElement.innerHTML = '';
        setCurrentFont();

        // Center container and add wrapper for centering
        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-block';
        wrapper.style.textAlign = 'center';
        typedTextElement.appendChild(wrapper);

        let charIndex = 0;
        const charSpans = [];

        const typing = setInterval(() => {
            if (charIndex < name.length) {
                const charSpan = document.createElement('span');
                charSpan.textContent = name.charAt(charIndex);

                // Store for later animation
                charSpans.push(charSpan);

                // If it's a space, make sure it's preserved
                if (name.charAt(charIndex) === ' ') {
                    charSpan.style.display = 'inline-block';
                    charSpan.style.width = '0.3em';
                }

                wrapper.appendChild(charSpan);
                charIndex++;
            } else {
                clearInterval(typing);

                // Only start wave animation after typing is complete
                setTimeout(() => {
                    startWaveAnimation(charSpans);
                }, 100);

                // Wait before deleting
                setTimeout(deleteText, 8000);
            }
        }, 100);
    }

    // Delete effect
    function deleteText() {
        const wrapper = typedTextElement.firstChild;
        let charIndex = wrapper.children.length;

        const deleting = setInterval(() => {
            if (charIndex > 0) {
                wrapper.removeChild(wrapper.children[charIndex - 1]);
                charIndex--;
            } else {
                clearInterval(deleting);
                typedTextElement.removeChild(wrapper);

                // Move to next font
                fontIndex = (fontIndex + 1) % fonts.length;

                // Short pause before typing again
                setTimeout(() => {
                    typeText();
                }, 300);
            }
        }, 50);
    }

    // Cursor blinking effect
    setInterval(() => {
        cursorElement.classList.toggle('blink');
    }, 500);

    // Start the animation after ensuring fonts are loaded
    preloadFonts().then(() => {
        typeText();
    });
});