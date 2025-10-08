/**
 * 
 * @param {Phaser.Scene} context 
 */
export const loadSprites = (context) => {
    context.load.spritesheet('player', 'assets/img/players/player.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('enemy', 'assets/img/enemys/enemy.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('enemy_explosion', 'assets/img/enemys/enemy_explosion.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('boss1', 'assets/img/enemys/boss1.png', {
        frameHeight: 256,
        frameWidth: 453
    })
    context.load.spritesheet('boss1_explosion', 'assets/img/enemys/boss1_explosion.png', {
        frameHeight: 256,
        frameWidth: 453
    })
    context.load.spritesheet('helicopter', 'assets/img/enemys/helicopter.png', {
        frameHeight: 256,
        frameWidth: 256
    })
    context.load.spritesheet('a20b', 'assets/img/enemys/a20b.png', {
        frameHeight: 256,
        frameWidth: 327
    })
    context.load.image('unkranie', 'assets/img/levels/ukranie.png')
    context.load.image('libia', 'assets/img/levels/libia.png')
    context.load.image('japan', 'assets/img/levels/japan.jpg')
    context.load.image('bullet', 'assets/img/objects/bullet.png')
    context.load.image('bullet2', 'assets/img/objects/bullet2.png')
    context.load.image('bullet3', 'assets/img/objects/bullet3.png')
    context.load.image('right_arrow', 'assets/img/hud/right_arrow.png')
    context.load.image('down_arrow', 'assets/img/hud/down_arrow.png')
    context.load.image('left_arrow', 'assets/img/hud/left_arrow.png')
    context.load.image('up_arrow', 'assets/img/hud/up_arrow.png')
    context.load.image('fire_btn', 'assets/img/hud/fire_btn.png')
    context.load.image('life', 'assets/img/objects/life.png')
    context.load.audio('shoot', 'assets/audio/shoot.mp3')
    context.load.audio('explosion', 'assets/audio/explosion.mp3')
    context.load.audio('big_explosion', 'assets/audio/big_explosion.mp3')
    context.load.audio('plane', 'assets/audio/plane-engine.mp3')
}