const listThings = (things) => {
  console.log(`There are ${things.length} things to log:`, ...things);
}

listThings([1, 2, 3, 4, 5]);