import Phaser from "phaser";
import { loadSprites } from "./sprites";
import { loadHud } from "./hud/hud";
import { Player } from "./sprites/player";
import { Bullet } from "./sprites/bullet";
import { Enemy } from "./sprites/enemy";
import { Life } from "./sprites/life";
import { Boss } from "./sprites/boss";
import { Helicopter } from "./sprites/helicopter";
import { LEVELS } from "./levels";
import { PLANES } from "./planes";
import { MenuScene } from "./scenes/menu";
import { LevelsScene } from "./scenes/levelsSelect";
import { EndGameScene } from "./scenes/endgame";
import { PlanesScene } from "./scenes/planeSelect";
import { Coin } from "./sprites/coin";
import { StageScene } from "./scenes/stageSelect";
import { initialize } from "./ads/adsInitalize";
import { banner } from "./ads/banner";
import { AdMob } from "@capacitor-community/admob";

(async ()=>{
  await initialize()
})()

export class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
    if(!localStorage.getItem('planes')){
      localStorage.setItem('planes', 0)
      localStorage.setItem('plane', 0)
    }
  }
  init(data) {
    this.level = LEVELS.list[data.level]
    this.isArcade = data.isArcade
    if(data.isArcade){
      this.enemysN = 100000
      this.arcadeMap = data.map
    }else{
      this.enemysN = this.level.enemyN
    }
  }
  preload() {
    loadSprites(this)
  }
  create() {
    let selectedPlane = localStorage.getItem('plane')
    if (!selectedPlane) {
      selectedPlane = 0
    }
    this.speed = 200
    this.shootDelay = 40
    this.lastShootTime = 0
    this.enemysKilled = 0
    this.bossKilled = 0
    this.playerDamage = 10
    this.plane = PLANES[parseInt(selectedPlane)]
    this.collectedCoins = 0

    this.cameras.main.setBackgroundColor('#65e0ffff')
    const screenWidth = this.sys.game.config.width
    const screenHeight = this.sys.game.config.height

    this.physics.world.setBounds(0, 0, 1920, 960)
    this.input.addPointer(3)
    this.sound.unlock()
    this.bg = this.add.tileSprite(0, 0, 1920, 960, this.isArcade ? this.arcadeMap : this.level.background)
    this.bg.setOrigin(0, 0)

    
    this.player = new Player(this, 300, 400, this.plane.texture)
    this.player.setMaxVelocity(this.plane.maxVelocity)
    this.player.setBulletTexture(this.plane.bulletTexture)
    this.life = this.plane.life
    
    loadHud(this, screenWidth, screenHeight)
    
    this.cameras.main.setBounds(0, 0, 1920, 960)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
  
    this.enemys = this.physics.add.group({
      classType: Enemy,
      maxSize: 100,
      defaultKey: this.level.enemy,
      collideWorldBounds: true
    })

    this.bullets = new Bullet(this)
    if (this.level.boss) {
      this.bossGroup = this.physics.add.group({
        classType: Boss,
        maxSize: this.level.bossN,
        defaultKey: this.level.boss,
        collideWorldBounds: true
      })
      this.physics.add.collider(this.bossGroup, this.bullets, this.hitEnemy, null, this)
      this.physics.add.collider(this.bossGroup, this.bossGroup)

    }

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
      delay: 1000
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

    this.coinsEvent = this.time.addEvent({
      loop: true,
      callback: this.spawnCoin,
      callbackScope: this,
      delay: 3000
    })

    this.coins = this.physics.add.group({
      classType: Coin,
      maxSize: 20,
      defaultKey: 'coin'
    })

    this.planeEngineSound = this.sound.add('plane', {
      loop: true,
      volume: 0.2
    })
    this.planeEngineSound.play()

    this.physics.add.collider(this.enemys, this.bullets, this.hitEnemy, null, this)
    this.physics.add.overlap(this.player, this.bullets, this.hitPlayer, null, this) // overlap detecta colisao, mas sem fisica
    this.physics.add.collider(this.enemys, this.player, this.playerAndEnemy, null, this)
    this.physics.add.overlap(this.player, this.lifes, this.addLife, null, this)
    this.physics.add.overlap(this.player, this.coins, this.addCoin, null, this)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.lifeHud = this.add.text(10, 10, `❤️ ${this.life}`, {
      fontSize: '30px',
      fill: '#fff',
      fontFamily: '"Jersey 10", sans-serif'
    }).setScrollFactor(0)
    this.lifeHud.setStroke('#000', 4)

    const killsHudTxt = this.isArcade ? `🗡️ ${this.enemysKilled}/--` : `🗡️ ${this.enemysKilled}/${this.enemysN}`
    this.killsHud = this.add.text(90, 10, killsHudTxt, {
      fontSize: '30px',
      fill: '#fff',
      fontFamily: '"Jersey 10", sans-serif'
    }).setScrollFactor(0)
    this.killsHud.setStroke('#000', 4)

    this.coinsHud = this.add.text(195, 10, `🪙 ${this.collectedCoins}`, {
      fontSize: '30px',
      fill: '#fff',
      fontFamily: '"Jersey 10", sans-serif'
    }).setScrollFactor(0)
    this.coinsHud.setStroke('#000', 4)
  }
  update(time, delta) {
    const rotationSpeed = 0.05

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
    if (this.level.boss) {
      this.bossGroup.children.iterate((boss) => {
        boss.updateBehavior(time)
      })
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
  spawnCoin() {
    const x = Math.floor(Math.random() * 1820)
    const y = Math.floor(Math.random() * 900)

    /** @type {Coin}*/
    const coin = this.coins.get(x, y)
    if (coin) {
      coin.body.enable = true
    }
  }
  /**
   * 
   * @param {any} player 
   * @param {Coin} coin 
   */
  addCoin(player, coin) {
    this.collectedCoins += coin.coinValue
    this.coinsHud.setText(`🪙 ${this.collectedCoins}`)
    coin.destroy()
  }
  addLife(player, life) {
    this.life += 10
    this.lifeHud.setText(`❤️ ${this.life}`)
    life.destroy()
  }
  spawnEnemys() {
    const x = Math.floor(Math.random() * 1820)
    const y = Math.floor(Math.random() * 900)

    /**
     * @type {Enemy}
     */
    const enemy = this.enemys.get(x, y)

    if (enemy) {
      enemy.setActive(true)
      enemy.setVisible(true)
      enemy.setDamage(this.level.enemyDamage)
      enemy.setLife(this.level.enemyLife)
      enemy.setSpriteTexture(this.level.enemy)
      enemy.body.enable = true
      this.physics.moveToObject(enemy, this.player, 100)
    }
  }

  /**
   * 
   * @param {Enemy | Boss} enemy 
   * @param {Bullet} bullet 
   */
  hitEnemy(enemy, bullet) {
    if (bullet.isPlayerBullet) {
      enemy.decrementLife(this.plane.damage)

      if (enemy.life <= 0) {
        enemy.body.enable = false
        enemy.setVisible(false)
        enemy.setMaxVelocity(0)
        enemy.anims.stop('enemy-walk')
        enemy.deathSound()
        const deathAnimation = enemy.deathAnimation()

        deathAnimation.on('animationcomplete', () => {
          deathAnimation.destroy()
          enemy.setActive(false)
          deathAnimation.destroy()
          enemy.destroy()
          this.enemysKilled += 1
          if (this.level.boss) {
            if (enemy.isBoss) {
              this.bossKilled += 1
              console.log(this.bossKilled)
            }
            if (this.bossKilled >= this.level.bossN) {
              this.endGame('win')
            }
            if (this.enemysKilled >= this.enemysN && this.bossGroup.active) {
              this.enemysEvent.destroy()
              this.spawnBoss()
              this.killsHud.setText('🗡️ BOSS')
            }
          }

          if ((this.enemysKilled >= this.level.enemyN && !this.isArcade) && !this.level.boss) {
            this.endGame('win')
          }

          if (!this.boss) {
            const killsHudTxtUpdate = this.isArcade ? `🗡️ ${this.enemysKilled}/--`: `🗡️ ${this.enemysKilled}/${this.enemysN}`
            this.killsHud.setText(killsHudTxtUpdate)
          }
        })
      }
    }

    bullet.destroy()
  }
  /**
   * 
   * @param {Player} player 
   * @param {Bullet} bullet 
   */
  hitPlayer(player, bullet) {
    if (this.life <= 0 && this.player.active) {
      //colocar a animacao do player morrendo
      const deathAnimation = this.player.deathAnimation()
      this.sound.play('big_explosion')
      deathAnimation.on('animationcomplete', () => {
        deathAnimation.destroy()
        this.player.setActive(false)
        this.player.setVisible(false)
        this.endGame('loss')
      })
      //enemyAnimation.on('animationcomplete', ()=>{})
    }
    if (!bullet.isPlayerBullet && this.life >= 0) {
      this.player.setTint(0xff0000)
      this.life -= bullet.bulletDamage

      this.lifeHud.setText(`❤️ ${this.life}`)
      bullet.destroy()
      this.time.delayedCall(100, () => {
        this.player.clearTint(); // Volta à cor normal
      });
    }
  }
  spawnBoss() {
    for (let i = 0; i <= this.level.bossN; i++) {
      const x = Math.floor(Math.random() * 1820)
      const y = Math.floor(Math.random() * 900)
      /** @type {Boss} */
      const boss = this.bossGroup.get(x, y)
      if (boss) {
        boss.setVisible(true)
        boss.setActive(true)
        boss.setDamage(10)
        boss.setLife(this.level.bossLife)
        boss.setBulletTexture(this.level.bossBullet)
        boss.setSpriteTexture(this.level.boss)
        boss.body.enable = true
        this.physics.moveToObject(boss, this.player, 100)
      }
    }
    this.bossGroup.setActive(false)
  }
  playerAndEnemy() {
    this.life -= 1
    this.player.setTint(0xff0000)
    this.time.delayedCall(100, () => {
      this.player.clearTint(); // Volta à cor normal
    });
  }
  endGame(result) {
    AdMob.removeBanner()
    this.planeEngineSound.stop()
    this.player.setVelocity(0)
    this.player.setActive(false)
    this.scene.stop('MainScene')
    this.scene.start('EndGameScene', {
      result: result,
      coins: this.collectedCoins,
      kills: this.enemysKilled,
      level: LEVELS.list.indexOf(this.level),
      isArcade: this.isArcade,
      map: this.arcadeMap
    })

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
  scene: [MenuScene, PlanesScene, LevelsScene, EndGameScene, MainScene, StageScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
})