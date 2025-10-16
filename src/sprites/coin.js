export class Coin extends Phaser.Physics.Arcade.Sprite{
    
    values = [10, 25, 50]
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
        this.setActive(true)
        this.setScale(0.2)
        this.setVisible(true)
        this.coinValue = this.values[Math.floor(Math.random() * this.values.length)]
        this.setTexture(`coin_${this.coinValue}`)
    }
}