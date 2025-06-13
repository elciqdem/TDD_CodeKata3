const { Item } = require("./item");

const MAX_QUALITY = 50;

function degrade(item, points = 1) {
  if (item.quality === 0) return;
  item.quality = Math.max(0, item.quality - points);
}

function improve(item, points = 1) {
  if (item.quality === MAX_QUALITY) return;
  item.quality = Math.min(MAX_QUALITY, item.quality + points);
}

function updateItem(item) {
  const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
  if (isSulfuras) return;                             // nothing changes

  // daily sellIn decrease
  item.sell_in -= 1;

  switch (true) {
    case item.name === "Aged Brie":
      improve(item, item.sell_in < 0 ? 2 : 1);
      break;

    case item.name.startsWith("Backstage passes"):
      if (item.sell_in < 0) {
        item.quality = 0;
      } else if (item.sell_in < 5) {
        improve(item, 3);
      } else if (item.sell_in < 10) {
        improve(item, 2);
      } else {
        improve(item, 1);
      }
      break;

    case item.name.startsWith("Conjured"):
      degrade(item, item.sell_in < 0 ? 4 : 2);
      break;

    default:
      degrade(item, item.sell_in < 0 ? 2 : 1);
  }
}

function update_quality(items) {
  for (const item of items) {
    updateItem(item);
  }
  return items;
}

// expose for tests
module.exports = {
  Item,
  update_quality
};
