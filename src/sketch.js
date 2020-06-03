import p5 from 'p5'
// import Tone from 'tone'

const OCTAVE_DIVISION = 12;

new p5(p => {

    let synth

    p.setup = () => {
        p.createCanvas(p.windowHeight, p.windowHeight)
        p.frameRate(30)
        // synth = new Tone.Synth().toMaster()
    }

    p.draw = () => {
        const {theta, radius} = getCircleCoord()

        // fillBackground(theta)

        paintBigCircle()

        paintKnob(theta)

        const percent = 100 * (theta + p.PI) / (2 * p.PI);
        const sector = p.round(OCTAVE_DIVISION * (percent - 1) / 100);
    }

    function getCircleCoord() {
        const dx = p.mouseX - p.width/2;
        const dy = p.mouseY - p.height/2;
        return {
            r: p.sqrt( p.sq(dx) + p.sq(dy) ),
            t: p.atan2(dy, dx)
        };
    }

    function fillBackground(theta) {
        const r = p.map(2*p.sin(theta), -1, 1, 0, 255)
        const g = p.map(2*p.sin(theta + (2*p.PI/3)), -1, 1, 0, 255)
        const b = p.map(2*p.sin(theta + (4*p.PI/3)), -1, 1, 0, 255)
        p.background(r, g, b)
    }

    function paintBigCircle() {
        p.stroke(0, 0, 0)
        p.strokeWeight(4)
        p.noFill()
        p.ellipse(p.width/2, p.height/2, p.width, p.height)
    }

    function paintKnob(theta) {
        const knobRadius = 15
        const knobX = ((p.width/2 - knobRadius) * p.cos(theta)) + (p.width/2)
        const knobY = ((p.height/2 - knobRadius) * p.sin(theta)) + (p.height/2)
        p.strokeWeight(2)
        p.fill(255)
        p.circle(knobX, knobY, knobRadius*2)
    }
}, 'sketch')
