function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function closeSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}




const testimonialCards = document.getElementById('testimonialCards');
const totalCards = testimonialCards.children.length;
let currentIndex = 0;

function showNextTestimonial() {
    currentIndex = (currentIndex + 1) % totalCards;
    testimonialCards.style.transform = `translateX(${-currentIndex * 400}px)`;
}

function showPreviousTestimonial() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    testimonialCards.style.transform = `translateX(${-currentIndex * 400}px)`;
}

function autoSlideTestimonials() {
    showNextTestimonial();
    setTimeout(autoSlideTestimonials, 3000); // Change slide every 3 seconds
}

testimonialCards.addEventListener('touchstart', handleTouchStart, false);
testimonialCards.addEventListener('touchmove', handleTouchMove, false);

let x1 = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
}

function handleTouchMove(event) {
    if (!x1) {
        return false;
    }

    let x2 = event.touches[0].clientX;
    let xDiff = x2 - x1;

    if (xDiff > 0) {
        showPreviousTestimonial();
    } else {
        showNextTestimonial();
    }

    x1 = null;
}

// Start the automatic sliding
autoSlideTestimonials();




