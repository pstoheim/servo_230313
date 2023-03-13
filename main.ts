function Geschwindigkeitsaenderung (Startwinkel: number, Stoppwinkel: number, Verzoegerung: number) {
    for (let Zaehler = 0; Zaehler <= Math.abs(Stoppwinkel - Startwinkel); Zaehler++) {
        if (Stoppwinkel <= Startwinkel) {
            servos.P2.setAngle(Startwinkel - Zaehler)
        } else {
            servos.P2.setAngle(Startwinkel + Zaehler)
        }
        basic.pause(Verzoegerung)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Surprised)
    basic.pause(1000)
})
input.onButtonPressed(Button.A, function () {
    Sperre = 1
    pins.analogWritePin(AnalogPin.P1, 1023)
    basic.pause(200)
    Feuchtigkeit = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P1, 0)
    basic.showString("FEUCHTE:")
    basic.showNumber(Feuchtigkeit)
    basic.pause(1000)
    Sperre = 0
})
input.onButtonPressed(Button.B, function () {
    Sperre = 1
    Temperatur = input.temperature()
    basic.showString("TEMP:")
    basic.showNumber(Temperatur)
    basic.showString("GRAD CELSIUS")
    basic.pause(1000)
    Sperre = 0
})
let Temperatur = 0
let Feuchtigkeit = 0
let Sperre = 0
Sperre = 1
let Feuchtigkeitsschwellwert = 900
let Startwinkel = 0
let Stoppwinkel = 0
let Verzoegerung = 0
basic.showIcon(IconNames.Happy)
basic.pause(1000)
servos.P2.setAngle(90)
basic.pause(1000)
servos.P2.stop()
basic.pause(1000)
Sperre = 0
basic.forever(function () {
    if (!(Sperre)) {
        pins.analogWritePin(AnalogPin.P1, 1023)
        basic.pause(200)
        Feuchtigkeit = pins.analogReadPin(AnalogPin.P0)
        pins.analogWritePin(AnalogPin.P1, 0)
        led.plotBarGraph(
        Feuchtigkeit,
        1023
        )
        if (Feuchtigkeit < Feuchtigkeitsschwellwert) {
            basic.showIcon(IconNames.Umbrella)
            servos.P2.setAngle(90)
            basic.pause(1000)
            Geschwindigkeitsaenderung(90, 0, 3)
            basic.pause(2000)
            servos.P2.stop()
            Geschwindigkeitsaenderung(0, 90, 3)
            basic.pause(500)
            servos.P2.stop()
            basic.showIcon(IconNames.Heart)
            basic.pause(5000)
            led.plotBarGraph(
            Feuchtigkeit,
            1023
            )
        }
        basic.pause(5000)
    }
})
