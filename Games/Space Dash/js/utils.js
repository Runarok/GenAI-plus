// Utility functions for the game

/**
 * Check if two objects are colliding using simple rectangle collision detection
 * @param {Object} obj1 - First object with x, y, width, height
 * @param {Object} obj2 - Second object with x, y, width, height
 * @returns {boolean} - True if objects are colliding
 */
export function isColliding(obj1, obj2) {
  // For the player, use the hitbox for more precise collision
  const obj1X = obj1.hitbox ? obj1.hitbox.x : obj1.x;
  const obj1Y = obj1.hitbox ? obj1.hitbox.y : obj1.y;
  const obj1Width = obj1.hitbox ? obj1.hitbox.width : obj1.width;
  const obj1Height = obj1.hitbox ? obj1.hitbox.height : obj1.height;
  
  return (
    obj1X < obj2.x + obj2.width &&
    obj1X + obj1Width > obj2.x &&
    obj1Y < obj2.y + obj2.height &&
    obj1Y + obj1Height > obj2.y
  );
}

/**
 * Generate a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number between min and max
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate distance between two points
 * @param {number} x1 - X coordinate of first point
 * @param {number} y1 - Y coordinate of first point
 * @param {number} x2 - X coordinate of second point
 * @param {number} y2 - Y coordinate of second point
 * @returns {number} - Distance between points
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} - Interpolated value
 */
export function lerp(start, end, t) {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} - Angle in radians
 */
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}