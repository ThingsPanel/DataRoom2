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
 * so they are relative to the new container's top-left (0,0), ensuring no negative coordinates.
 *
 * @param {Array<Object>} points - Array of point objects with current internal coordinates.
 * @param {Object} currentConfig - The current component config { x, y, w, h, ... }.
 * @param {string} [lineShapeType='straight'] - The type of line.
 * @param {number} [lineWidth=2] - The width of the line stroke.
 * @param {number} [pageWidth=Infinity] - The width of the parent canvas.
 * @param {number} [pageHeight=Infinity] - The height of the parent canvas.
 * @returns {Object | null} An object containing the update payload or null if no points:
 *                  - layout: { x, y, w, h } - The new absolute position and size for the container.
 *                  - relativePoints: Array<Object> - Points translated relative to the new container origin (0,0).
 */
export function calculateLayoutUpdate(points, currentConfig, lineShapeType = 'straight', lineWidth = 2, pageWidth = Infinity, pageHeight = Infinity) {
  if (!points || points.length === 0) {
    return null;
  }

  const currentX = currentConfig?.x || 0;
  const currentY = currentConfig?.y || 0;

  const { visualMinX, visualMinY, visualMaxX, visualMaxY } = calculateVisualBounds(points, lineShapeType, lineWidth);

  // Calculate necessary adjustments based on negative visual bounds
  const deltaX = Math.min(0, visualMinX); // How much it goes negative (<= 0)
  const deltaY = Math.min(0, visualMinY); // How much it goes negative (<= 0)

  // Calculate new absolute position for the container
  const newContainerX = currentX + deltaX;
  const newContainerY = currentY + deltaY;

  // Calculate width and height based on visual bounds of the content itself
  const visualContentW = visualMaxX - visualMinX;
  const visualContentH = visualMaxY - visualMinY;

  // Calculate maximum allowed width/height based on page boundaries and new container position
  const maxAllowedW = (isFinite(pageWidth) && pageWidth > 0) ? pageWidth - newContainerX : Infinity;
  const maxAllowedH = (isFinite(pageHeight) && pageHeight > 0) ? pageHeight - newContainerY : Infinity;

  // Final width and height, clamped by page boundaries
  const finalW = Math.min(visualContentW, maxAllowedW);
  const finalH = Math.min(visualContentH, maxAllowedH);
  
  // Calculate the translation needed for internal points to be relative to the visual content's top-left (0,0)
  const translateX = -visualMinX;
  const translateY = -visualMinY;

  const relativePoints = points.map(p => {
    const relativePoint = {
      ...p, // Copy other properties
      x: p.x + translateX,
      y: p.y + translateY,
    };
    // Translate control points
    if (relativePoint.cp1x != null) { relativePoint.cp1x += translateX; }
    if (relativePoint.cp1y != null) { relativePoint.cp1y += translateY; }
    if (relativePoint.cp2x != null) { relativePoint.cp2x += translateX; }
    if (relativePoint.cp2y != null) { relativePoint.cp2y += translateY; }
    delete relativePoint.element;
    return relativePoint;
  });

  return {
    layout: {
      x: newContainerX,
      y: newContainerY,
      w: Math.max(0, finalW), // Use clamped width
      h: Math.max(0, finalH)  // Use clamped height
    },
    relativePoints: relativePoints
  };
} 