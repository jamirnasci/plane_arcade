import { interstitial } from "../ads/interstitial"
import { LEVELS } from "../levels"

export class EndGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndGameScene' })
    }

    preload() {
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
        this.load.image('menu_btn', 'assets/img/menu/menu_btn.png')
        this.load.image('playagain_btn', 'assets/img/menu/playagain_btn.png')
        this.load.image('levels_btn', 'assets/img/menu/levels_btn.png')
    }

    init(data) {
        this.result = data.result
        this.kills = data.kills || 0
        this.coins = data.coins || 0
        this.level = data.level || 0
        this.map = data.map
        this.isArcade = data.isArcade
        if (!localStorage.getItem('coins')) {
            localStorage.setItem('coins', data.coins)
        } else {
            localStorage.setItem('coins', parseInt(localStorage.getItem('coins')) + data.coins)
        }
    }

    create() {
        interstitial()
        const screenHeight = this.scale.height
        const screenWidth = this.scale.width
        const btnScale = 0.3
        // Fundo
        this.bg = this.add.tileSprite(0, 0, screenWidth, screenHeight, 'bg').setOrigin(0)

        // Fundo da caixa
        const boxWidth = 350
        const boxHeight = 320
        const background = this.add.rectangle(0, 0, boxWidth, boxHeight, 0x000000, 0.7).setOrigin(0.5)
        background.setRounded(20)
        // Container centralizado
        this.container = this.add.container(screenWidth / 2, screenHeight / 2)
        this.container.add(background)

        const endGameParams = this.result == 'win' ? { color: '#33ff00ff', title: 'WIN' } : { color: '#ff0000ff', title: 'LOSS' }

        this.levelTitle = this.add.text(screenWidth / 2, this.container.y - 220, endGameParams.title, {
            fontSize: '60px',
            fill: endGameParams.color,
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.levelTitle.x -= this.levelTitle.width / 2
        this.levelTitle.setStroke('#000', 4)

        this.killsCount = this.add.text(0, -90, `Kills ${this.kills}`, {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.killsCount.x = this.killsCount.x - (this.killsCount.width / 2)
        this.container.add(this.killsCount)

        this.coinsCount = this.add.text(0, -70, `Coins ${this.coins}`, {
            fontSize: '30px',
            fill: '#ecd92cff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.coinsCount.x = this.coinsCount.x - (this.coinsCount.width / 2)
        this.container.add(this.coinsCount)

        this.playAgain = this.add.image(0, 0, 'playagain_btn')
        this.playAgain.setScale(btnScale)
        this.playAgain.setInteractive()
        this.playAgain.on('pointerdown', () => {
            this.scene.start('MainScene', {
                level: this.level,
                isArcade: this.isArcade,
                map: this.map
            })
        })
        this.container.add(this.playAgain)

        this.levelsBtn = this.add.image(0, this.playAgain.y + 60, 'levels_btn')
        this.levelsBtn.setScale(btnScale)
        this.levelsBtn.setInteractive()
        this.levelsBtn.on('pointerdown', () => {
            this.scene.start('LevelsScene')
        })
        this.container.add(this.levelsBtn)

        this.menuBtn = this.add.image(0, this.playAgain.y + 120, 'menu_btn')
        this.menuBtn.setScale(btnScale)
        this.menuBtn.setInteractive()
        this.menuBtn.on('pointerdown', () => {
            this.scene.start('MenuScene')
        })
        this.container.add(this.menuBtn)
    }
}
