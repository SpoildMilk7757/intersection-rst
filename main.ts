function Pedestrian_Crossing () {
    if (xyz == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . # . # .
            # . . . #
            `)
        basic.pause(1000)
        for (let index = 0; index < 9; index++) {
            if (xyz == 0) {
                basic.showNumber(Pedestrian_Crossing_Time)
                Pedestrian_Crossing_Time += -1
            }
        }
        Pedestrian_Crossing_Time = 9
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        if (xyz == 0) {
            YELLOW()
            basic.pause(3000)
            RED()
        }
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    Random = receivedNumber
    xyz = 1
    Ambulance()
    xyz = 0
})
function Sonar () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    Distance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
}
function RED () {
    range = Strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Red))
    range = Strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = Strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
function Ambulance () {
    basic.pause(500)
    GREEN()
    basic.pause(10000)
    YELLOW()
    basic.pause(3000)
    RED()
}
function Vehicle () {
    if (xyz == 0) {
        basic.showIcon(IconNames.No)
        GREEN()
        for (let index = 0; index < 20; index++) {
            if (xyz == 0) {
                basic.pause(500)
            }
        }
        YELLOW()
        basic.pause(1000)
        for (let index = 0; index < 6; index++) {
            if (xyz == 0) {
                basic.pause(500)
            }
        }
        RED()
    }
}
function GREEN () {
    range = Strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = Strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = Strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Green))
}
function Pedestrian_Crossing_VI () {
    if (xyz == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . # . # .
            # . . . #
            `)
        basic.pause(1000)
        for (let index = 0; index <= 9; index++) {
            if (xyz == 0) {
                music.playTone(75 * index + 200, music.beat(BeatFraction.Half))
                music.playTone(75 * index + 150, music.beat(BeatFraction.Half))
                basic.showNumber(Pedestrian_Crossing_Time)
                Pedestrian_Crossing_Time += -1
            }
        }
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        music.playTone(698, music.beat(BeatFraction.Double))
        Pedestrian_Crossing_Time = 9
        if (xyz == 0) {
            YELLOW()
            basic.pause(3000)
            RED()
        }
    }
}
function YELLOW () {
    range = Strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = Strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Yellow))
    range = Strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
let range: neopixel.Strip = null
let Distance = 0
let Random = 0
let xyz = 0
let Strip: neopixel.Strip = null
let Pedestrian_Crossing_Time = 0
Pedestrian_Crossing_Time = 9
Strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
Strip.setBrightness(20)
radio.setGroup(177)
basic.showIcon(IconNames.No)
RED()
basic.forever(function () {
    Sonar()
    if (Distance > 4 && Distance < 6) {
        Vehicle()
    }
    if (input.buttonIsPressed(Button.A)) {
        GREEN()
        Pedestrian_Crossing()
    }
    if (input.buttonIsPressed(Button.B)) {
        music.playTone(587, music.beat(BeatFraction.Quarter))
        music.playTone(698, music.beat(BeatFraction.Half))
        GREEN()
        Pedestrian_Crossing_VI()
    }
    if (Random == 7) {
    	
    }
})
