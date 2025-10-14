import { Explosion } from "./explosion"

export class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string} explosionTexture
    */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        scene.anims.create({
            key: 'player-walk',
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.play('player-walk', true)

        this.setScale(0.2)
        this.setDamping(false)
        this.setDrag(0)
        this.setCollideWorldBounds(true)
    }
    shoot() {
        const bullet = this.scene.bullets.get(this.x, this.y)
        if (bullet) {
            this.scene.sound.play('shoot')
            bullet.setActive(true)
            bullet.setVisible(true)
            bullet.setTexture(this.bulletTexture)
            bullet.body.enable = true
            bullet.setScale(0.1)
            bullet.isPlayerBullet = true
            bullet.rotation = this.scene.player.rotation
            // Calcula a velocidade com base na rotação do player
            const speed = 1000
            this.scene.physics.velocityFromRotation(
                this.rotation + (3 * Math.PI) / 2, // ângulo do player em radianos
                speed,                // velocidade da bala
                bullet.body.velocity  // define velocity x/y da bala
            )

            bullet.body.setCollideWorldBounds(false)
            bullet.body.onWorldBounds = true
        }
    }
    deathAnimation() {
        const explosion = new Explosion(this.scene, this.x, this.y, 'explosion_sprite')
        explosion.play()
        return explosion
    }
    setExplosionTexture(texture) {
        this.explosionTexture = texture
        if (!this.scene.anims.exists('player_explosion')) {
            this.scene.anims.create({
                key: 'player_explosion',
                frames: this.scene.anims.generateFrameNumbers(this.explosionTexture, {
                    start: 0,
                    end: 6
                }),
                frameRate: 15,
                repeat: 0
            })
        }
    }
    setBulletTexture(texture) {
        this.bulletTexture = texture
    }
}