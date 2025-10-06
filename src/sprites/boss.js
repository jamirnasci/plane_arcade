import { Bullet } from "./bullet"
import { EnemyExplosion } from "./enemyExplosion"

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
        this.setScale(0.5)
        this.setCollideWorldBounds(true)
        this.shootDelay = 50
        this.lastShootTime = 0
        this.life = 100
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
    shoot() {
        /** @type {Bullet} */
        const bullet = this.scene.bullets.get(this.x, this.y)
        if (bullet) {
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
    updateBehavior(time) {
        const angle = Phaser.Math.Angle.Between(this.scene.player.x, this.scene.player.y, this.x, this.y)

        const frontAngle = angle + 3 * Math.PI / 2
        this.setRotation(frontAngle)

        this.scene.physics.velocityFromRotation(
            frontAngle,
            100,
            this.body.velocity
        )
        const distanceOfPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y)
        console.log(distanceOfPlayer)
        if ((this.shootDelay < (time - this.lastShootTime)) && distanceOfPlayer < 500) {
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
        const explosion = new EnemyExplosion(this.scene, this.x, this.y, 'enemy_explosion', this.rotation)
        explosion.play()
        return explosion
    }
}