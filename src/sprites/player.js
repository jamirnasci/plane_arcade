export class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     * @param {string} texture
    */
    constructor(scene, x, y, texture) {
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        scene.anims.create({
            key: 'player-walk',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.play('player-walk', true)

        this.setScale(0.2)
        this.setDamping(true)
        this.setDrag(0.5)
        this.setMaxVelocity(300)
        this.setCollideWorldBounds(true)
    }
    shoot() {
        const bullet = this.scene.bullets.get(this.x, this.y)
        if (bullet) {
            bullet.setActive(true)
            bullet.setVisible(true)
            bullet.body.enable = true
            bullet.setScale(0.1)
            bullet.setRotation(this.rotation)
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
}