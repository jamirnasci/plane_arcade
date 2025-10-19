import { MainScene } from "../main"

const hudScale = 0.25
const hudAlpha = 0.7

/**
 * 
 * @param {MainScene} scene 
 * @param {number} screenWidth 
 * @param {number} screenHeight 
 */
export const loadHud = (scene, screenWidth, screenHeight) => {
    scene.rightArrow = scene.add.image(135, 640, 'right_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    scene.rightArrow.on('pointerdown', () => scene.rightPressed = true)
    scene.rightArrow.on('pointerup', () => scene.rightPressed = false)
    scene.rightArrow.on('pointerout', () => scene.rightPressed = false)

    scene.leftArrow = scene.add.image(65, 640, 'left_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    scene.leftArrow.on('pointerdown', () => scene.leftPressed = true)
    scene.leftArrow.on('pointerup', () => scene.leftPressed = false)
    scene.leftArrow.on('pointerout', () => scene.leftPressed = false)

    scene.upArrow = scene.add.image(screenWidth - 80, 640, 'up_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    scene.upArrow.on('pointerdown', () => scene.upPressed = true)
    scene.upArrow.on('pointerup', () => scene.upPressed = false)
    scene.upArrow.on('pointerout', () => scene.upPressed = false)

    scene.downArrow = scene.add.image(100, 700, 'down_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    scene.downArrow.on('pointerdown', () => scene.downPressed = true)
    scene.downArrow.on('pointerup', () => scene.downPressed = false)
    scene.downArrow.on('pointerout', () => scene.downPressed = false)

    scene.fireBtn = scene.add.image(screenWidth - 80, 700, 'fire_btn')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    scene.fireBtn.on('pointerdown', () => scene.firePressed = true)
    scene.fireBtn.on('pointerup', () => scene.firePressed = false)
    scene.fireBtn.on('pointerout', () => scene.firePressed = false)

    scene.pauseBtn = scene.add.image(screenWidth - 30, 30, 'pause_btn')
        .setInteractive()
        .setScrollFactor(0)
        .setScale(0.2)
        .on('pointerdown', () => {
            scene.physics.world.pause()
            scene.time.paused = true
            const gameplayMenu = scene.add.rectangle(0, 0, 300, 300, 0x00000, 0.7)
                .setRounded(20)

            scene.pauseTitle = scene.add.text(0, -100, 'PAUSE', {
                fontSize: '30px',
                fontFamily: '"Jersey 10", sans-serif'
            })
                .setScrollFactor(0)
                .setStroke('#000', 4)
            scene.pauseTitle.x -= scene.pauseTitle.width / 2
            scene.exitBtn = scene.add.image(0, 50, 'exit_btn')
                .setInteractive()
                .setScrollFactor(0)
                .setScale(0.2)
                .on('pointerdown', () => {
                    scene.endGame('loss')
                })
            scene.continueBtn = scene.add.image(0, 0, 'continue_btn')
                .setInteractive()
                .setScrollFactor(0)
                .setScale(0.2)
                .on('pointerdown', () => {
                    scene.physics.world.resume()
                    scene.time.paused = false
                    scene.container.destroy()
                })
            scene.container = scene.add.container(screenWidth / 2, screenHeight / 2)
                .setScrollFactor(0)
                .add(gameplayMenu)
                .add(scene.exitBtn)
                .add(scene.continueBtn)
                .add(scene.pauseTitle)
        })
}