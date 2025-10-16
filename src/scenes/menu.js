import { PLANES } from "../planes"
import { loadSprites } from "../sprites"

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' })
    }
    preload() {
        loadSprites(this)
        this.load.image('play_btn', 'assets/img/menu/play_btn.png')
        this.load.image('planes_btn', 'assets/img/menu/planes_btn.png')
        this.load.image('arcade_btn', 'assets/img/menu/arcade_btn.png')
        this.load.image('back_btn', 'assets/img/menu/back_btn.png')
        this.load.image('menu_btn', 'assets/img/menu/menu_btn.png')
        this.load.image('exit_btn', 'assets/img/menu/exit_btn.png')
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
    }
    create() {
        this.bg = this.add.tileSprite(0, 0, 1536, 1024, 'bg')
        this.bg.setOrigin(0, 0)

        const storageCoins = localStorage.getItem('coins') == null ? 0 : parseInt(localStorage.getItem('coins'))

        this.menuCoins = this.add.text(10, 10, `🪙 ${storageCoins}`, {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: '"Jersey 10", sans-serif'
        }).setScrollFactor(0)
        this.menuCoins.setStroke('#000', 4)

        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        const btnScale = 0.3

        this.gameTitle = this.add.text(screenWidth / 2, 50, 'PLANE ARCADE', {
            fontSize: '60px',
            fill: '#33ff00ff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.gameTitle.x = this.gameTitle.x - (this.gameTitle.width / 2)
        this.gameTitle.setStroke('#000', 4)

        const selectedPlane = localStorage.getItem('plane') == null ? 0 : parseInt(localStorage.getItem('plane'))

        this.plane = this.physics.add.sprite(screenWidth / 2, 170, PLANES[selectedPlane].texture)
        this.plane.setScale(0.4)
        if (!this.anims.exists('player-walk')) {
            this.anims.create({
                key: 'player-walk',
                frames: this.anims.generateFrameNumbers(PLANES[selectedPlane].texture, { start: 0, end: 3 }),
                frameRate: 20,
                repeat: -1
            })
        }
        this.plane.anims.play('player-walk', true)

        this.planeName = this.add.text(screenWidth / 2, 220, PLANES[selectedPlane].texture.toUpperCase(), {
            fontSize: '30px',
            fill: '#000',
            fontFamily: '"Jersey 10", sans-serif',
            letterSpacing: 3
        })
        this.planeName.setStroke('#fff', 4)
        this.planeName.x = this.planeName.x - (this.planeName.width / 2)

        this.playBtn = this.add.image(screenWidth / 2, this.planeName.y + 100, 'play_btn')
        this.playBtn.setInteractive()
        this.playBtn.setScale(btnScale)
        this.playBtn.on('pointerdown', () => {
            this.scene.start('LevelsScene')
        })

        this.planesBtn = this.add.image(screenWidth / 2, this.planeName.y + 160, 'planes_btn')
        this.planesBtn.setInteractive()
        this.planesBtn.setScale(btnScale)
        this.planesBtn.on('pointerdown', () => {
            this.scene.start('PlanesScene')
        })

        this.arcadeBtn = this.add.image(screenWidth / 2, this.planeName.y + 220, 'arcade_btn')
        this.arcadeBtn.setInteractive()
        this.arcadeBtn.setScale(btnScale)
        this.arcadeBtn.on('pointerdown', () => {

        })
        this.exitBtn = this.add.image(screenWidth / 2, this.planeName.y + 280, 'exit_btn')
        this.exitBtn.setInteractive()
        this.exitBtn.setScale(btnScale)
        this.exitBtn.on('pointerdown', () => {

        })
    }
    update() {

    }
}