import Phaser from "phaser";
import { loadSprites } from "./sprites";
import { loadHud } from "./hud/hud";
import { Player } from "./sprites/player";
import { Bullet } from "./sprites/bullet";
import { Enemy } from "./sprites/enemy";
import { EnemyExplosion } from "./sprites/enemyExplosion";

class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
    this.player = null
    this.speed = 200
    this.shootDelay = 80
    this.lastShootTime = 0
    this.life = 100
  }
  preload() {
    loadSprites(this)
  }
  create() {
    this.cameras.main.setBackgroundColor('#65e0ffff')
    const screenWidth = this.sys.game.config.width
    const screenHeight = this.sys.game.config.height

    this.physics.world.setBounds(0, 0, 6000, 4000)
    this.input.addPointer(3)
    this.sound.unlock()
    this.bg = this.add.tileSprite(0, 0, 6000, 4000, 'bg')
    this.bg.setOrigin(0, 0)

    loadHud(this, screenWidth, screenHeight)
    this.player = new Player(this, 300, 400, 'player2')
    this.cameras.main.setBounds(0, 0, 6000, 4000)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)

    this.enemys = this.physics.add.group({
      classType: Enemy,
      maxSize: 50,
      defaultKey: 'enemy',
    })
    this.bullets = new Bullet(this)

    this.physics.world.on('worldbounds', (body) => {
      // Verifica se o objeto do corpo pertence ao seu grupo de balas
      if (body.gameObject.parentContainer === this.bullets || body.gameObject.group === this.bullets) {
        body.gameObject.setActive(false).setVisible(false);
      }
    }, this);

    this.time.addEvent({
      loop: true,
      callback: this.spawnEnemys,
      callbackScope: this,
      delay: 1000
    })

    this.planeEngineSound = this.sound.add('plane', {
      loop: true,
      volume: 0.5
    })
    this.planeEngineSound.play()

    this.physics.add.collider(this.enemys, this.bullets, this.hitEnemy, null, this)
    this.physics.add.overlap(this.player, this.bullets, this.hitPlayer, null, this) // overlap detecta colisao, mas sem fisica
    this.physics.add.collider(this.enemys, this.player, this.endGame, null, this)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.lifeHud = this.add.text(10, 10, `Life ${this.life}`, { fontSize: '24px', fill: '#000' }).setScrollFactor(0)
  }
  update(time, delta) {
    const rotationSpeed = 0.05

    if (this.player.body.velocity.x > 0 || this.player.body.velocity.y > 0) {
      this.physics.velocityFromRotation(
        (Math.PI) / 4,
        100,
        this.player.body.acceleration
      )
    }

    if (this.leftPressed || this.cursors.left.isDown) {
      this.player.rotation -= rotationSpeed
    }
    else if (this.rightPressed || this.cursors.right.isDown) {
      this.player.rotation += rotationSpeed
    }
    if (this.upPressed || this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.player.rotation - 1.5,
        500,
        this.player.body.acceleration
      )
    }
    if (this.downPressed || this.cursors.down.isDown) {
      this.physics.velocityFromRotation(
        Math.PI / 2,
        300,
        this.player.body.acceleration
      )
    }
    if ((this.firePressed || this.spaceKey.isDown) && time > this.lastShootTime + this.shootDelay) {
      this.player.shoot()
      this.lastShootTime = time
    }

    this.bullets.children.iterate((bullet) => {
      if (bullet && bullet.body.y <= 0 || bullet.body.x > 6000) {
        bullet.setActive(false)
        bullet.setVisible(false)
      }
    })
    this.enemys.children.iterate((enemy) => {
      enemy.updateBehavior(time)
    })
  }

  spawnEnemys() {
    const x = Math.floor(Math.random() * 5500)
    const y = Math.floor(Math.random() * 3500)

    const enemy = this.enemys.get(x, y)

    if (enemy) {
      enemy.setActive(true)
      enemy.setVisible(true)
      enemy.setScale(0.2)
      enemy.body.enable = true
      this.physics.moveToObject(enemy, this.player, 300)
    }
  }

  hitEnemy(enemy, bullet) {
    if (bullet.isPlayerBullet) {
      enemy.anims.stop('enemy-walk')

      this.sound.play('explosion')
      const explosion = new EnemyExplosion(this, enemy.x, enemy.y, 'enemy_explosion', enemy.rotation)
      explosion.play()

      explosion.on('animationcomplete', () => {
        explosion.destroy()
      })
      enemy.destroy()
    }
    bullet.destroy()
  }
  hitPlayer(player, bullet) {
    if(!bullet.isPlayerBullet){
      this.life -= 10
      this.lifeHud.setText(`Life: ${this.life}`)
      bullet.destroy()
    }
  }
  endGame() {
    //this.scene.restart()
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    },

  }
})