/**
 * 
 * @param {Phaser.Scene} context 
 */
export const loadSprites = (context) => {
    context.load.spritesheet('player', 'assets/img/player.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('enemy', 'assets/img/enemy.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('enemy_explosion', 'assets/img/enemy_explosion.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    context.load.spritesheet('boss1', 'assets/img/boss1.png', {
        frameHeight: 256,
        frameWidth: 453
    })
    context.load.image('bg', 'assets/img/bg.png')
    context.load.image('bullet', 'assets/img/bullet.png')
    context.load.image('bullet2', 'assets/img/bullet2.png')
    context.load.image('right_arrow', 'assets/img/right_arrow.png')
    context.load.image('down_arrow', 'assets/img/down_arrow.png')
    context.load.image('left_arrow', 'assets/img/left_arrow.png')
    context.load.image('up_arrow', 'assets/img/up_arrow.png')
    context.load.image('fire_btn', 'assets/img/fire_btn.png')
    context.load.image('life', 'assets/img/life.png')
    context.load.audio('shoot', 'assets/audio/shoot.mp3')
    context.load.audio('explosion', 'assets/audio/explosion.mp3')
    context.load.audio('plane', 'assets/audio/plane-engine.mp3')
}