/**
 * 
 * @param {Phaser.Scene} context 
 * @param {number} screenWidth 
 * @param {number} screenHeight 
 */
const hudScale = 0.25
const hudAlpha = 0.3

export const loadHud = (context, screenWidth, screenHeight) => {
    context.rightArrow = context.add.image(135, 640, 'right_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    context.rightArrow.on('pointerdown', () => context.rightPressed = true)
    context.rightArrow.on('pointerup', () => context.rightPressed = false)
    context.rightArrow.on('pointerout', () => context.rightPressed = false)

    context.leftArrow = context.add.image(65, 640, 'left_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    context.leftArrow.on('pointerdown', () => context.leftPressed = true)
    context.leftArrow.on('pointerup', () => context.leftPressed = false)
    context.leftArrow.on('pointerout', () => context.leftPressed = false)

    context.upArrow = context.add.image(screenWidth - 80, 640, 'up_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    context.upArrow.on('pointerdown', () => context.upPressed = true)
    context.upArrow.on('pointerup', () => context.upPressed = false)
    context.upArrow.on('pointerout', () => context.upPressed = false)

    context.downArrow = context.add.image(100, 700, 'down_arrow')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    context.downArrow.on('pointerdown', () => context.downPressed = true)
    context.downArrow.on('pointerup', () => context.downPressed = false)
    context.downArrow.on('pointerout', () => context.downPressed = false)

    context.fireBtn = context.add.image(screenWidth - 80, 700, 'fire_btn')
        .setInteractive()
        .setScrollFactor(0)
        .setAlpha(hudAlpha)
        .setScale(hudScale)
    context.fireBtn.on('pointerdown', () => context.firePressed = true)
    context.fireBtn.on('pointerup', () => context.firePressed = false)
    context.fireBtn.on('pointerout', () => context.firePressed = false)
}