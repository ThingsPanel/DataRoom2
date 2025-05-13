/**
 * Calculates the bounding box of a set of points and returns the box dimensions
 * along with the points translated to be relative to the box's top-left corner.
 *
 * @param {Array<Object>} points - Array of point objects. Each object must have x, y properties.
 *                                 May optionally have cp1x, cp1y, cp2x, cp2y control points.
 * @param {string} [lineShapeType='straight'] - The type of line ('straight', 'cubicBezier', etc.).
 * @param {number} [lineWidth=2] - The width of the line stroke.
 * @returns {Object} An object containing:
 *                   - container: { x, y, w, h } - The absolute position and size of the bounding box.
 *                   - relativePoints: Array<Object> - Points with coordinates translated relative to the container's top-left corner.
 */
export function calculateBoundsAndRelativePoints(points, lineShapeType = 'straight', lineWidth = 2) {
  if (!points || points.length === 0) {
    return {
      container: { x: 0, y: 0, w: 0, h: 0 },
      relativePoints: []
    };
  }

  // Ensure lineWidth is a non-negative number
  const numericLineWidth = Math.max(0, Number(lineWidth) || 0);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  points.forEach(p => {
    // Always consider anchor points
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);

    // If cubic Bezier, also consider control points for bounds approximation
    if (lineShapeType === 'cubicBezier') {
      if (p.cp1x != null) { minX = Math.min(minX, p.cp1x); maxX = Math.max(maxX, p.cp1x); }
      if (p.cp1y != null) { minY = Math.min(minY, p.cp1y); maxY = Math.max(maxY, p.cp1y); }
      if (p.cp2x != null) { minX = Math.min(minX, p.cp2x); maxX = Math.max(maxX, p.cp2x); }
      if (p.cp2y != null) { minY = Math.min(minY, p.cp2y); maxY = Math.max(maxY, p.cp2y); }
    }
  });
  
  // Handle case where all points are the same (or only one point)
  if (minX === Infinity) {
     if (points.length > 0) {
       minX = points[0].x;
       minY = points[0].y;
       maxX = points[0].x;
       maxY = points[0].y;
     } else { // Should not happen based on initial check, but be safe
         return { container: { x: 0, y: 0, w: 0, h: 0 }, relativePoints: [] };
     }
  }

  // Geometric bounds
  const geometricW = maxX - minX;
  const geometricH = maxY - minY;

  // Calculate final container position and dimensions including line width
  const containerX = minX - (numericLineWidth / 2);
  const containerY = minY - (numericLineWidth / 2);
  // Width/Height includes the stroke extending on both sides of the geometry
  const containerW = geometricW + numericLineWidth;
  const containerH = geometricH + numericLineWidth;

  const relativePoints = points.map(p => {
    const relativePoint = {
      ...p, // Copy other properties like cp1UserSet, cp2UserSet etc.
      x: p.x - containerX, // Translate relative to the NEW containerX
      y: p.y - containerY, // Translate relative to the NEW containerY
    };
    // Translate control points if they exist, relative to the NEW containerX/Y
    if (relativePoint.cp1x != null) {
      relativePoint.cp1x -= containerX;
    }
    if (relativePoint.cp1y != null) {
      relativePoint.cp1y -= containerY;
    }
    if (relativePoint.cp2x != null) {
      relativePoint.cp2x -= containerX;
    }
    if (relativePoint.cp2y != null) {
      relativePoint.cp2y -= containerY;
    }
    // Remove the SVG element reference from the saved data
    delete relativePoint.element;
    return relativePoint;
  });

  return {
    container: {
      x: containerX,
      y: containerY,
      w: Math.max(0, containerW), // Ensure non-negative width
      h: Math.max(0, containerH)  // Ensure non-negative height
    },
    relativePoints: relativePoints
  };
}

// New function to calculate only the visual bounds relative to the internal (0,0)
function calculateVisualBounds(points, lineShapeType = 'straight', lineWidth = 2) {
  if (!points || points.length === 0) {
    return { visualMinX: 0, visualMinY: 0, visualMaxX: 0, visualMaxY: 0 };
  }

  const numericLineWidth = Math.max(0, Number(lineWidth) || 0);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  points.forEach(p => {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);

    if (lineShapeType === 'cubicBezier') {
      if (p.cp1x != null) { minX = Math.min(minX, p.cp1x); maxX = Math.max(maxX, p.cp1x); }
      if (p.cp1y != null) { minY = Math.min(minY, p.cp1y); maxY = Math.max(maxY, p.cp1y); }
      if (p.cp2x != null) { minX = Math.min(minX, p.cp2x); maxX = Math.max(maxX, p.cp2x); }
      if (p.cp2y != null) { minY = Math.min(minY, p.cp2y); maxY = Math.max(maxY, p.cp2y); }
    }
  });

  if (minX === Infinity) { // Handle single point case
    if (points.length > 0) {
      minX = points[0].x;
      minY = points[0].y;
      maxX = points[0].x;
      maxY = points[0].y;
    } else {
      return { visualMinX: 0, visualMinY: 0, visualMaxX: 0, visualMaxY: 0 };
    }
  }
  
  // Calculate visual bounds including line width
  const visualMinX = minX - (numericLineWidth / 2);
  const visualMinY = minY - (numericLineWidth / 2);
  const visualMaxX = maxX + (numericLineWidth / 2);
  const visualMaxY = maxY + (numericLineWidth / 2);
  
  return { visualMinX, visualMinY, visualMaxX, visualMaxY };
}

/**
 * Calculates necessary layout updates (position, size) and translates points
 * so they are relative to the new container's top-left (0,0) plus padding,
 * ensuring no negative coordinates for the container itself and respecting page boundaries.
 *
 * @param {Array<Object>} points - Array of point objects with current internal coordinates.
 * @param {Object} currentConfig - The current component config { x, y, w, h, ... }.
 * @param {string} [lineShapeType='straight'] - The type of line.
 * @param {number} [lineWidth=2] - The width of the line stroke.
 * @param {number} [pageWidth=Infinity] - The width of the parent canvas.
 * @param {number} [pageHeight=Infinity] - The height of the parent canvas.
 * @param {number} [padding=0] - Padding to add around the content within the container.
 * @returns {Object | null} An object containing the update payload or null if no points.
 */
export function calculateLayoutUpdate(points, currentConfig, lineShapeType = 'straight', lineWidth = 2, pageWidth = Infinity, pageHeight = Infinity, padding = 0) {
  if (!points || points.length === 0) {
    return { // Return a default state if no points, so FabricLine can clear itself
        layout: { x: currentConfig?.x || 0, y: currentConfig?.y || 0, w: padding * 2, h: padding * 2 },
        relativePoints: []
    };
  }

  const currentAbsX = currentConfig?.x || 0;
  const currentAbsY = currentConfig?.y || 0;

  // visualMin/Max are relative to the SVG's current (0,0)
  const { visualMinX, visualMinY, visualMaxX, visualMaxY } = calculateVisualBounds(points, lineShapeType, lineWidth);

  let finalContainerAbsX = currentAbsX;
  let finalContainerAbsY = currentAbsY;

  // --- Determine if container's absolute X, Y need to change ---
  // Content's visual left edge (relative to current SVG 0,0) is visualMinX.
  // We want this edge to be at least `padding` inside the container.
  // If visualMinX < padding, it means content is too far left relative to where padding should start.
  const offsetX = visualMinX - padding; // If negative, content is 'intruding' into padding zone or beyond 0.
  if (offsetX < 0) {
    // Move container left by the intrusion amount to make visualMinX align with padding.
    finalContainerAbsX = currentAbsX + offsetX;
  }

  const offsetY = visualMinY - padding; // If negative, content is 'intruding' into padding zone or beyond 0.
  if (offsetY < 0) {
    // Move container up by the intrusion amount.
    finalContainerAbsY = currentAbsY + offsetY;
  }
  
  // --- Calculate container dimensions ---
  // Width/Height of the visual content itself
  const contentVisualW = Math.max(0, visualMaxX - visualMinX);
  const contentVisualH = Math.max(0, visualMaxY - visualMinY);

  // Desired container width/height including padding
  let desiredContainerW = contentVisualW + padding * 2;
  let desiredContainerH = contentVisualH + padding * 2;

  // Ensure minimum size due to padding, even if content is zero-size
  desiredContainerW = Math.max(desiredContainerW, padding * 2);
  desiredContainerH = Math.max(desiredContainerH, padding * 2);

  // --- Clamp container by page boundaries ---
  // Max width/height the container can have based on its new position and page size
  const maxAllowedW = isFinite(pageWidth) ? pageWidth - finalContainerAbsX : Infinity;
  const maxAllowedH = isFinite(pageHeight) ? pageHeight - finalContainerAbsY : Infinity;

  const finalContainerW = Math.max(padding * 2, Math.min(desiredContainerW, maxAllowedW));
  const finalContainerH = Math.max(padding * 2, Math.min(desiredContainerH, maxAllowedH));

  // --- Translate points to be relative to the new container's padded origin ---
  // The origin for relative points should be (padding, padding) inside the new container.
  // A point's original absolute X was: currentAbsX + p.x
  // Its new absolute X should be: finalContainerAbsX + new_relative_x
  // We want the visual content (e.g., visualMinX) to now be effectively at 'padding'
  // relative to the new container's (0,0).
  // Translation: shift such that original visualMinX now corresponds to 'padding'.
  const translateX = padding - visualMinX;
  const translateY = padding - visualMinY;

  const relativePoints = points.map(p => {
    const rp = {
      ...p, // Copy other properties like cp1UserSet, cp2UserSet, element
      x: p.x + translateX,
      y: p.y + translateY,
    };
    if (rp.cp1x != null) { rp.cp1x += translateX; }
    if (rp.cp1y != null) { rp.cp1y += translateY; }
    if (rp.cp2x != null) { rp.cp2x += translateX; }
    if (rp.cp2y != null) { rp.cp2y += translateY; }
    delete rp.element; // Don't save DOM element references
    return rp;
  });

  return {
    layout: {
      x: finalContainerAbsX,
      y: finalContainerAbsY,
      w: finalContainerW,
      h: finalContainerH
    },
    relativePoints: relativePoints
  };
} 