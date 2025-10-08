import { Boss1Explosion } from "./boss1_explosion"
import { Bullet } from "./bullet"

export class Boss extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setActive(true)
        this.setVisible(true)
        this.setScale(0.8)       
        this.shootDelay = 50
        this.lastShootTime = 0       
        this.isBoss = true 
        this.setDrag(0.1)
        if (!scene.anims.exists('boss-walk')) {
            scene.anims.create({
                key: 'boss-walk',
                frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
                repeat: -1,
                frameRate: 20
            })
        }
        this.anims.play('boss-walk', true)
    }
    /**
 * 
 * @param {number} bulletDamage 
 */
    setDamage(bulletDamage = 1) {
        this.bulletDamage = bulletDamage
    }
    /**
     * 
     * @param {number} life 
     */
    setLife(life){
        this.life = life
    }
    shoot() {
        /** @type {Bullet} */
        const bullet = this.scene.bullets.get(this.x, this.y)
        if (bullet) {
            bullet.setActive(true)
            bullet.setVisible(true)
            bullet.body.enable = true
            bullet.setScale(0.1)
            bullet.setTexture('bullet2')
            bullet.setRotation(this.rotation)
            bullet.bulletDamage = this.bulletDamage
            bullet.isPlayerBullet = false

            this.scene.physics.velocityFromRotation(
                this.rotation + (3 * Math.PI) / 2,
                500,
                bullet.body.velocity
            )
            bullet.body.setCollideWorldBounds(false)
            bullet.body.onWorldBounds = true
        }
    }
    updateBehavior(time) {
        const angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, this.scene.player.x, this.scene.player.y)

        this.rotation = angle + Math.PI / 2
        this.setMaxVelocity(100)
        this.scene.physics.velocityFromRotation(
            angle,
            100,
            this.body.acceleration
        )
        const distanceOfPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y)
        
        if ((this.shootDelay < (time - this.lastShootTime)) && distanceOfPlayer < 300) {
            this.shoot()
            this.lastShootTime = time
        }
    }
    decrementLife(n) {
        this.setTint(0xff0000)
        this.life -= n
        this.scene.time.delayedCall(100,
            () => {
                this.clearTint()
            }
        )
    }
    deathAnimation() {
        const explosion = new Boss1Explosion(this.scene, this.x, this.y, 'boss1_explosion', this.rotation)
        explosion.play()
        return explosion
    }
    deathSound() {
        this.scene.sound.play('big_explosion')
    }
}