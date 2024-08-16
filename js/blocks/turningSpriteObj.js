import { spriteObj } from "./spriteObj.js";
import { app } from "./app.js"

export class turningSpriteObj {
    end = null;
    currentAngle = null;
    upRight = null;
    upLeft = null;
    downLeft = null;
    downRight = null;
    defaultAlpha = 1;
    opts = null;
    constructor(path, position, movement, turningSpriteInteraction = null, defaultAlpha = 1) {
        this.opts = {
            tagBool: false,
            interaction: turningSpriteInteraction,
            movement: movement,
        };
        this.defaultAlpha = defaultAlpha;
        if (turningSpriteInteraction != null) {
            this.opts.interaction.isTurningSpriteChild = this;
        }

        // BELOW MUST BE SEQUENTIAL - DO NOT CHANGE ORDER
        this.setSpeedMultipliers(position.ur);
        this.upRight = new spriteObj(`${path}1.webp`, position.ur, this.opts);
        
        this.setSpeedMultipliers(position.ul);
        this.upLeft = new spriteObj(`${path}1.webp`, position.ul, this.opts);

        this.setSpeedMultipliers(position.dl);
        this.downLeft = new spriteObj(`${path}2.webp`, position.dl, this.opts);

        this.setSpeedMultipliers(position.dr);
        this.downRight = new spriteObj(`${path}2.webp`, position.dr, this.opts);
        
        this.end = movement.endCount;
        this.currentAngle = this.upRight;
    };
    setSpeedMultipliers(position) {
        this.opts.movement.xSpeedMultiplier = position.xSpeedMultiplier * 1;
        this.opts.movement.ySpeedMultiplier = position.ySpeedMultiplier * 1;
    };
    async initFront() {
        await this.upRight.init();
        await this.downRight.init();

        this.upRight.sprite.alpha = this.defaultAlpha;
        this.downRight.sprite.alpha = 0;
    };
    async initBack() {
        await this.upLeft.init();
        await this.downLeft.init();

        this.upLeft.sprite.scale.x *= -1;
        this.downLeft.sprite.scale.x *= -1

        this.upLeft.sprite.alpha = 0;
        this.downLeft.sprite.alpha = 0;
    };
    update(ratio) {
        this.upRight.update(ratio);
        this.takeCorner(this.upRight, this.upLeft);

        this.upLeft.update(ratio);
        this.takeCorner(this.upLeft, this.downLeft);

        this.downLeft.update(ratio);
        this.takeCorner(this.downLeft, this.downRight);

        this.downRight.update(ratio);
        this.takeCorner(this.downRight, this.upRight);

        // Required so that when the car goes from "dr" to "ur" there isn't a glitch of the "ur" sprite
        if (this.currentAngle != this.upRight) {
            this.upRight.m = 0;
        }
    };
    position(ratio) {
        this.upRight.position(ratio);
        this.takeCorner(this.upRight, this.upLeft);

        this.upLeft.position(ratio);
        this.takeCorner(this.upLeft, this.downLeft);

        this.downLeft.position(ratio);
        this.takeCorner(this.downLeft, this.downRight);

        this.downRight.position(ratio);
        this.takeCorner(this.downRight, this.upRight);

        // Required so that when the car goes from "dr" to "ur" there isn't a glitch of the "ur" sprite
        if (this.currentAngle != this.upRight) {
            this.upRight.m = 0;
        }
    };
    takeCorner(approachAngel, departureAngel) {
        if (approachAngel.m == this.end && this.currentAngle == approachAngel) {
            let s = this.currentAngle;
            approachAngel.sprite.alpha = 0;
            approachAngel.sprite.interactive = false;
            departureAngel.sprite.alpha = this.defaultAlpha;
            departureAngel.sprite.interactive = true;
            departureAngel.m = 0;
            this.currentAngle = departureAngel;
        }
    };
    removeChildren() {
        app.stage.removeChild(this.upRight.sprite);
        app.stage.removeChild(this.upLeft.sprite);
        app.stage.removeChild(this.downLeft.sprite);
        app.stage.removeChild(this.downRight.sprite);
    };
};
