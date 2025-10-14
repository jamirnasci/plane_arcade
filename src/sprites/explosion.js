export class Explosion extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setScale(0.5)
        if(!scene.anims.exists('explosion_sprite')){
            this.anims.create({
                key: 'explosion_sprite',
                frames: this.anims.generateFrameNumbers(texture, {
                    start: 0,
                    end: 6
                }),
                repeat: 0,
                frameRate: 15
            })
        }
    }

    play(){
        return this.anims.play('explosion_sprite', true)
    }
}