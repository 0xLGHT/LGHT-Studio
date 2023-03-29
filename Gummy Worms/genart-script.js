const sketch = (p) => {
  const noiseScale = 0.00575;

  let numPoints;
  let maxStrokeWeight;
  let points = [];
  let colors = [];
  let strokeWidths = [];

  p.setup = function() {
    const canvas = p.createCanvas(1093, 729);
    canvas.parent('sketch-container');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noiseDetail(4, 0.5);

    numPoints = p.floor(p.random(3750, 4000));
    maxStrokeWeight = p.random(125, 150);

    const colorRanges = [
      { min: 0, max: 360 },
      { min: 85, max: 150 },
      { min: 0, max: 40 },
      { min: 40, max: 85 },
      { min: 150, max: 250 },
      { min: 250, max: 360 },
    ];

    const selectedRange = p.random(colorRanges);

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: p.width * (i / (numPoints - 1)),
        y: p.height / 2,
      });

      let hue = p.map(i, 0, numPoints - 1, selectedRange.min, selectedRange.max);
      let saturation = p.random(95, 100);
      let brightness = p.random(95, 100);
      colors.push(p.color(hue, saturation, brightness));

      strokeWidths.push(p.random(1, maxStrokeWeight));
    }
  };

  p.draw = function() {
    p.background(0);

    for (let i = 1; i < points.length; i++) {
      let prevPoint = points[i - 1];
      let point = points[i];

      let noiseY = p.map(p.noise(point.x * noiseScale, point.y * noiseScale), 0, 1, -600, 600);
      point.y = p.height / 2 + noiseY;

      p.stroke(colors[i]);
      p.strokeWeight(p.lerp(strokeWidths[i - 1], strokeWidths[i], 0.5));
      p.line(prevPoint.x, prevPoint.y, point.x, point.y);
    }

    p.noLoop();
  };
};

new p5(sketch);
