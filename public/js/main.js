import {loadLevel} from './loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 10; i++) {
            sprite.draw('idle', context, pos.x + ( i * 16 ), pos.y);
        }
    }
}

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite()
])
.then(([backgroundSprites, level, marioSprite]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const pos = {
        x: 32,
        y: 32
    }

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);

        pos.x += 2;
        pos.y += 2;

        requestAnimationFrame(update);
    }

    update();
});
