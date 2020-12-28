import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadBackgroundSprites() {
    return loadImage('img/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 10, 7);
        return sprites;
    });
}

export function loadMarioSprite() {
    return loadImage('img/sprites.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 0, 4 * 16 + 24, 16, 16);
        return sprites;
    });
}
