export const lerp = (min, max, t) => min + (max - min) * t;

export const easeOutCubic = (min, max, t) => {
  const it = t - 1;
  return lerp(min, max, (it * it * it + 1));
};

export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export const intRandomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};