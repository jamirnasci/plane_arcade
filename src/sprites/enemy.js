import { EnemyExplosion } from "./enemy_explosion"

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.lastShootTime = 0
        this.shootDelay = 500
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setScale(0.2)

        if (!scene.anims.exists('enemy-walk')) {

            scene.anims.create({
                key: 'enemy-walk',
                frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
                frameRate: 20,
                repeat: -1
            })
        }
        this.anims.play('enemy-walk', true)
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
     * @param {Phaser.GameObjects.GameObject} enemy 
     * @param {number} bulletDamage
     */
    shootEnemy() {
        const bullet = this.scene.bullets.get(this.x, this.y)
        if (bullet) {
            bullet.setActive(true)
            bullet.setVisible(true)
            bullet.body.enable = true
            bullet.setScale(0.1)
            bullet.setRotation(this.scene.player.rotation)
            bullet.isPlayerBullet = false
            bullet.bulletDamage = this.bulletDamage
            // Calcula a velocidade com base na rotação do player
            const angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
            const speed = 1000
            this.scene.physics.velocityFromRotation(
                angle, // ângulo do player em radianos
                speed,                // velocidade da bala
                bullet.body.velocity  // define velocity x/y da bala
            )

            bullet.body.setCollideWorldBounds(false)
            bullet.body.onWorldBounds = true

        }
    }
    /**
     * 
     * @param {number} time 
     */
    updateBehavior(time) {
        if (this.active) {
            const angle = Phaser.Math.Angle.Between(
                this.body.x,
                this.body.y,
                this.scene.player.x,
                this.scene.player.y
            );

            this.rotation = angle + Math.PI / 2; // +π/2 se o sprite do inimigo "aponta pra cima"

            // move o inimigo nessa direção
            const speed = 100;
            this.setMaxVelocity(100)
            this.scene.physics.velocityFromRotation(angle, speed, this.body.acceleration);

            if (Math.abs(this.body.x - this.scene.player.x) <= 50 || Math.abs(this.body.y - this.scene.player.y) <= 50) {
                if (time > this.lastShootTime + this.shootDelay) {
                    this.shootEnemy()
                    this.lastShootTime = time
                }
            }
        }
        if (this && this.body.y <= 0 || this.body.x > 1920) {
            this.setActive(false)
            this.setVisible(false)
        }
    }
    setLife(life) {
        this.life = life
    }
    /**
     * 
     * @param {number} n 
     */
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
    deathSound() {
        this.scene.sound.play('explosion')
    }
}