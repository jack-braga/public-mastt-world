import { defaultCursor, IS_SMALL_SCREEN } from './app.js';

// Interface to adjust info slide
export const infoSlideInterface = {
    selected: "challenges",
    description: null,
    setHeading: (heading) => {
        document.querySelector(".infoSlide h1").innerHTML = ` ${heading}`;
    },
    setImage: (imgPath) => {
        let headingImg = document.querySelector(".building-img");
        if (headingImg != null) {
            headingImg.src = imgPath;
        }
    },
    setDescription: () => {
        document.querySelector(".description").innerHTML = infoSlideInterface.description[infoSlideInterface.selected];
    },
    setIcon: (icon) => {
        document.querySelector(".icon").innerHTML = icon;
    },
    populateSlide: (jsonObj) => {
        infoSlideInterface.setIcon(jsonObj.icon);
        infoSlideInterface.setHeading(jsonObj.role);
        infoSlideInterface.setImage(jsonObj.img);
        infoSlideInterface.description = jsonObj.description;
        infoSlideInterface.setDescription();
        openInfo();
    }
};


// Init opening the info slide
export const spriteArray = [];
const infoSlide = document.querySelector(".infoSlide");
const blurr = document.querySelector(".blurr");
const logo = document.querySelector(".logo");
const toggle = document.querySelector(".toggle");
function closeInfo() {
    infoSlide.style.left = '-100%';
    blurr.style.left = 'var(--close-blur)';
    logo.style.right = 'var(--close-logo)';
    logo.style.borderRadius = 'var(--close-logo-border-radius)';
    logo.style.transition = 'var(--close-logo-transition)';
    toggle.style.bottom = 'var(--close-toggle-bottom)';
    toggle.style.transition = 'var(--close-toggle-transition)';
    spriteArray.forEach((e) => {
        if (e.interactive) {
            e.sprite.interactive = true;
        }
    });
}
function openInfo() {
    infoSlide.style.left = '0';
    blurr.style.left = 'var(--open-blur)';
    logo.style.right = 'var(--open-logo)';
    logo.style.borderRadius = 'var(--open-logo-border-radius)';
    logo.style.transition = 'var(--open-logo-transition)';
    toggle.style.bottom = 'var(--open-toggle-bottom)';
    toggle.style.transition = 'var(--open-toggle-transition)';
    spriteArray.forEach((e) => {
        if (e.interactive) {
            e.sprite.interactive = false;
            if (e.hasTagBool) {
                e.tag.disappear();
                document.body.style.cursor = defaultCursor;
            }
        }
    });
}
document.querySelector(".close").addEventListener("click", e => {
    e.preventDefault();
    closeInfo();
});
blurr.addEventListener("click", e => {
    e.preventDefault();
    closeInfo();
});

const challenges = document.querySelector("#select-challenges");
const solutions = document.querySelector("#select-solutions");

challenges.addEventListener("click", e => {
    e.preventDefault();
    challenges.classList.remove("full-section-tab-link-dark");
    challenges.classList.add("full-section-tab-link-light");
    solutions.classList.remove("full-section-tab-link-light");
    solutions.classList.add("full-section-tab-link-dark");
    infoSlideInterface.selected = "challenges";
    infoSlideInterface.setDescription();
});

solutions.addEventListener("click", e => {
    e.preventDefault();
    solutions.classList.remove("full-section-tab-link-dark");
    solutions.classList.add("full-section-tab-link-light");
    challenges.classList.remove("full-section-tab-link-light");
    challenges.classList.add("full-section-tab-link-dark");
    infoSlideInterface.selected = "solutions";
    infoSlideInterface.setDescription();
});

