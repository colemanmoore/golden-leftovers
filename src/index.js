import p5 from 'p5'
import Tone from 'tone'

const OCTAVE_DIVISION = 12;

new p5(p => {

    let synth, sector

    p.setup = () => {
        p.createCanvas(p.windowHeight, p.windowHeight)
        p.frameRate(30)
        synth = new Tone.MonoSynth({
            "oscillator" : {
                "type" : "square"
            },
            "envelope" : {
                "attack" : 0.1,
                "release": 0.05
            }
        }).toMaster()
    }

    p.draw = () => {
        const {t: theta, r: radius} = getCircleCoord()

        fillBackground(theta)

        paintBigCircle()

        paintKnob(theta)

        const percent = 100 * (theta + p.PI) / (2 * p.PI);

        const mouseSector = p.round(OCTAVE_DIVISION * (percent - 1) / 100)
        if (mouseSector !== sector) {
            sector = mouseSector
            const note = Tone.Frequency(p.map(sector, 0, 11, 260, 800)).toNote()
            synth.triggerAttackRelease(note);
        }
    }

    function getCircleCoord() {
        const dx = p.mouseX - p.width/2;
        const dy = p.mouseY - p.height/2;
        return {
            r: p.sqrt( p.sq(dx) + p.sq(dy) ),
            t: p.atan2(dy, dx)
        }
    }

    function fillBackground(theta) {
        const r = p.map(2*p.sin(theta), -1, 1, 0, 255)
        const g = p.map(2*p.sin(theta + (2*p.PI/3)), -1, 1, 0, 255)
        const b = p.map(2*p.sin(theta + (4*p.PI/3)), -1, 1, 0, 255)
        p.background(r, g, b)
    }

    function paintBigCircle() {
        p.stroke(0, 0, 0)
        p.strokeWeight(3)
        p.noFill()
        p.ellipse(p.width/2, p.height/2, p.width, p.height)
    }

    function paintKnob(theta, radius) {
        const knobRadius = p.width / 15
        const knobX = ((p.width/2 - knobRadius) * p.cos(theta)) + (p.width/2)
        const knobY = ((p.height/2 - knobRadius) * p.sin(theta)) + (p.height/2)
        p.strokeWeight(1)
        p.fill(255)
        p.circle(knobX, knobY, knobRadius*2)
    }
}, 'sketch')
