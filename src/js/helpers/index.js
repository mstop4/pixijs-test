export const lerp = (min, max, t) => min + (max - min) * t;

export const easeOutCubic = (min, max, t) => {
  const it = t-1;
  return lerp(min, max, (it*it*it+1));
};

export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);