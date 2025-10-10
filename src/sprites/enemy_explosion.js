export class EnemyExplosion extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {number} rotation
     */
    constructor(scene, x, y, texture, rotation) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.rotation = rotation
        this.setScale(0.2)
        this.rotation = rotation

        if (!scene.anims.exists('bf109_explosion')) {
            scene.anims.create({
                key: 'bf109_explosion',
                frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 6 }),
                frameRate: 15,
                repeat: 0
            })
        }
    }
    play(){
        this.anims.play('bf109_explosion', true)
    }
}