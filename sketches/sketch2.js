// Instance-mode sketch for tab 2
// Expanding bar (prototype A) — maps a study focus session (default 25 minutes)
registerSketch('sk2', function (p) {
  // Expanding bar with simple interactivity: mouse toggles start/pause; ArrowUp/ArrowDown adjusts length
  let sessionLength = 25; // minutes (adjustable)
  let running = false;
  let startMillis = 0; // p.millis() when running started (adjusted by pausedAccum)
  let pausedAccum = 0; // milliseconds accumulated while previously running

  function makeSize() {
    const w = Math.min(p.windowWidth, 800);
    const h = Math.min(p.windowHeight, 800);
    return { w, h };
  }

  p.setup = function () {
    const s = makeSize();
    p.createCanvas(s.w, s.h);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    p.noStroke();
  };

  p.draw = function () {
    const s = makeSize();
    if (p.width !== s.w || p.height !== s.h) p.resizeCanvas(s.w, s.h);

    // compute elapsed using our start/pause state
    let elapsedMillis = pausedAccum;
    if (running) {
      elapsedMillis = pausedAccum + (p.millis() - startMillis);
    }
    const elapsedMinutes = elapsedMillis / 60000.0; // fractional minutes

    // progress through current session cycle (wraps every sessionLength minutes)
    const progress = p.constrain((elapsedMinutes % sessionLength) / sessionLength, 0, 1);

    // layout
    p.background(245);
    const padding = 40;
    const barW = p.width - padding * 2;
    const barH = Math.min(56, p.height * 0.08);
    const x = padding;
    const y = p.height / 2 - barH / 2;

    // container
    p.fill(230);
    p.rect(x, y, barW, barH, 8);

    // fill (progress)
    p.fill(100, 150, 240);
    p.rect(x, y, barW * progress, barH, 8);

    // label + time
    p.fill(50);
    p.textSize(18);
    p.text('Focus Session', p.width / 2, y - 36);

    // remaining time in current cycle
    let remaining = sessionLength - (elapsedMinutes % sessionLength);
    if (remaining < 0) remaining = 0;
    const remMin = Math.floor(remaining);
    const remSec = Math.floor((remaining - remMin) * 60);
    const timeLabel = (remMin < 10 ? '0' + remMin : remMin) + ':' + (remSec < 10 ? '0' + remSec : remSec);
    p.textSize(18);
    p.text(timeLabel + ' remaining', p.width / 2, y + barH + 28);

    // state + instructions
    p.textSize(14);
    p.fill(90);
    const state = running ? 'Running (click to pause)' : 'Paused (click to start)';
    p.text(state + '   |   Session ' + sessionLength + ' min   |   ArrowUp/Down to adjust length', p.width / 2, y + barH + 56);
  };

  p.windowResized = function () {
    const s = makeSize();
    p.resizeCanvas(s.w, s.h);
  };

  // toggle start/pause on mouse press
  p.mousePressed = function () {
    if (!running) {
      // start: set startMillis such that elapsedMillis = pausedAccum
      startMillis = p.millis();
      running = true;
    } else {
      // pause: accumulate elapsed
      pausedAccum = pausedAccum + (p.millis() - startMillis);
      running = false;
    }
  };

  // adjust session length with arrow keys
  p.keyPressed = function () {
    if (p.keyCode === p.UP_ARROW) {
      sessionLength = Math.min(60, sessionLength + 1);
    } else if (p.keyCode === p.DOWN_ARROW) {
      sessionLength = Math.max(1, sessionLength - 1);
    } else if (p.key === 'r' || p.key === 'R') {
      // reset timer accumulators
      pausedAccum = 0;
      if (running) startMillis = p.millis();
    }
  };
});
