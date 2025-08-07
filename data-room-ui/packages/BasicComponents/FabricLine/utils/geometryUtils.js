export function controlPoint(current, previous, next, reverse, smoothing = 0.2) {
  // Find the property of a point that controls the bezier curve.
  // current: Current point.
  // previous: Previous point.
  // next: Next point.
  // reverse: If true, control point is on the other side of the line.
  // smoothing: Factor to adjust the distance of the control point from the line.
  const p = previous || current;
  const n = next || current;
  // Properties of the opposed-line
  const o = {
    x: p.x + (n.x - p.x) * 0.5,
    y: p.y + (n.y - p.y) * 0.5
  };

  // If is end-control-point, add PI to the angle to go backward
  const angle = Math.atan2(p.y - o.y, p.x - o.x) + (reverse ? Math.PI : 0);
  const length = Math.sqrt(Math.pow(p.x - o.x, 2) + Math.pow(p.y - o.y, 2)) * smoothing;

  // The control point position is relative to the point.
  const x = o.x + Math.cos(angle) * length;
  const y = o.y + Math.sin(angle) * length;
  return [x, y];
}

export function distanceToSegmentSq(p, v, w) {
  // p: the point
  // v: start point of the segment
  // w: end point of the segment
  const l2 = Math.pow(w.x - v.x, 2) + Math.pow(w.y - v.y, 2);
  if (l2 === 0) return Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projX = v.x + t * (w.x - v.x);
  const projY = v.y + t * (w.y - v.y);
  return Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2);
}

export function distanceToSegment(p, v, w) {
  // p: the point
  // v: start point of the segment
  // w: end point of the segment
  const l2 = Math.pow(w.x - v.x, 2) + Math.pow(w.y - v.y, 2);
  if (l2 === 0) return Math.sqrt(Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2));
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projX = v.x + t * (w.x - v.x);
  const projY = v.y + t * (w.y - v.y);
  return Math.sqrt(Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2));
} 