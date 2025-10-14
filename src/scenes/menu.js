export class MenuScene extends Phaser.Scene{
    constructor(){
        super({key: 'MenuScene'})
    }
    preload(){
        this.load.image('play_btn', 'assets/img/menu/play_btn.png')
        this.load.image('bg', 'assets/img/menu/menu_bg.png')
    }
    create(){
        this.bg = this.add.tileSprite(0, 0, 1536, 1024, 'bg')
        this.bg.setOrigin(0, 0)

        this.playBtn = this.add.image(100, 100, 'play_btn')
        this.playBtn.setInteractive()
        this.playBtn.on('pointerdown', ()=>{
            this.scene.start('MainScene')
        })
    }
    update(){

    }
}