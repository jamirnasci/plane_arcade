export class BossExplosion extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {number} rotation 
     */
    constructor(scene, x, y, texture, rotation){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.rotation = rotation
        this.setScale(0.8)
        if(!this.scene.anims.exists('boss1_explosion')){
            this.scene.anims.create({
                key: 'boss1_explosion',
                frames: this.scene.anims.generateFrameNumbers(
                    texture,
                    {start: 0, end: 6}
                ),
                repeat: 0,
                frameRate: 10,

            })
        }
    }
    play(){
        this.anims.play('boss1_explosion', true)
    }
}