const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const colors = [
  "#ffbe73", // slightly brighter orange for better contrast
  "#fcb96f",
  "#f8a76a",
  "#f59e68",
  "#ef8d65",
  "#ec8864",
  "#e27763", // increased brightness for better visibility
  "#de7162",
  "#d36162",
  "#cf5b62",
  "#c34b62",
  "#bd4561", // toned down to reduce harsh contrast
  "#ad3562",
  "#a62f62",
  "#951f63",
  "#8e1862",
  "#7b0963", // darkened for better visibility in light theme
  "#740162",
  "#5f0162", // adjusted for balanced visibility
  "#570161",
  "#410161", 
  "#360161"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();
