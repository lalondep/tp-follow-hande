let state = 0
input.onButtonPressed(Button.A, function () {
    state = 1
})
input.onButtonPressed(Button.B, function () {
    TPBot.stopCar()
    state = 0
})
basic.forever(function () {
    PlanetX_Display.showUserText(1, "Sonar: " + TPBot.sonarReturn(TPBot.SonarUnit.Centimeters))
    if (state == 1) {
        if (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters) < 10) {
            TPBot.stopCar()
            basic.showLeds(`
                . . # . .
                . # . # .
                # . . . #
                . # . # .
                . . # . .
                `)
            basic.pause(1000)
            TPBot.headlightColor(0xff0000)
        } else if (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters) < 50) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            TPBot.headlightColor(0x00ff00)
            TPBot.setTravelTime(TPBot.DriveDirection.Forward, 25, 1)
        } else {
            basic.showLeds(`
                . # # # .
                . # . # .
                . . # # .
                . . . . .
                . . # . .
                `)
            TPBot.setTravelTime(TPBot.DriveDirection.Left, 25, 0.5)
            TPBot.headlightColor(0xff8000)
        }
    } else {
        basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        TPBot.headlightColor(0x00ffff)
        basic.pause(1000)
    }
})
