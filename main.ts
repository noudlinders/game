function If_1_then_return_2_or_3 (operand: boolean, _true: string, _false: string) {
    if (operand) {
        return _true
    } else {
        return _false
    }
}
input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let Score = 0
let HighScore = false
let emptyObstacleY = 0
let ticks = 0
let bird: game.LedSprite = null
let index = 0
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
basic.forever(function () {
    let obstacles: game.LedSprite[] = []
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
        }
    }
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            let list: number[] = []
            list.push(Math.floor(ticks / 4))
            for (let index3 = 0; index3 <= list.length; index3++) {
                HighScore = list.length == 1 || list[index3] < Math.floor(ticks / 4)
                if (HighScore) {
                    break;
                }
            }
            while (!(input.buttonIsPressed(Button.AB))) {
                basic.showString("" + Math.floor(ticks / 4) + If_1_then_return_2_or_3(HighScore, "!NEW HI!", ""))
            }
            ticks = 0
            bird.change(LedSpriteProperty.Blink, -25)
        }
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) != bird.get(LedSpriteProperty.Y)) {
            Score += 1
        }
    }
    ticks += 1
    basic.pause(300)
})
