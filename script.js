let index = 0;
let slideInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.card');
    const carousel = document.querySelector('.carousel');
    const totalSlides = slides.length / 2; // Adjusted for cloned slides

    if (n >= totalSlides) {
        index = 0;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${index * 25}%)`;
        // Force reflow
        carousel.offsetHeight;
        index++;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(-${index * 25}%)`;
        }, 50);
    } else if (n < 0) {
        index = totalSlides - 1;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${index * 25}%)`;
        // Force reflow
        carousel.offsetHeight;
        index--;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(-${index * 25}%)`;
        }, 50);
    } else {
        index = n;
        carousel.style.transform = `translateX(-${index * 25}%)`;
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
    const cloneCount = 3; // Number of slides to clone

    for (let i = 0; i < cloneCount; i++) {
        const clone = slides[i].cloneNode(true);
        carousel.appendChild(clone);
    }
}

// Start the slideshow
document.addEventListener('DOMContentLoaded', () => {
    cloneSlides();
    startSlideShow();
});

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
