import { app, defaultCursor, IS_SMALL_SCREEN } from "./app.js"
import { tag } from "./tag.js";
import { spriteArray } from "./infoSlide.js";

export class spriteObj {
    constructor(path, position, opts = { hasTagBool: false, interaction: null, movement: null, isTagBool: false }) {
        this.path = path;
        // Position
        this.scaling = position.scaling;
        this.xOffset = position.xOffset;
        this.yOffset = position.yOffset;

        // Interaction
        this.event = opts.interaction?.event;
        this.fn = opts.interaction?.fn;
        this.interactive = opts.interaction;

        // Movement
        this.speed = opts.movement?.speed ?? 0;
        this.xSpeed = opts.movement?.xSpeedMultiplier ?? 0;
        this.ySpeed = opts.movement?.ySpeedMultiplier ?? 0;
        this.end = opts.movement?.endCount ?? 0;

        // Tag Bool
        this.hasTagBool = opts.hasTagBool;
        this.tag = null;
        this.isTagBool = opts.isTagBool;
        
        // Other
        this.m = 0;
        spriteArray.push(this);
        if (!this.isTagBool) {
            spriteObj.buildingSpriteArray.push(this);
        }
        this.tagSuffix = null;
        if (this.hasTagBool) {
            this.tagSuffix = opts.tagSuffix;
        }
        this.timeoutId = null;
    };
    static buildingSpriteArray = [];
    static tagSpriteArray = [];
    async init() {
        try {
            await PIXI.Assets.load(this.path);
            this.sprite = await PIXI.Sprite.from(this.path);
            let s = this.sprite;
            s.anchor.set(0.5);
            s.interactive = this.interactive;
            s.height *= this.scaling;
            s.width *= this.scaling;
            await app.stage.addChild(s);
            this.position();
            if (this.hasTagBool) {
                this.tag = new tag(this.xOffset, this.yOffset, this.tagSuffix);   
                
                await this.tag.init();

                // Hover Action
                const startHoverFn = () => {
                    this.tag.appear();
                    document.body.style.cursor = `pointer`;
                }
                const endHoverFn = () => {
                    this.tag.disappear();
                    document.body.style.cursor = defaultCursor;
                }
                this.sprite.on("mouseover", startHoverFn);
                this.sprite.on("touchstart", startHoverFn);
                this.sprite.on("mouseout", endHoverFn);
                this.sprite.on("touchendoutside", endHoverFn);
            }
            if (this.interactive) {
                if (this.path == "assets/canvas/vehicles/jumbo/jumbo.webp" ||
                    this.path == "assets/canvas/vehicles/airplane/airplane.webp") {
                    // Jumbo & Airplane
                    this.sprite.on("mouseover", () => document.body.style.cursor = `url('assets/canvas/cursors/wand.webp') 16 16, auto`);
                    this.sprite.on("mouseout", () => document.body.style.cursor = defaultCursor);
                    
                    this.sprite.on(this.event, () => this.fn(this, this.shadow));
                    this.sprite.on("touchend", () => this.fn(this, this.shadow));
                } else if (this.path == "assets/canvas/vehicles/motorbike/motorbike.webp" ||
                    this.path == "assets/canvas/vehicles/policeCar/policeCar.webp") {
                    // Motorcycle & Police Car else 
                    const doomOverlay = await PIXI.Assets.load('assets/gifs/doomOverlay.gif');
                    // removes doom overlay:
                    app.stage.removeChild(doomOverlay);
                    doomOverlay.animationSpeed *= 1.1;
                    this.sprite.on("mouseover", () => {
                        document.body.style.cursor = `url('assets/canvas/cursors/target.webp') 16 16, auto`;
                        if (IS_SMALL_SCREEN) {
                            doomOverlay.alpha = 0;
                        } else {
                            doomOverlay.alpha = 1;
                        }
                        doomOverlay.zIndex = 2;
                        let height;
                        let width;
                        let ratio;
                        if (IS_SMALL_SCREEN) {
                            null;
                        } else {
                            doomOverlay.anchor.set(0.5);
                            height = app.screen.height * 0.6;
                            ratio = height / doomOverlay.height;
                            doomOverlay.height = height;
                            doomOverlay.width *= ratio;
                            doomOverlay.x = app.screen.width * (1.5 / 3);
                            doomOverlay.y = app.screen.height - (height / 2);
                        }
                        doomOverlay.loop = false;
                        doomOverlay.onComplete = (() => {
                            setTimeout(() => {
                                document.body.style.cursor = defaultCursor;
                                doomOverlay.alpha = 0;
                                app.stage.removeChild(doomOverlay);
                            }, 400);
                        });
                        doomOverlay.currentFrame = 11;
                        doomOverlay.stop();
                        app.stage.addChild(doomOverlay);
                    });
                    this.sprite.on("mouseout", () => {
                        clearTimeout(this.timeoutId);
                        this.timeoutId = setTimeout(() => {
                            document.body.style.cursor = defaultCursor;
                            doomOverlay.alpha = 0;
                            app.stage.removeChild(doomOverlay);
                        }, 0);
                    });

                    // this.sprite.on(this.event, () => this.fn(this, doomOverlay));
                    // this.sprite.on("touchend", () => this.fn(this, doomOverlay));
                } else {
                    this.sprite.on(this.event, () => this.fn(this));
                    this.sprite.on("touchend", () => this.fn(this));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    position(ratio) {
        let s = this.sprite;
        s.x = (app.screen.width / 2) + (s.width * ratio * (this.xOffset)) + ((s.width * ratio * this.xSpeed * this.m * this.speed));
        s.y = (app.screen.height / 2) + (s.height * ratio * (this.yOffset)) + ((s.height * ratio * this.ySpeed * this.m * this.speed));
        this.m = this.m + 1;

        if (this.m > this.end) {
            this.m = 0;
        }
    };
    scale(ratio) {
        this.sprite.height *= ratio;
        this.sprite.width *= ratio;
        if (this.interactive) {
            if (this.path == "assets/canvas/vehicles/motorbike/motorbike.webp") {
                this.sprite.hitArea = new PIXI.Circle(this.sprite.width / 2, this.sprite.height / 2, app.screen.height / 1.7);
            } else if (this.path == "assets/canvas/vehicles/policeCar/policeCar.webp") {
                this.sprite.hitArea = new PIXI.Circle(this.sprite.width / 2, this.sprite.height / 2, app.screen.height / 3);
            }
        }
    };
    update(ratio) {
        this.position(ratio);
        this.scale(ratio);
    };
}