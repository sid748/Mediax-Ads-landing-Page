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


document.querySelectorAll(".counter").forEach((el) => {

  const finalValue = +el.getAttribute("data-target");

  const od = new Odometer({
    el: el,
    value: 0
  });

  let ranAlready = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !ranAlready){
        od.update(finalValue);   // starts animation ONLY when visible
        ranAlready = true;
        observer.unobserve(el);  // remove observe once done
      }
    });
  }, { threshold: 0.4 });

  observer.observe(el);

});


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


const videos = document.querySelectorAll('.testimonial-video');
const playButtons = document.querySelectorAll('.play-btn');

// set bg blur poster for info box
videos.forEach(v => {
  const poster = v.getAttribute('poster');
  const infoBox = v.closest('.testimonial-card').querySelector('.client-info');
  infoBox.style.setProperty('--bg', `url("${poster}")`);
});

function resetToPoster(video){
  video.pause();
  video.currentTime = 0;
  video.load(); // refresh like poster again
}

function togglePlay(button){
  const card = button.closest('.testimonial-card');
  const video = card.querySelector('video');
  const icon = button.querySelector('i');

  // pause others
  videos.forEach(v => {
    if(v !== video){
      resetToPoster(v);
      const other = v.closest('.testimonial-card').querySelector('.play-btn i');
      other.classList.remove('fa-pause');
      other.classList.add('fa-play');
    }
  });

  // play / pause
  if(video.paused){
    video.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  }else{
    resetToPoster(video);
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }
}

// auto reset on end
videos.forEach(video => {
  video.addEventListener('ended', () => {
    resetToPoster(video);
    const icon = video.closest('.testimonial-card').querySelector('.play-btn i');
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  });
});


// mobile menu animation code here
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");

// Initially hide off-screen
gsap.set(mobileMenu, { x: "-100%" });

menuToggle.addEventListener("click", () => {
  menuToggle.classList.add("hide"); // hide hamburger icon
  
  gsap.to(mobileMenu, { 
    x: "0%", 
    duration: 0.6, 
    ease: "power3.out" 
  });
});

closeMenu.addEventListener("click", () => {
  gsap.to(mobileMenu, { 
    x: "-100%", 
    duration: 0.6, 
    ease: "power3.in", 
    onComplete: () => {
      menuToggle.classList.remove("hide"); // show hamburger icon again
    }
  });
});




