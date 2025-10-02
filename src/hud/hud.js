/**
 * 
 * @param {Phaser.Scene} context 
 * @param {number} screenWidth 
 * @param {number} screenHeight 
 */

export const loadHud = (context, screenWidth, screenHeight) => {
    context.rightArrow = context.add.image(100, 500, 'right_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.7)
        .setScale(0.2)
    context.rightArrow.on('pointerdown', () => context.rightPressed = true)
    context.rightArrow.on('pointerup', () => context.rightPressed = false)
    context.rightArrow.on('pointerout', () => context.rightPressed = false)

    context.leftArrow = context.add.image(30, 500, 'left_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.7)
        .setScale(0.2)
    context.leftArrow.on('pointerdown', () => context.leftPressed = true)
    context.leftArrow.on('pointerup', () => context.leftPressed = false)
    context.leftArrow.on('pointerout', () => context.leftPressed = false)

    context.upArrow = context.add.image(65, 450, 'up_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.7)
        .setScale(0.2)
    context.upArrow.on('pointerdown', () => context.upPressed = true)
    context.upArrow.on('pointerup', () => context.upPressed = false)
    context.upArrow.on('pointerout', () => context.upPressed = false)

    context.downArrow = context.add.image(65, 550, 'down_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.7)
        .setScale(0.2)
    context.downArrow.on('pointerdown', () => context.downPressed = true)
    context.downArrow.on('pointerup', () => context.downPressed = false)
    context.downArrow.on('pointerout', () => context.downPressed = false)

    context.fireBtn = context.add.image(screenWidth - 100, 500, 'fire_btn')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(0.7)
        .setScale(0.1)
    context.fireBtn.on('pointerdown', () => context.firePressed = true)
    context.fireBtn.on('pointerup', () => context.firePressed = false)
    context.fireBtn.on('pointerout', () => context.firePressed = false)
}