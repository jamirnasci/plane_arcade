export class Bullet extends Phaser.Physics.Arcade.Group{
   /**
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     * @param {string} texture
    */
    constructor(scene, x, y){
        super(scene.physics.world, scene, {
            maxSize: 500,
            classType: Phaser.Physics.Arcade.Image,
            defaultKey: 'bullet'
        })
    }
}