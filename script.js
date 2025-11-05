// hero section code here
const hero = document.querySelector('.hero');   // hero section
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  // canvas size = hero section size
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;

  // position canvas on top of hero
  canvas.style.width = hero.offsetWidth + "px";
  canvas.style.height = hero.offsetHeight + "px";
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouse = { x: -1000, y: -1000 };

window.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();

  // check if mouse is inside hero
  if (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  ) {
    // adjust mouse coordinates relative to hero
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  } else {
    mouse.x = -1000; // hide when outside
    mouse.y = -1000;
  }
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let spacing = 40;   // distance between grid lines
  let radius = 200;   // circular radius

  // Only show grid INSIDE the circle near cursor
  ctx.save();
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.restore();

  requestAnimationFrame(drawGrid);
}
drawGrid();


// counter section code here
// Smooth Counter Animation (Ease-Out)
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 2000; // total animation time (ms)
  const start = 0;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);

    const current = Math.floor(start + easeOut * (target - start));
    counter.innerText = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.innerText = target; // ensure it ends perfectly
    }
  };

  requestAnimationFrame(update);
};

// Trigger animation when section is visible
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// slick slider code here
$(document).ready(function(){
  $('.trusted-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,   // no delay
    speed: 3000,        // smooth speed
    cssEase: 'linear',  // continuous linear movement
    arrows: false,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });
});

// testimonial video play/pause code here

function togglePlay(button) {
  const video = button.closest('.video-wrapper').querySelector('video');
  if (video.paused) {
    video.play();
    button.querySelector('i').classList.remove('fa-play');
    button.querySelector('i').classList.add('fa-pause');
  } else {
    video.pause();
    button.querySelector('i').classList.remove('fa-pause');
    button.querySelector('i').classList.add('fa-play');
  }
}


