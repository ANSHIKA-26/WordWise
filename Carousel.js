document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const radioButtons = document.querySelectorAll('input[name="radio-btn"]');
    const labels = document.querySelectorAll('.manual-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 14.29}%)`;
        radioButtons[index].checked = true;
        updateActiveLabel(index);
    }

    function updateActiveLabel(index) {
        labels.forEach((label, i) => {
            if (i === index) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % radioButtons.length;
        showSlide(currentSlide);
    }

    // Add click event listeners to radio buttons
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Show first slide initially
    showSlide(0);

    // Automatic slide change
    setInterval(nextSlide, 5000);
});
