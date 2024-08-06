// tag function that appears over building when hovering

import { app } from "./app.js"
import { spriteObj } from "./spriteObj.js";

const DELAY = 4;
const MIN_ALPHA = 0.8;

export class tag {
    constructor(xOffset, yOffset, tagSuffix) {
        const xAmplify = 3.125 / 2;
        const yAmplify = 3.9 / 2;
        const tagPosistion = {
            scaling: 0.64, // 3/2
            xOffset: xOffset * xAmplify,
            yOffset: yOffset * yAmplify,
        };
        const tagOpts = {
            hasTagBool: false,
            interaction: null,
            movement: null,
            isTagBool: false
        };
        this.spriteObj = new spriteObj(`assets/canvas/tags/tag-${tagSuffix}.png`, tagPosistion, tagOpts);
        this.makeVisible = false;
        this.rendered = false;
        this.delay = 0;
        spriteObj.tagSpriteArray.push(this);
    };
    async init() {
        await this.spriteObj.init();
        this.spriteObj.sprite.alpha = MIN_ALPHA;
    };
    update(ratio) {
        this.spriteObj.update(ratio);
        const alpha = this.spriteObj.sprite.alpha;
        if (this.makeVisible && alpha <= 1) {
            if (this.delay > DELAY) {
                if (!this.rendered) {
                    app.stage.addChild(this.spriteObj.sprite);
                    this.rendered = true;
                }
                this.spriteObj.sprite.alpha += 0.08;
                this.spriteObj.sprite.scale.y += 0.08 / 32;
                if (this.spriteObj.path == `assets/canvas/tags/tag-constructionSite.png`) {
                    this.spriteObj.yOffset -= 0.08 / 5;
                }
            }
            this.delay += 1;
        } else if (!this.makeVisible) {
            if (alpha >= MIN_ALPHA) {
                this.spriteObj.sprite.alpha -= 0.1;
                this.spriteObj.sprite.scale.y -= 0.1 / 32;
                if (this.spriteObj.path == `assets/canvas/tags/tag-constructionSite.png`) {
                    this.spriteObj.yOffset += 0.1 / 5;
                }
            } else {
                this.rendered = false;
                this.delay = 0;
            }
        }
    };
    appear() {
        this.makeVisible = true;
    };
    disappear() {
        this.makeVisible = false;
    };
}
