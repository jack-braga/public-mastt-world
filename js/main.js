// https://pixijs.com/8.x/guides/basics/getting-started#:~:text=There%20are%20only%20a%20few%20steps%20required%20to,to%20the%20stage%207%20Write%20an%20update%20loop

import { app, IS_SMALL_SCREEN } from "./blocks/app.js";
import { spriteObj } from "./blocks/spriteObj.js";
import { turningSpriteObj } from "./blocks/turningSpriteObj.js";
import { spriteArray } from "./blocks/infoSlide.js";
import { mapPosition, turningSpriteInteraction,
    warehousePosition, warehouseOpts,
    motorbikePosition, motorbikeOpts,
    policeCarPosition, policeCarOpts,
    utePosition, uteMovement,
    jumboPosition, jumboOpts, jumboShadowPosition, jumboShadowOpts,
    airplanePosition, airplaneOpts, airplaneShadowPosition, airplaneShadowOpts,
    getJSON,initInfoSlide,
    cementTruckPosition, cementTruckMovement,
    sportsCarPosition, sportsCarMovement,
    fighterPosition, fighterMovement, fighterShadowPosition,
    pmBuildingPosition, pmBuildingOpts,
    constructionSitePosition, constructionSiteOpts }
    from './blocks/spriteOptions.js';

function getScaleRatio(spriteObj) {
    let hRatio = app.screen.height / spriteObj.sprite.height;
    let wRatio = app.screen.width / spriteObj.sprite.width;
    if (IS_SMALL_SCREEN) {
        let result = hRatio < wRatio ? hRatio : wRatio;
        return result * 1.5;
    } else {
        return hRatio > wRatio ? hRatio : wRatio;
    }
};

// Get JSON
await getJSON();
initInfoSlide();

// Init Map
const map = new spriteObj("assets/canvas/map-compressed-4.webp", mapPosition);
await map.init();

// Init Warehouse
const warehouse = new spriteObj("assets/canvas/hit-box.webp", warehousePosition, warehouseOpts);
await warehouse.init();
warehouse.sprite.rotation = Math.PI / 7;
warehouse.sprite.scale.x *= 1.3;
warehouse.tag.spriteObj.yOffset -= 0.3;

// Init PM Building
const pmBuilding = new spriteObj("assets/canvas/hit-box.webp", pmBuildingPosition, pmBuildingOpts);
await pmBuilding.init();
// pmBuilding.sprite.rotation = Math.PI - (Math.PI / 3);
pmBuilding.sprite.rotation = Math.PI / 2;
pmBuilding.sprite.scale.x *= 1.5;
pmBuilding.tag.spriteObj.xOffset -= 0.335;

// Init Construction Site
const constructionSite = new spriteObj("assets/canvas/hit-box.webp", constructionSitePosition, constructionSiteOpts);
await constructionSite.init();
constructionSite.sprite.rotation = Math.PI / 7;
constructionSite.sprite.scale.x *= 1.3;
constructionSite.tag.spriteObj.yOffset += 0.3;

// Init Motorbike
const motorbike = new spriteObj("assets/canvas/vehicles/motorbike/motorbike.webp", motorbikePosition, motorbikeOpts);
await motorbike.init();

// Init Sports Car
const sportsCar = new turningSpriteObj("assets/canvas/vehicles/sportsCar/sportsCar-", sportsCarPosition, sportsCarMovement, turningSpriteInteraction);
await sportsCar.initBack();
await sportsCar.initFront();

// Init Police Car
const policeCar = new spriteObj("assets/canvas/vehicles/policeCar/policeCar.webp", policeCarPosition, policeCarOpts);
await policeCar.init();

// Init UTE
const ute = new turningSpriteObj("assets/canvas/vehicles/ute/ute-", utePosition, uteMovement, turningSpriteInteraction);
await ute.initBack();
await ute.initFront();
ute.upRight.sprite.scale.x *= -1;
ute.upLeft.sprite.scale.x *= -1;

// Init Cement Truck
const cementTruck = new turningSpriteObj("assets/canvas/vehicles/cementTruck/cementTruck-", cementTruckPosition, cementTruckMovement, turningSpriteInteraction);
await cementTruck.initBack();
await cementTruck.initFront();

// Init Fighter Shadow
const fighterShadow = new turningSpriteObj("assets/canvas/vehicles/fighter/fighter-shadow-", fighterShadowPosition, fighterMovement, null, 0.4);
await fighterShadow.initBack();
await fighterShadow.initFront();

// Init Fighter
const fighter = new turningSpriteObj("assets/canvas/vehicles/fighter/fighter-", fighterPosition, fighterMovement, turningSpriteInteraction);
await fighter.initBack();
await fighter.initFront();
fighter.shadow = fighterShadow;

// Init Jumbo Shadow
const jumboShadow = new spriteObj("assets/canvas/vehicles/jumbo/jumbo-shadow.webp", jumboShadowPosition, jumboShadowOpts);
await jumboShadow.init();
jumboShadow.sprite.alpha = 0.3;

// Init Jumbo
const jumbo = new spriteObj("assets/canvas/vehicles/jumbo/jumbo.webp", jumboPosition, jumboOpts);
jumbo.shadow = jumboShadow;
await jumbo.init();

// Init Airplane Shadow
const airplaneShadow = new spriteObj("assets/canvas/vehicles/airplane/airplane-shadow.webp", airplaneShadowPosition, airplaneShadowOpts);
await airplaneShadow.init();
airplaneShadow.sprite.alpha = 0.2;

// Init Airplane
const airplane = new spriteObj("assets/canvas/vehicles/airplane/airplane.webp", airplanePosition, airplaneOpts);
airplane.shadow = airplaneShadow;
await airplane.init();

// Scaling
let ratio = 1;
let isFrozen = false;

function scaleSprites() {
    // Get canvas size
    ratio = getScaleRatio(map);

    // Scale map + buildings
    spriteObj.buildingSpriteArray.forEach(buildingSprite => {
        buildingSprite.update(ratio);
    });

    // Scale vehicles
    isFrozen = false;
}

let lastTimeoutId;
window.addEventListener('resize', e => {
    e.preventDefault();
    clearTimeout(lastTimeoutId);
    isFrozen = true;
    lastTimeoutId = setTimeout(scaleSprites, 600);
});


// Init Scale
spriteObj.buildingSpriteArray.forEach(buildingSprite => {
    if (buildingSprite.hasTagBool) {
        buildingSprite.sprite.alpha = 0;
    }
});
scaleSprites();

// Animation
let elapsed = 0.0;
app.ticker.speed = 0.5;
app.ticker.add((ticker) => {
    elapsed += ticker.deltaTime;

    // Position vehicles
    if (!isFrozen && elapsed >= 90) {
        const tempRatio = getScaleRatio(map);
        motorbike.position(tempRatio);
        // car.position(tempRatio);
        jumbo.position(tempRatio);
        jumboShadow.position(tempRatio);
        airplane.position(tempRatio);
        airplaneShadow.position(tempRatio);
        fighter.position(tempRatio);
        fighterShadow.position(tempRatio);
        cementTruck.position(tempRatio);
        sportsCar.position(tempRatio);
        policeCar.position(tempRatio);
        ute.position(tempRatio);
        
        spriteObj.tagSpriteArray.forEach(tagSprite => {
            tagSprite.update(tempRatio);
        });
    }
});
