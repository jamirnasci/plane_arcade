import { LEVELS } from "../levels"
import { PLANES } from "../planes"
import { loadSprites } from "../sprites"
import { Player } from "../sprites/player"

export class PlanesScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlanesScene' })
    }

    preload() {
        loadSprites(this)
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
        this.load.image('select_btn', 'assets/img/menu/select_btn.png')
    }

    create() {
        const screenHeight = window.innerHeight
        const screenWidth = window.innerWidth

        // Fundo
        this.bg = this.add.tileSprite(0, 0, screenWidth, screenHeight, 'bg').setOrigin(0)

        // Fundo da caixa
        const boxWidth = 400
        const boxHeight = 300
        const background = this.add.rectangle(0, 0, boxWidth, boxHeight, 0x000000, 0.7).setOrigin(0.5)

        // Container centralizado
        this.container = this.add.container(screenWidth / 2, screenHeight / 2)
        this.container.add(background)

        this.levelTitle = this.add.text(screenWidth / 2, this.container.y - 220, 'PLANES', {
            fontSize: '60px',
            fill: '#33ff00ff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.levelTitle.x -= this.levelTitle.width / 2
        this.levelTitle.setStroke('#000', 4)

        let planeIndex = 0

        this.plane = new Player(this, 0, -10, PLANES[0].texture)
        this.plane.setScale(0.5)
        this.container.add(this.plane)

        this.planeName = this.add.text(0, -100, PLANES[0].texture)
        this.planeName.setOrigin(0.5)
        this.container.add(this.planeName)

        this.selectBtn = this.add.image(0, 70, 'select_btn')
        this.selectBtn.setScale(0.2)
        this.selectBtn.setInteractive()
        this.selectBtn.on('pointerdown', ()=>{
            localStorage.setItem('plane', planeIndex)
            this.scene.start('MenuScene')
        })
        this.container.add(this.selectBtn)

        this.stageTitle = this.add.text(0, -100, '', {
            fontSize: '40px',
            fill: '#ffffffff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.container.add(this.stageTitle)

        this.nextPage = this.add.text(15, 0, '>')
        this.nextPage.setInteractive()
        this.nextPage.on('pointerdown', () => {
            if (planeIndex < PLANES.length - 1) {
                planeIndex++
            }
            this.anims.remove('player-walk')
            this.plane.destroy()
            this.plane = new Player(this, 0, -10, PLANES[planeIndex].texture)
            this.plane.setScale(0.5)
            this.planeName.setText(PLANES[planeIndex].texture)
            this.container.add(this.plane)
        })
        this.previousPage = this.add.text(-15, 0, '<')
        this.previousPage.setInteractive()
        this.previousPage.on('pointerdown', () => {
            if (planeIndex > 0) {
                planeIndex--
            }
            this.anims.remove('player-walk')
            this.plane.destroy()
            this.plane = new Player(this, 0, -10, PLANES[planeIndex].texture)
            this.plane.setScale(0.5)
            this.planeName.setText(PLANES[planeIndex].texture)
            this.container.add(this.plane)
        })
        this.pageSwitchContainer = this.add.container(0, this.container.height + 100)
        this.pageSwitchContainer.add(this.previousPage)
        this.pageSwitchContainer.add(this.nextPage)

        this.container.add(this.pageSwitchContainer)
    }
}
