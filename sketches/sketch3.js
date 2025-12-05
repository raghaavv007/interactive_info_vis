// Instance-mode sketch for tab 3
// Color gradient shifting from cool to warm over a study session
registerSketch('sk3', function (p) {
  let sessionLength = 25; // minutes

  function makeSize() {
    const w = Math.min(p.windowWidth, 800);
    const h = Math.min(p.windowHeight, 800);
    return { w, h };
  }

  p.setup = function () {
    const s = makeSize();
    p.createCanvas(s.w, s.h);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
  };

  p.draw = function () {
    const s = makeSize();
    if (p.width !== s.w || p.height !== s.h) p.resizeCanvas(s.w, s.h);

    const elapsed = (p.minute() % sessionLength) + p.second() / 60 + p.millis() / 60000;
    const progress = p.constrain(elapsed / sessionLength, 0, 1);

    // colors (cool -> warm)
    const cool = p.color(60, 120, 200);
    const warm = p.color(255, 140, 40);
    const bg = p.lerpColor(cool, warm, progress);
    p.background(bg);

    // subtle pulsing circle to show seconds rhythm
    const pulse = 1 + 0.04 * p.sin(p.millis() / 200);
    p.fill(255, 255, 255, 120);
    const dia = Math.min(p.width, p.height) * 0.35 * pulse;
    p.ellipse(p.width / 2, p.height / 2, dia, dia);

    p.fill(30);
    p.textSize(20);
    p.text('Color Gradient Timer', p.width / 2, p.height * 0.12);

    // percent/remaining
    const remaining = Math.max(0, sessionLength - elapsed);
    const remMin = Math.floor(remaining);
    const remSec = Math.floor((remaining - remMin) * 60);
    const timeLabel = (remMin < 10 ? '0' + remMin : remMin) + ':' + (remSec < 10 ? '0' + remSec : remSec);
    p.textSize(18);
    p.text(timeLabel + ' remaining', p.width / 2, p.height * 0.88);
  };

  p.windowResized = function () {
    const s = makeSize();
    p.resizeCanvas(s.w, s.h);
  };
});
// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(240, 200, 200);
    p.fill(180, 60, 60);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. B', p.width / 2, p.height / 2);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
