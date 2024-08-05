function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function closeSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector('.testimonial_card_container');
    const cards = document.querySelectorAll('.testimonial_card');
    let currentIndex = 0;
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    cards.forEach((card, index) => {
        const cardImage = card.querySelector('img');
        card.addEventListener('touchstart', touchStart(index));
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);
        card.addEventListener('mousedown', touchStart(index));
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mousemove', touchMove);
        card.addEventListener('mouseleave', touchEnd);
    });

    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPosition = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
        };
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < cards.length - 1) {
            currentIndex++;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        setPositionByIndex();
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPosition;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        cardContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -cards[0].offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function slideCards() {
        currentIndex = (currentIndex + 1) % cards.length;
        setPositionByIndex();
    }

    setInterval(slideCards, 3000); // change slide every 3 seconds
});
