// Set Up Canvas
export const app = new PIXI.Application();

// Init Canvas
await app.init({
    backgroundColor: 0xFFFFFF,
    resolution: window.devicePixelRatio || 2,
    autoDensity: true,
    resizeTo: document.querySelector("#wrapper"),
});
document.querySelector("#wrapper").appendChild(app.canvas);

// Make Table Content Backdrop proper size
function resizeSlideContentBackdrop() {
    const heading = document.querySelector('.heading');
    const tabsMenu = document.querySelector('.tabs-menu');
    const slideContent = document.querySelector('.slide-content');

    const headingHeight = heading.offsetHeight;
    const tabsMenuHeight = tabsMenu.offsetHeight;

    const remainingHeight = `calc(91vh - ${headingHeight}px - ${tabsMenuHeight}px)`;
    slideContent.style.height = remainingHeight;
}
window.addEventListener('resize', e => {
    e.preventDefault();
    resizeSlideContentBackdrop();
});

// Create Moonlight Div/Filter
const container = document.createElement("div");
container.className = `container`;
const moonlight = document.createElement("div");
moonlight.className = `moonlight`;
const appCanvas = document.querySelector(`canvas`);
container.appendChild(appCanvas);
container.appendChild(moonlight);
document.querySelector("#wrapper").appendChild(container);

// Theme Toggle
const toggle = document.querySelector('.toggle');
const icon = document.getElementById('toggle-icon');
const magicPoof = await PIXI.Assets.load('assets/gifs/magicPoof.gif');
const explode = await PIXI.Assets.load('assets/gifs/explode.gif');
explode.scale.set(0.1);
export let defaulfGif = magicPoof;
export let defaulfGifScale = 1;

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    icon.textContent = `${theme}_mode`;
    if (theme == 'dark') {
        defaulfGif = explode;
        defaulfGifScale = 0.55;
    } else {
        defaulfGif = magicPoof;
        defaulfGifScale = 1;
    }
}

toggle.addEventListener("click", e => {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    toggle.classList.toggle('active');
    setTheme(newTheme);
});
let savedTheme = 'light';
// document.addEventListener('DOMContentLoaded', e => {
setTimeout(() => {
    // e.preventDefault();
    savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    if (savedTheme == 'dark' && !toggle.classList.contains('active')) {
        toggle.classList.toggle('active');
    }
    document.body.style.filter = `none`;
    resizeSlideContentBackdrop();
}, 1000);

// Adjust resizing of map based on media query (for small screens)
export let IS_SMALL_SCREEN = false;
const mediaQuery = window.matchMedia('(max-width: 930px)');
function handleSmallScreenResize(event) {
    IS_SMALL_SCREEN = event.matches ? true : false;
}
mediaQuery.addEventListener("change", handleSmallScreenResize);
handleSmallScreenResize(mediaQuery);

// Default Cursor
export let defaultCursor = 'auto';
