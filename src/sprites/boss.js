import { Bullet } from "./bullet"

export class Boss extends Phaser.Physics.Arcade.Sprite{
    /**
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
        this.setVisible(true)
        this.setScale(0.5)
        this.setCollideWorldBounds(true)
        this.shootDelay = 50
        this.lastShootTime = 0

        if(!scene.anims.exists('boss-walk')){
            scene.anims.create({
                key: 'boss-walk',
                frames: scene.anims.generateFrameNumbers(texture, {start: 0, end: 3}),
                repeat: -1,
                frameRate: 20
            })
        }
        this.anims.play('boss-walk', true)
    }
    shoot(){
        /** @type {Bullet} */
        const bullet = this.scene.bullets.get(this.x, this.y)
        if(bullet){
            bullet.setActive(true)
            bullet.setVisible(true)
            bullet.setScale(0.1)
            bullet.setTexture('bullet2')
            bullet.setRotation(this.rotation)
            this.scene.physics.velocityFromRotation(
                this.rotation + (3 * Math.PI) / 2, 
                500,
                bullet.body.velocity
            )
            bullet.body.onWorldBounds = true
        }
    }
    updateBehavior(time){
        const angle = Phaser.Math.Angle.Between(this.scene.player.x, this.scene.player.y, this.x, this.y)

        this.setRotation(angle + (3 * Math.PI) / 2)

        const distanceOfPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y)
        console.log(distanceOfPlayer)
        if((this.shootDelay < (time - this.lastShootTime)) && distanceOfPlayer < 300){
            this.shoot()
            this.lastShootTime = time
        }
    }
}