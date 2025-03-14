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

document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-fill");

    function checkScroll() {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = bar.getAttribute("style").match(/width:\s*(\d+%)/)[1];
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once on load
});

// Contact form event using smtp.js
document.querySelector('.contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from refreshing the page

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    console.log("Form submission initiated with data:", { name, email, message });

    // Check if Email object exists
    if (typeof Email === 'undefined') {
        console.error("SMTP.js library not loaded - Email object undefined");
        alert("Email sending library not loaded. Please refresh the page and try again.");
        return;
    }


    Email.send({
        Host: "smtp.gmail.com",
        Username: "brodysilva.dev@gmail.com",
        Password: "vizi cigq lvpq qahj",
        Port: 587,
        To: 'brodysilva.dev@gmail.com',
        From: 'brodysilva.dev@gmail.com',
        ReplyTo: email,
        Subject: `Portfolio Contact from ${name}`,
        Body: message,
        SMTPAuth: true
    }).then(
        result => {
            console.log("Email send result:", result);
            if (result === "OK") {
                alert("Your message has been sent successfully!");
                document.querySelector('.contact-form').reset();
            } else {
                alert("There was an issue sending your message. Please try again.");
                console.error("Unexpected result from Email.send:", result);
            }
        }
    ).catch(
        error => {
            console.error("Error in Email.send:", error);
            alert("Failed to send your message. Please try again later or contact directly via email.");
        }
    );
});
