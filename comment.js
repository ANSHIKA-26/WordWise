let likeCount = 420;

function toggleLike(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        likeCount--;
    } else {
        element.classList.add('active');
        likeCount++;
    }
    element.querySelector('.count').innerText = likeCount;
}

    element.classList.toggle('active');


document.querySelector('.like').addEventListener('click', function() {
    toggleLike(this);
});

document.querySelector('.dislike').addEventListener('click', function() {
    toggleDislike(this);
});
