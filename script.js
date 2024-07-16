let index = 0;
let slideInterval;

function updateCarousel() {
    const slides = document.querySelectorAll('.card');
    const carousel = document.querySelector('.carousel');
    const cardWidth = slides[0].clientWidth + 20; // Add margin width
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

function showSlide(n) {
    const slides = document.querySelectorAll('.card');
    const carousel = document.querySelector('.carousel');
    const totalSlides = slides.length;

    if (n >= totalSlides - 4) { // Adjust for clones
        index = 0;
        carousel.style.transition = 'none';
        updateCarousel();
        // Force reflow
        carousel.offsetHeight;
        index++;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
        }, 50);
    } else if (n < 0) {
        index = totalSlides - 5; // Adjust for clones
        carousel.style.transition = 'none';
        updateCarousel();
        // Force reflow
        carousel.offsetHeight;
        index--;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
        }, 50);
    } else {
        index = n;
        updateCarousel();
    }
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Clone the slides for seamless looping
function cloneSlides() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.card');
    const cloneCount = 4; // Number of slides to clone

    for (let i = 0; i < cloneCount; i++) {
        const clone = slides[i].cloneNode(true);
        carousel.appendChild(clone);
    }
}

// Start the slideshow
document.addEventListener('DOMContentLoaded', () => {
    cloneSlides();
    startSlideShow();

    document.querySelector('.prev').addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    document.querySelector('.next').addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    window.addEventListener('resize', updateCarousel);

    updateCarousel(); // Initial update
});
