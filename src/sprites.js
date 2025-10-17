/** *
  * @param {Phaser.Scene} scene  */
export const loadSprites = (scene) => {
    //players
    scene.load.spritesheet('hawker', 'assets/img/players/hawker.png', {frameWidth: 256, frameHeight: 256})
    scene.load.spritesheet('p40', 'assets/img/players/p40.png', {frameWidth: 256,frameHeight: 256})
    scene.load.spritesheet('helicopter', 'assets/img/players/helicopter.png', {frameWidth: 256,frameHeight: 256})
    scene.load.spritesheet('hellcat', 'assets/img/players/hellcat.png', {frameWidth: 330,frameHeight: 256})
    scene.load.spritesheet('yak3', 'assets/img/players/yak3.png', {frameWidth: 256,frameHeight: 256})
    //enemys
    scene.load.spritesheet('bf109', 'assets/img/enemys/bf109.png', {frameWidth: 256,frameHeight: 256})
    scene.load.spritesheet('helicopter_enemy', 'assets/img/enemys/helicopter_enemy.png', {frameWidth: 256,frameHeight: 256})
    scene.load.spritesheet('fw190', 'assets/img/enemys/fw190.png', {frameWidth: 265,frameHeight: 256})
    scene.load.spritesheet('a6m', 'assets/img/enemys/a6m.png', {frameWidth: 256,frameHeight: 256})
    //boss
    scene.load.spritesheet('boss1', 'assets/img/enemys/boss1.png', {frameHeight: 256,frameWidth: 453})
    scene.load.spritesheet('boss1_explosion', 'assets/img/enemys/boss1_explosion.png', {frameHeight: 256,frameWidth: 453})
    scene.load.spritesheet('helicopter_enemy', 'assets/img/enemys/helicopter_enemy.png', {frameHeight: 256,frameWidth: 256})
    scene.load.spritesheet('a20b', 'assets/img/enemys/a20b.png', {frameHeight: 256,frameWidth: 327})
    //maps
    scene.load.image('ukranie', 'assets/img/levels/ukranie.png')
    scene.load.image('libia', 'assets/img/levels/libia.png')
    scene.load.image('japan', 'assets/img/levels/japan.jpg')
    //hud
    scene.load.image('right_arrow', 'assets/img/hud/right_arrow.png')
    scene.load.image('down_arrow', 'assets/img/hud/down_arrow.png')
    scene.load.image('left_arrow', 'assets/img/hud/left_arrow.png')
    scene.load.image('up_arrow', 'assets/img/hud/up_arrow.png')
    scene.load.image('fire_btn', 'assets/img/hud/fire_btn.png')
    //objects
    scene.load.image('bullet', 'assets/img/objects/bullet.png')
    scene.load.image('bullet2', 'assets/img/objects/bullet2.png')
    scene.load.image('bullet3', 'assets/img/objects/bullet3.png')
    scene.load.image('bullet4', 'assets/img/objects/bullet4.png')
    scene.load.image('coin', 'assets/img/objects/coin.png')
    scene.load.image('coin_10', 'assets/img/objects/coin_10.png')
    scene.load.image('coin_25', 'assets/img/objects/coin_25.png')
    scene.load.image('coin_50', 'assets/img/objects/coin_50.png')
    scene.load.image('life', 'assets/img/objects/life.png')
    scene.load.spritesheet('explosion_sprite', 'assets/img/objects/explosion_t.png', {frameWidth: 256, frameHeight: 256})
    //audio
    scene.load.audio('shoot', 'assets/audio/shoot.mp3')
    scene.load.audio('explosion', 'assets/audio/explosion.mp3')
    scene.load.audio('big_explosion', 'assets/audio/big_explosion.mp3')
    scene.load.audio('plane', 'assets/audio/plane-engine.mp3')
}