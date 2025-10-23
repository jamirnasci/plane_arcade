export class StageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StageScene' })
    }
    preload() {
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
        this.load.image('ukraine', 'assets/img/levels/ukranie.png')
        this.load.image('libia', 'assets/img/levels/libia.png')
        this.load.image('japan', 'assets/img/levels/japan.jpg')
        this.load.image('select_btn', 'assets/img/menu/select_btn.png')
        this.load.image('back_btn', 'assets/img/menu/back_btn.png')
    }
    create() {

        const screenHeight = window.innerHeight
        const screenWidth = window.innerWidth
        const mapsList = ['libia', 'japan', 'ukraine']

        this.bg = this.add.image(0, 0, 'bg')
        this.bg.setOrigin(0, 0)

        const box = this.add.rectangle(0, 0, 350, 370, 0x00000, 0.7)
        box.setRounded(20)

        this.container = this.add.container(screenWidth / 2, screenHeight / 2)
        this.container.add(box)

        this.backBtn = this.add.image(
            -(this.container.getBounds().width / 2) + 40,
            -(this.container.getBounds().height / 2) + 40,
            'back_btn'
        )
        this.backBtn.setScale(0.2)
        this.backBtn.setInteractive()
        this.backBtn.on('pointerdown', () => {
            this.scene.start('MenuScene')
        })
        this.container.add(this.backBtn)

        this.stageTitle = this.add.text(0, -150, 'libia', {
            padding: 10,
            fontSize: '40px',
            fill: '#ffffffff',
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.stageTitle.setOrigin(0.5)
        this.container.add(this.stageTitle)
        this.stageImg = this.add.image(0, 0, mapsList[0])
        this.stageImg.setScale(0.15)
        this.container.add(this.stageImg)

        let mapIndex = 0
        this.switchStageContainer = this.add.container(0, 150)
        this.nextStageBtn = this.add.text(5, 0, '>', {
            fixedWidth: 50,
            backgroundColor: '#33ff00ff',
            color: '#000',
            align: 'center',
            padding: 5,
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.selectBtn = this.add.image(0, 120, 'select_btn')
        this.selectBtn.setScale(0.2)
        this.selectBtn.setInteractive()
        this.selectBtn.on('pointerdown', () => {
            this.scene.start('MainScene', {
                level: 0,
                isArcade: true,
                map: mapsList[mapIndex]
            })
        })
        this.container.add(this.selectBtn)
        this.nextStageBtn.setInteractive()
        this.nextStageBtn.on('pointerdown', () => {
            if (mapIndex < mapsList.length - 1) {
                mapIndex++
            }
            this.stageImg.setTexture(mapsList[mapIndex])
            this.stageTitle.setText(mapsList[mapIndex])
        })
        this.previousStageBtn = this.add.text(-55, 0, '<', {
            fixedWidth: 50,
            backgroundColor: '#33ff00ff',
            color: '#000',
            align: 'center',
            padding: 5,
            fontFamily: '"Jersey 10", sans-serif'
        })
        this.previousStageBtn.setInteractive()
        this.previousStageBtn.on('pointerdown', () => {
            if (mapIndex > 0) {
                mapIndex--
            }
            this.stageImg.setTexture(mapsList[mapIndex])
            this.stageTitle.setText(mapsList[mapIndex])
        })
        this.switchStageContainer.add(this.nextStageBtn)
        this.switchStageContainer.add(this.previousStageBtn)

        this.container.add(this.switchStageContainer)
    }
    update() {

    }
}