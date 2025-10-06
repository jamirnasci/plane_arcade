import Phaser from "phaser";
import { loadSprites } from "./sprites";
import { loadHud } from "./hud/hud";
import { Player } from "./sprites/player";
import { Bullet } from "./sprites/bullet";
import { Enemy } from "./sprites/enemy";
import { EnemyExplosion } from "./sprites/enemyExplosion";
import { Life } from "./sprites/life";
import { Boss } from "./sprites/boss";

class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
    this.player = null
    this.speed = 200
    this.shootDelay = 40
    this.lastShootTime = 0
    this.life = 100
    this.enemysN = 2
    this.enemysKilled = 0
  }
  preload() {
    loadSprites(this)
  }
  create() {
    this.cameras.main.setBackgroundColor('#65e0ffff')
    const screenWidth = this.sys.game.config.width
    const screenHeight = this.sys.game.config.height

    this.physics.world.setBounds(0, 0, 1920, 960)
    this.input.addPointer(3)
    this.sound.unlock()
    this.bg = this.add.tileSprite(0, 0, 1920, 960, 'bg')
    this.bg.setOrigin(0, 0)

    loadHud(this, screenWidth, screenHeight)
    this.player = new Player(this, 300, 400, 'player')
    this.cameras.main.setBounds(0, 0, 1920, 960)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
    //this.cameras.main.setZoom(1.2)
    this.enemys = this.physics.add.group({
      classType: Enemy,
      maxSize: this.enemysN,
      defaultKey: 'enemy',
    })
    this.bullets = new Bullet(this)

    this.physics.world.on('worldbounds', (body) => {
      // Verifica se o objeto do corpo pertence ao seu grupo de balas
      if (body.gameObject.parentContainer === this.bullets || body.gameObject.group === this.bullets) {
        body.gameObject.setActive(false).setVisible(false);
      }
    }, this);

    this.enemysEvent = this.time.addEvent({
      loop: true,
      callback: this.spawnEnemys,
      callbackScope: this,
      delay: 5000
    })

    this.time.addEvent({
      loop: true,
      callbackScope: this,
      callback: this.spawnLife,
      delay: 10000
    })

    this.lifes = this.physics.add.group({
      classType: Life,
      maxSize: 10,
      defaultKey: 'life'
    })

    this.planeEngineSound = this.sound.add('plane', {
      loop: true,
      volume: 0.2
    })
    this.planeEngineSound.play()

    this.physics.add.collider(this.enemys, this.bullets, this.hitEnemy, null, this)
    this.physics.add.overlap(this.player, this.bullets, this.hitPlayer, null, this) // overlap detecta colisao, mas sem fisica
    this.physics.add.collider(this.enemys, this.player, this.endGame, null, this)
    this.physics.add.overlap(this.player, this.lifes, this.addLife, null, this)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.lifeHud = this.add.text(120, 60, `❤️ ${this.life}`, { fontSize: '20px', fill: '#000', fontFamily: 'arial' })
      .setScrollFactor(0)
    this.killsHud = this.add.text(190, 60, `🗡️ ${this.enemysKilled}`, { fontSize: '20px', fill: '#000', fontFamily: 'arial' })
      .setScrollFactor(0)
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
    /*controles*/
    if (this.leftPressed || this.cursors.left.isDown) {
      this.player.rotation -= rotationSpeed
    }
    else if (this.rightPressed || this.cursors.right.isDown) {
      this.player.rotation += rotationSpeed
    }
    if (this.upPressed || this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.player.rotation - 1.5,
        1000,
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
    //remove as balas que saem do mapa
    this.bullets.children.iterate((bullet) => {
      if (bullet && bullet.body.y <= 0 || bullet.body.x > 6000) {
        bullet.setActive(false)
        bullet.setVisible(false)
      }
    })
    this.enemys.children.iterate((enemy) => {
      enemy.updateBehavior(time)
    })
    if (this.boss && this.boss.active) {
      this.boss.updateBehavior(time)
    }
  }
  spawnLife() {
    const x = Math.floor(Math.random() * 1820)
    const y = Math.floor(Math.random() * 900)

    const life = this.lifes.get(x, y)
    if (life) {
      life.body.enable = true
    }
  }
  addLife(player, life) {
    if ((this.life + 10) <= 100) {
      this.life += 10
      this.lifeHud.setText(`❤️ ${this.life}`)
    } else if ((100 - this.life) <= 10) {
      this.life = 100
      this.lifeHud.setText(`❤️ ${this.life}`)
    }
    life.destroy()
  }
  spawnEnemys() {
    const x = Math.floor(Math.random() * 1820)
    const y = Math.floor(Math.random() * 900)

    const enemy = this.enemys.get(x, y)

    if (enemy) {
      enemy.setActive(true)
      enemy.setVisible(true)
      enemy.body.enable = true
      this.physics.moveToObject(enemy, this.player, 100)
    }
  }

  /**
   * 
   * @param {Enemy} enemy 
   * @param {Bullet} bullet 
   */
  hitEnemy(enemy, bullet) {
    if (bullet.isPlayerBullet) {
      enemy.decrementLife(1)
      
      if (enemy.life <= 0) {
        enemy.body.enable = false
        enemy.setVisible(false)
        enemy.setMaxVelocity(0)
        enemy.anims.stop('enemy-walk')
        this.sound.play('explosion')
        const deathAnimation = enemy.deathAnimation()

        deathAnimation.on('animationcomplete', () => {
          deathAnimation.destroy()
          enemy.setActive(false)
          enemy.destroy()
          this.enemysKilled += 1
          this.killsHud.setText(`🗡️ ${this.enemysKilled}`)
          if (this.enemysKilled > this.enemysN && this.boss == undefined) {
            this.enemysEvent.destroy()
            this.spawnBoss()
            this.endGame()
          }
        })
      }      
    }

    bullet.destroy()
  }
  hitPlayer(player, bullet) {
    if (!bullet.isPlayerBullet) {
      this.player.setTint(0xff0000)
      this.life -= 5
      this.lifeHud.setText(`❤️ ${this.life}`)
      bullet.destroy()
      this.time.delayedCall(100, () => {
        this.player.clearTint(); // Volta à cor normal
      });
    }
  }
  spawnBoss() {
    this.boss = new Boss(this, 900, 500, 'boss1')
    this.physics.add.collider(this.bullets, this.boss, this.hitEnemy, null, this)
    //this.physics.moveToObject(this.boss, this.player, 100)
  }
  endGame() {
    /*
    this.scene.pause()
    const res = confirm('fim de jogo, deseja reiniciar ?')
    if (res) {
      this.enemysKilled = 0
      this.life = 100
      this.scene.restart()
    }*/
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
    }
  }
})