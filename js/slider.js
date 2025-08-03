// Wait for the entire page to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Find all the necessary elements for our slider
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');
    
    // Check if the slider elements actually exist on the page
    if (!track || !nextButton || !prevButton || slides.length === 0) {
        return; // If not, stop the script from running
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    // --- Core function to move the slider ---
    const moveToSlide = (targetIndex) => {
        // Move the entire track horizontally
        track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
        currentIndex = targetIndex;
    }

    // --- Event Listeners for the buttons ---

    // When I click the next button...
    nextButton.addEventListener('click', e => {
        // Move to the next slide. If we're at the end, loop back to the start.
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    // When I click the previous button...
    prevButton.addEventListener('click', e => {
        // Move to the previous slide. If we're at the start, loop to the end.
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        moveToSlide(prevIndex);
    });

    // Optional: Handle window resizing to keep the slider working correctly
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        // Recalculate and move to the current slide with the new width
        track.style.transition = 'none'; // Temporarily disable animation
        track.style.transform = 'translateX(-' + (newSlideWidth * currentIndex) + 'px)';
        setTimeout(() => {
            track.style.transition = ''; // Re-enable animation
        }, 10);
    });

});