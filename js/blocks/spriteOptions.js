// arguments for each sprite to be passed into the spriteObj constructor
import { infoSlideInterface } from "./infoSlide.js";
import { app, defaultCursor, IS_SMALL_SCREEN } from "./app.js";

// READ IN JSON
let infoSlideData;
export async function getJSON() {
    try {
        const response = await fetch('infoSlideData.json');
        const data = await response.json();
        infoSlideData = data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null;
    }
}
export function initInfoSlide() {
    const challengesTab = document.querySelector("#select-challenges");
    const isSelected = challengesTab.classList.contains("full-section-tab-link-light");
    infoSlideInterface.selected = isSelected ? "challenges" : "solutions";
}

// Const/Glocal variables
const targetCursor = `url('assets/canvas/cursors/target.webp') 16 16, auto`;
const wandCursor = `url('assets/canvas/cursors/wand.webp') 16 16, auto`;

// ========== Map ===========
export const mapPosition = {
    scaling: 1,
    xOffset: 0,
    yOffset: 0,
};

// ========== Warehouse ==========
export const warehousePosition = {
    scaling: 2.5,
    xOffset: 1.8,
    yOffset: -0.4,
};
const warehouseInteraction = {
    event: "mousedown",
    fn: () => {
        infoSlideInterface.populateSlide(infoSlideData.warehouse);
    },
};
export const warehouseOpts = {
    hasTagBool: true,
    interaction: warehouseInteraction,
    movement: null,
    isTagBool: false,
    tagSuffix: 'warehouse',
};

// ========== Motorbike ==========
export const motorbikePosition = {
    scaling: 0.1,
    xOffset: -37.5,
    yOffset: -22,
};
const explode = await PIXI.Assets.load('assets/gifs/explode.gif');
// const boom = new Audio('assets/boom.mp3');
const motorbikeInteraction = {
    event: "mousedown",
    fn: (motorbike/*, doomOverlay*/) => {
        document.body.style.cursor = defaultCursor;
        app.stage.removeChild(motorbike.sprite);
        explode.alpha = 1;
        explode.anchor.set(0.5);
        explode.width = 4 * motorbike.sprite.width;
        explode.height = 4 * motorbike.sprite.width;
        explode.x = motorbike.sprite.x;
        explode.y = motorbike.sprite.y;
        explode.loop = false;
        explode.onComplete = (() => explode.alpha = 0);
        explode.currentFrame = 0;
        app.stage.addChild(explode);
        explode.play();

        // boom.play();
        // document.body.style.cursor = `auto`;

        // doomOverlay.currentFrame = 0;
        // if (IS_SMALL_SCREEN) {
        //     doomOverlay.alpha = 0;
        // } else {
        //     app.stage.addChild(doomOverlay);
        //     doomOverlay.alpha = 1;
        // }
        // // doomOverlay.alpha = 1;
        // doomOverlay.play();
    },
    hoverCursor: targetCursor,
};
const motorbikeMovement = {
    speed: 1/25,
    xSpeedMultiplier: Math.tan(65.9 * (Math.PI/180)),
    ySpeedMultiplier: 1,
    endCount: 1000,
};
export const motorbikeOpts = {
    hasTagBool: false,
    interaction: motorbikeInteraction,
    movement: motorbikeMovement,
};

// ========== Car ==========
export const carMovement = {
    speed: 0.5, // .013
    xSpeedMultiplier: Math.tan(58.3 * (Math.PI/180)),
    ySpeedMultiplier: 1,
    endCount: 440, //353
};

// ========== PM Building ==========
export const pmBuildingPosition = {
    scaling: 2.5,
    xOffset: -1.6,
    yOffset: -0.54,
};
const pmBuildingInteraction = {
    event: "mousedown",
    fn: () => {
        infoSlideInterface.populateSlide(infoSlideData.pmBuilding);
    },
};
export const pmBuildingOpts = {
    hasTagBool: true,
    interaction: pmBuildingInteraction,
    movement: null,
    isTagBool: false,
    tagSuffix: 'pmBuilding',
};

// ========== Construction Site ==========
export const constructionSitePosition = {
    scaling: 2.5,
    xOffset: 0.15,
    yOffset: 0.9,
};
const constructionSiteInteraction = {
    event: "mousedown",
    fn: () => {
        infoSlideInterface.populateSlide(infoSlideData.constructionSite);
    },
};
export const constructionSiteOpts = {
    hasTagBool: true,
    interaction: constructionSiteInteraction,
    movement: null,
    isTagBool: false,
    tagSuffix: 'constructionSite',
};

// ========== Jumbo ==========
export const jumboPosition = {
    scaling: 0.3,
    xOffset: 10,
    yOffset: 4,
};
const magicPoof = await PIXI.Assets.load('assets/gifs/magicPoof.gif');
const jumboInteraction = {
    event: "mousedown",
    fn: (jumbo, shadow) => {
        document.body.style.cursor = defaultCursor;
        app.stage.removeChild(jumbo.sprite);
        app.stage.removeChild(shadow.sprite);
        magicPoof.alpha = 1;
        magicPoof.anchor.set(0.5);
        magicPoof.width = 1.7 * jumbo.sprite.width;
        magicPoof.height = 1.7 * jumbo.sprite.width;
        magicPoof.x = jumbo.sprite.x;
        magicPoof.y = jumbo.sprite.y;
        magicPoof.loop = false;
        magicPoof.onComplete = (() => magicPoof.alpha = 0);
        magicPoof.animationSpeed *= 0.75;
        magicPoof.currentFrame = 0;
        app.stage.addChild(magicPoof);
        magicPoof.play();
    },
    hoverCursor: wandCursor,
};
const jumboMovement = {
    speed: 1/100,
    xSpeedMultiplier: -1 * Math.tan(70 * (Math.PI/180)),
    ySpeedMultiplier: -1 * 1,
    endCount: 1200,
};
export const jumboOpts = {
    hasTagBool: false,
    interaction: jumboInteraction,
    movement: jumboMovement,
};
export const jumboShadowPosition = {
    scaling: jumboPosition.scaling,
    xOffset: jumboPosition.xOffset + 0.4,
    yOffset: jumboPosition.yOffset + 3.8,
};
export const jumboShadowOpts = {
    hasTagBool: false,
    interaction: null,
    movement: jumboMovement,
};

// ========== Airplane ==========
export const airplanePosition = {
    scaling: 0.3,
    xOffset: 5.5,
    yOffset: -6,
};
const airplaneInteraction = {
    event: "mousedown",
    fn: (airplane, shadow) => {
        document.body.style.cursor = defaultCursor;
        app.stage.removeChild(airplane.sprite);
        app.stage.removeChild(shadow.sprite);
        magicPoof.alpha = 1;
        magicPoof.anchor.set(0.5);
        magicPoof.width = 1.7 * airplane.sprite.width;
        magicPoof.height = 1.7 * airplane.sprite.width;
        magicPoof.x = airplane.sprite.x;
        magicPoof.y = airplane.sprite.y;
        magicPoof.loop = false;
        magicPoof.onComplete = (() => magicPoof.alpha = 0);
        magicPoof.animationSpeed *= 0.75;
        magicPoof.currentFrame = 0;
        app.stage.addChild(magicPoof);
        magicPoof.play();
    },
    hoverCursor: wandCursor,
};
const airplaneMovement = {
    speed: 1/80,
    xSpeedMultiplier: -1 * Math.tan(70 * (Math.PI/180)),
    ySpeedMultiplier:1,
    endCount: 750,
};
export const airplaneOpts = {
    hasTagBool: false,
    interaction: airplaneInteraction,
    movement: airplaneMovement,
};
export const airplaneShadowPosition = {
    scaling: airplanePosition.scaling,
    xOffset: airplanePosition.xOffset + 0.4,
    yOffset: airplanePosition.yOffset + 7.8,
};

// ========== Isometric xSpeedMultiplier Angle Function ==========
const isometricAngle = (degrees) => {
    return Math.tan(degrees * (Math.PI/180));
}

// ========== Fighter ==========
export const fighterMovement = {
    speed: 0.045,
    // xSpeedMultiplier: isometricAngle(47.5),
    ySpeedMultiplier: 1,
    endCount: 1000*2,
};
const fighterScaling = 0.5;
const fighterURPosition = {
    scaling: fighterScaling,
    xOffset: -17,
    yOffset: 20,
    xSpeedMultiplier: isometricAngle(47.5),
    ySpeedMultiplier: -1,
};
const fighterULPosition = {
    scaling: fighterScaling,
    xOffset: 5,
    yOffset: 3,
    xSpeedMultiplier: -1 * isometricAngle(47.5),
    ySpeedMultiplier: -1,
};
const fighterDLPosition = {
    scaling: fighterScaling,
    xOffset: 3,
    yOffset: -5,
    xSpeedMultiplier: -1 * isometricAngle(47.5),
    ySpeedMultiplier: 1,
};
const fighterDRPosition = {
    scaling: fighterScaling,
    xOffset: -2,
    yOffset: -6,
    xSpeedMultiplier: isometricAngle(47.5),
    ySpeedMultiplier: 1,
};
export const fighterPosition = {
    ur: fighterURPosition,
    ul: fighterULPosition,
    dl: fighterDLPosition,
    dr: fighterDRPosition,
};
function fighterShadowShifter(direction) {
    let altDirection = {...direction};
    altDirection.xOffset += 0.3;
    altDirection.yOffset += 0.3;
    return altDirection;
}
export const fighterShadowPosition = {
    ur: fighterShadowShifter(fighterURPosition),
    ul: fighterShadowShifter(fighterULPosition),
    dl: fighterShadowShifter(fighterDLPosition),
    dr: fighterShadowShifter(fighterDRPosition),
};

// ========== Cement Truck ==========
export const cementTruckMovement = {
    speed: 1/70,
    // xSpeedMultiplier: Math.tan(47.5 * (Math.PI/180)),
    ySpeedMultiplier: 1,
    endCount: 346,
};
const cementTruckScaling = 0.25;
const cementTruckURPosition = {
    scaling: cementTruckScaling,
    xOffset: 1.0,
    yOffset: 9.2,
    xSpeedMultiplier: isometricAngle(55.4),
    ySpeedMultiplier: -1,
};
const cementTruckULPosition = {
    scaling: cementTruckScaling,
    xOffset: 8.25,
    yOffset: 3.7,
    xSpeedMultiplier: -1 * isometricAngle(55.4),
    ySpeedMultiplier: -1,
};
const cementTruckDLPosition = {
    scaling: cementTruckScaling,
    xOffset: 0.3,
    yOffset: -1.36,
    xSpeedMultiplier: -1 * isometricAngle(58.15),
    ySpeedMultiplier: 1,
};
const cementTruckDRPosition = {
    scaling: cementTruckScaling,
    xOffset: -7.4,
    yOffset: 3.6,
    xSpeedMultiplier: isometricAngle(58.2),
    ySpeedMultiplier: 1,
};
export const cementTruckPosition = {
    ur: cementTruckURPosition,
    ul: cementTruckULPosition,
    dl: cementTruckDLPosition,
    dr: cementTruckDRPosition,
};

// ========== Sports Car ==========
export const sportsCarMovement = {
    speed: 1/20,
    ySpeedMultiplier: 1,
    endCount: 350,
};
const sportsCarScaling = 0.25;
const sportsCarURPosition = {
    scaling: sportsCarScaling,
    xOffset: -9.55,
    yOffset: 5.85,
    xSpeedMultiplier: isometricAngle(48),
    ySpeedMultiplier: -1,
};
const sportsCarULPosition = {
    scaling: sportsCarScaling,
    xOffset: 9.7,
    yOffset: -12,
    xSpeedMultiplier: -1 * isometricAngle(48),
    ySpeedMultiplier: -1,
};
const sportsCarDLPosition = {
    scaling: sportsCarScaling,
    xOffset: 50,
    yOffset: 50,
    xSpeedMultiplier: 0,
    ySpeedMultiplier: 0,
};
const sportsCarDRPosition = {
    scaling: sportsCarScaling,
    xOffset: -32,
    yOffset: -12.5,
    xSpeedMultiplier: isometricAngle(51.5),
    ySpeedMultiplier: 1,
};
export const sportsCarPosition = {
    ur: sportsCarURPosition,
    ul: sportsCarULPosition,
    dl: sportsCarDLPosition,
    dr: sportsCarDRPosition,
};

// ========== Police Car ==========
export const policeCarPosition = {
    scaling: 0.3,
    xOffset: -15.8,
    yOffset: 11.45,
};
const policeCarInteraction = {
    event: "mousedown",
    fn: (policeCar/*, doomOverlay*/) => {
        document.body.style.cursor = defaultCursor;
        app.stage.removeChild(policeCar.sprite);
        explode.alpha = 1;
        explode.anchor.set(0.5);
        explode.width = 2 * policeCar.sprite.width;
        explode.height = 2 * policeCar.sprite.width;
        explode.x = policeCar.sprite.x;
        explode.y = policeCar.sprite.y;
        explode.loop = false;
        explode.onComplete = (() => explode.alpha = 0);
        explode.currentFrame = 0;
        app.stage.addChild(explode);
        explode.play();

        // if (IS_SMALL_SCREEN) {
        //     doomOverlay.alpha = 0;
        // } else {
        //     let height;
        //     let ratio;
        //     doomOverlay.anchor.set(0.5);
        //     height = app.screen.height * 0.6;
        //     ratio = height / doomOverlay.height;
        //     doomOverlay.height = height;
        //     doomOverlay.width *= ratio;
        //     doomOverlay.x = app.screen.width * (1.5 / 3);
        //     doomOverlay.y = app.screen.height - (height / 2);
        //     doomOverlay.loop = false;
        //     doomOverlay.onComplete = (() => {
        //         setTimeout(() => {
        //             document.body.style.cursor = defaultCursor;
        //             doomOverlay.alpha = 0;
        //             app.stage.removeChild(doomOverlay);
        //         }, 400);
        //     });
        //     doomOverlay.currentFrame = 0;
        //     app.stage.addChild(doomOverlay);
        //     doomOverlay.alpha = 1;
        // }
        // // doomOverlay.alpha = 1;
        // doomOverlay.play();
    },
    hoverCursor: targetCursor,
};
const policeCarMovement = {
    speed: 2/35,
    xSpeedMultiplier: isometricAngle(49.1),
    ySpeedMultiplier: -1,
    endCount: 1400,
};
export const policeCarOpts = {
    hasTagBool: false,
    interaction: policeCarInteraction,
    movement: policeCarMovement,
};

// ========== UTE ==========
export const uteMovement = {
    speed: 1/90,
    ySpeedMultiplier: 1,
    endCount: 1200,
};
const uteScaling = 0.25;
const uteULPosition = {
    scaling: uteScaling,
    xOffset: 1.0,
    yOffset: -3.1,
    xSpeedMultiplier: isometricAngle(51) * 1.75,
    ySpeedMultiplier: -1 * 1.75,
};
const uteURPosition = {
    scaling: uteScaling,
    xOffset: 17,
    yOffset: 11.2,
    xSpeedMultiplier: -1 * isometricAngle(51.05),
    ySpeedMultiplier: -1,
};
const uteDLPosition = {
    scaling: uteScaling,
    xOffset: 50,
    yOffset: 50,
    xSpeedMultiplier: 0,
    ySpeedMultiplier: 0,
};
const uteDRPosition = {
    scaling: uteScaling,
    xOffset: 50,
    yOffset: 50,
    xSpeedMultiplier: 0,
    ySpeedMultiplier: 0,
};
export const utePosition = {
    ur: uteURPosition,
    ul: uteULPosition,
    dl: uteDLPosition,
    dr: uteDRPosition,
};
