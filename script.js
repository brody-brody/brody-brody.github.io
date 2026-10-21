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

// image expansion functionality
const galleryImages = document.querySelectorAll('.gallery-image');
const overlay = document.getElementById('imageOverlay');
const expandedImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close-overlay');

// open overlay functionality
function openOverlay(imgSrc) {
    expandedImg.src = imgSrc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// close overlay functionality
function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// click event on all gallery images
galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        openOverlay(this.src);
    });
});

// close overlay on click of button or away
overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) {
        closeOverlay();
    }
});

// close overlay with escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeOverlay();
    }
});

// skills toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const header = item.querySelector('.skill-header');
        const details = item.querySelector('.skill-details');

        details.style.maxHeight = '0px';
        details.style.paddingTop = '0px';
        details.style.paddingBottom = '0px';

        header.addEventListener('click', function () {
            if (item.classList.contains('active')) {
                details.style.maxHeight = '0px';
                details.style.paddingTop = '0px';
                details.style.paddingBottom = '0px';

                setTimeout(() => {
                    item.classList.remove('active');
                }, 300);
            } else {
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
    const name = "Brody Silva";

    // custom fonts config
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

    const styleElement = document.createElement('style');
    styleElement.textContent = customFonts;
    document.head.appendChild(styleElement);

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

    let waveAnimationRunning = false;
    let startTime = null;

    // ensure fonts are loaded
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

    // set font before typewriter
    function setCurrentFont() {
        typedTextElement.style.fontFamily = fonts[fontIndex].name;
        typedTextElement.style.fontWeight = fonts[fontIndex].weight;
        updateCursorHeight();
    }

    // update cursor height based on font
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

    // simplified wave animation
    function animateWave() {
        if (!waveAnimationRunning) return;

        const charSpans = typedTextElement.querySelectorAll('span');
        if (charSpans.length === 0) return;

        const amplitude = 3;
        const frequency = 2;
        const now = Date.now();
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;

        charSpans.forEach((span, index) => {

            const characterOffset = index * 0.3;
            const y = amplitude * Math.sin((elapsed / 1000 * frequency) + characterOffset);

            span.style.transform = "translateY(" + y + "px)";
        });

        requestAnimationFrame(animateWave);
    }

    function startWave() {
        if (waveAnimationRunning) return;
        waveAnimationRunning = true;
        startTime = null;
        requestAnimationFrame(animateWave);
    }

    function stopWave() {
        waveAnimationRunning = false;
    }

    function typeText() {
        typedTextElement.innerHTML = '';
        setCurrentFont();

        let charIndex = 0;

        const typing = setInterval(() => {
            if (charIndex < name.length) {
                const charSpan = document.createElement('span');
                charSpan.textContent = name.charAt(charIndex);

                if (name.charAt(charIndex) === ' ') {
                    charSpan.style.display = 'inline-block';
                    charSpan.style.width = '0.3em';
                }

                typedTextElement.appendChild(charSpan);
                charIndex++;

                document.getElementById('name-typewriter').insertBefore(
                    cursorElement,
                    typedTextElement.nextSibling
                );
            } else {
                clearInterval(typing);

                setTimeout(() => {
                    startWave();
                }, 100);

                setTimeout(deleteText, 5000);
            }
        }, 100);
    }

    function deleteText() {
        stopWave();

        let charIndex = typedTextElement.children.length;

        const deleting = setInterval(() => {
            if (charIndex > 0) {
                typedTextElement.removeChild(typedTextElement.children[charIndex - 1]);
                charIndex--;
            } else {
                clearInterval(deleting);

                fontIndex = (fontIndex + 1) % fonts.length;

                setTimeout(() => {
                    typeText();
                }, 300);
            }
        }, 50);
    }

    setInterval(() => {
        cursorElement.classList.toggle('blink');
    }, 500);

    preloadFonts().then(() => {
        document.getElementById('name-typewriter').insertBefore(
            cursorElement,
            typedTextElement.nextSibling
        );

        typeText();
    });
});