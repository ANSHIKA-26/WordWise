// Function to update the progress bar width as the user scrolls
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
  
    document.getElementById('progress-bar').style.width = scrollPercentage + '%';
  }
  
  // Event listener for scrolling to update the progress bar
  window.addEventListener('scroll', updateProgressBar);
  