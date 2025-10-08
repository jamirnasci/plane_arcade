class Level {
    /**
     *
     * @param {string} background
     * @param {string|null} boss
     * @param {number} bossN
     * @param {string} enemy
     * @param {number} enemyN
     * @param {number} enemyDamage
     */
    constructor(background, boss, bossN, bossLife, enemy, enemyN, enemyDamage, enemyLife) {
        this.background = background
        this.boss = boss
        this.bossN = bossN
        this.enemy = enemy
        this.bossLife = bossLife
        this.enemyLife = enemyLife
        this.enemyN = enemyN
        this.enemyDamage = enemyDamage
    }
}

export class LEVELS {
    static list = [
        new Level('libia', null, 0, 0,'enemy', 20, 1, 10),
        new Level('libia', null, 0, 0, 'enemy', 30, 1, 10),
        new Level('libia', null, 0, 0, 'enemy', 50, 1, 10),
        new Level('libia', 'boss1', 1, 100, 'enemy', 35, 1, 10),
        new Level('libia', 'boss1', 1, 100, 'helicopter', 40, 1, 15),
        new Level('libia', 'boss1', 2, 100, 'helicopter', 20, 1, 15),
        new Level('libia', 'boss1', 2, 100, 'enemy', 50, 1, 10),
        new Level('libia', 'boss1', 2, 100, 'helicopter', 45, 1, 15),
        new Level('libia', 'boss1', 4, 100, 'enemy', 5, 1, 10)
    ]
}


