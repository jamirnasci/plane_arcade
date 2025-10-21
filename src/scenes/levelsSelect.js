import { LEVELS } from "../levels"

export class LevelsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelsScene' })
    }

    preload() {
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
        this.load.image('back_btn', 'assets/img/menu/back_btn.png')
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
        background.setRounded(20)

        // Container centralizado
        this.container = this.add.container(screenWidth / 2, screenHeight / 2)
        this.container.add(background)

        this.backBtn = this.add.image(
            -(this.container.getBounds().width / 2) + 40, 
            -(this.container.getBounds().height / 2) + 40, 
            'back_btn'
        )
        this.backBtn.setScale(0.2)       
        this.backBtn.setInteractive() 
        this.backBtn.on('pointerdown', ()=>{
            this.scene.start('MenuScene')
        })
        this.container.add(this.backBtn)

        this.levelTitle = this.add.text(screenWidth / 2, this.container.y - 220, 'LEVELS', {
            fontSize: '60px',
            fill: '#33ff00ff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.levelTitle.x -= this.levelTitle.width / 2
        this.levelTitle.setStroke('#000', 4)

        this.levelsContainer = this.add.container(0, 0)
        this.container.add(this.levelsContainer)

        this.pages = []

        let pageAux = []
        for (let i = 0; i <= LEVELS.list.length; i++) {
            if (i % 10 == 0 && i != 0) {
                this.pages.push(pageAux)
                pageAux = []
            }
            pageAux.push(i)
        }
        let pageIndex = 0

        this.stageTitle = this.add.text(0, -100, '', {
            fontSize: '40px',
            fill: '#ffffffff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.container.add(this.stageTitle)

        this.fillLevelList(pageIndex)

        this.nextPage = this.add.text(5, 0, '>', {
            backgroundColor: '#33ff00ff',
            color: '#000',
            padding: 5,
            fixedWidth: 50,
            fontFamily: '"Jersey 10", sans-serif',
            align: 'center'
        })
        this.nextPage.setInteractive()
        this.nextPage.on('pointerdown', () => {
            this.levelsContainer.removeAll(true)
            if (pageIndex < this.pages.length - 1) {
                pageIndex++
            }
            this.fillLevelList(pageIndex)
        })
        this.previousPage = this.add.text(-55, 0, '<', {
            backgroundColor: '#33ff00ff',
            color: '#000',
            padding: 5,
            fixedWidth: 50,
            fontFamily: '"Jersey 10", sans-serif',
            align: 'center'
        })
        this.previousPage.setInteractive()
        this.previousPage.on('pointerdown', () => {
            this.levelsContainer.removeAll(true)
            if (pageIndex > 0) {
                pageIndex--
            }
            this.fillLevelList(pageIndex)
        })
        this.pageSwitchContainer = this.add.container(0, this.container.height + 100)
        this.pageSwitchContainer.add(this.previousPage)
        this.pageSwitchContainer.add(this.nextPage)

        this.container.add(this.pageSwitchContainer)
    }
    fillLevelList(pageIndex) {
        const row1 = this.add.container(0, 0)
        const row2 = this.add.container(0, 0)

        let x = 0
        this.pages[pageIndex].forEach((item, i) => {
            const txt = this.add.text(i * 60, -20, `${item + 1}`, {
                backgroundColor: item < 10 ? '#15ff00ff' : item < 20 ? '#002fffff' : '#1d3c64ff',
                padding: 5,
                fontFamily: '"Jersey 10", sans-serif',
                fixedWidth: 50,
                align: 'center'
            })
            txt.setStroke('#000', 4)
            txt.setInteractive()
            txt.on('pointerdown', () => {
                this.scene.start('MainScene', { level: item })
            })
            if (i >= 5) {
                txt.x = x * 60
                txt.y = 30
                row2.add(txt)
                x++
            } else {
                row1.add(txt)
            }
        });

        row1.x -= row1.getBounds().width / 2
        row2.x -= row2.getBounds().width / 2
        this.stageTitle.setText(LEVELS.list[this.pages[pageIndex][0]].background.toUpperCase())
        this.stageTitle.setOrigin(0.5)
        this.container.add(row1)
        this.container.add(row2)

    }
}
