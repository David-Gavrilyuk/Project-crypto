// Coin GIF scrolling
const overlayGif = document.getElementById("overlayGif");
const overlayContainer = document.getElementById("overlay-container");
const parallaxHeader = document.getElementById("parallaxHeader");

let navbarHeight = 0;
let originalPosition = 0;

function updateNavbarHeight() {
  navbarHeight = document.getElementById("navbarBox").offsetHeight;
  originalPosition = overlayContainer.offsetTop;
}

updateNavbarHeight();

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const stoppingPoint = 160;

  overlayContainer.style.top = `${Math.min(stoppingPoint, Math.max(navbarHeight, scrollPosition))}px`;
  if (scrollPosition < navbarHeight) overlayContainer.style.top = `${originalPosition}px`;
});

window.addEventListener("resize", updateNavbarHeight);

// Change coin color on click
const coin = document.getElementById("overlay-container");
const filters = ["grayscale(0%) contrast(120%)", "grayscale(100%) contrast(120%)", "hue-rotate(1765deg) contrast(120%)"];
let filterIndex = 0;
coin.addEventListener("click", () => {
  filterIndex = (filterIndex + 1) % filters.length;
  coin.style.filter = filters[filterIndex];
});
