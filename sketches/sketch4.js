// Instance-mode sketch for tab 4
// Stack of rectangles fading one by one to represent minutes in a session
registerSketch('sk4', function (p) {
  let sessionLength = 25; // minutes

  function makeSize() {
    const w = Math.min(p.windowWidth, 800);
    const h = Math.min(p.windowHeight, 800);
    return { w, h };
  }

  p.setup = function () {
    const s = makeSize();
    p.createCanvas(s.w, s.h);
    p.rectMode(p.CORNER);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(16);
  };

  p.draw = function () {
    const s = makeSize();
    if (p.width !== s.w || p.height !== s.h) p.resizeCanvas(s.w, s.h);

    const elapsed = (p.minute() % sessionLength) + p.second() / 60 + p.millis() / 60000;
    const filled = Math.floor(elapsed);
    const frac = elapsed - filled; // progress within current minute

    p.background(250);
    p.fill(30);
    p.textSize(18);
    p.text('Stack Timer', p.width / 2, 30);

    // stack layout
    const stackW = Math.min(320, p.width * 0.6);
    const stackH = Math.min(480, p.height * 0.7);
    const left = (p.width - stackW) / 2;
    const top = 60;
    const num = sessionLength;
    const rectH = stackH / num;

    for (let i = 0; i < num; i++) {
      const y = top + i * rectH;
      // finished rectangles are darker
      if (i < filled) {
        p.fill(90, 170, 90, 220);
        p.noStroke();
        p.rect(left, y, stackW, rectH - 2);
      } else if (i === filled) {
        // current one fades in as minute progresses
        p.fill(90, 170, 90, 40 + 216 * frac);
        p.noStroke();
        p.rect(left, y, stackW, rectH - 2);
      } else {
        // future ones are light with border
        p.fill(255, 255, 255);
        p.stroke(200);
        p.rect(left, y, stackW, rectH - 2);
      }
    }

    // remaining time label
    const remaining = Math.max(0, sessionLength - elapsed);
    const remMin = Math.floor(remaining);
    const remSec = Math.floor((remaining - remMin) * 60);
    const timeLabel = (remMin < 10 ? '0' + remMin : remMin) + ':' + (remSec < 10 ? '0' + remSec : remSec);
    p.noStroke();
    p.fill(50);
    p.textSize(16);
    p.text(timeLabel + ' remaining', p.width / 2, top + stackH + 28);
  };

  p.windowResized = function () {
    const s = makeSize();
    p.resizeCanvas(s.w, s.h);
  };
});
// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(200, 240, 200);
    p.fill(30, 120, 40);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. C', p.width / 2, p.height / 2);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
