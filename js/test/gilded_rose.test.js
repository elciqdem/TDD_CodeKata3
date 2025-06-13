const { Item } = require("../src/item");
const { items, update_quality } = require("../src/gilded_rose");

function executeDay(startItem) {
  items.length = 0;      // reset inventory
  items.push(startItem);
  update_quality();
  return items[0];
}

describe("Gilded Rose rules", () => {
  test("standard item quality and sell in drop by one", () => {
    const result = executeDay(new Item("+5 Dexterity Vest", 10, 20));
    expect(result.sell_in).toBe(9);
    expect(result.quality).toBe(19);
  });

  test("quality never negative", () => {
    const result = executeDay(new Item("Elixir of the Mongoose", 5, 0));
    expect(result.quality).toBe(0);
  });

  test("aged brie increases in quality", () => {
    const result = executeDay(new Item("Aged Brie", 2, 0));
    expect(result.quality).toBe(1);
  });

  test("quality never above fifty", () => {
    const result = executeDay(new Item("Aged Brie", 2, 50));
    expect(result.quality).toBe(50);
  });

  test("sulfuras never sold or degrades", () => {
    const result = executeDay(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    expect(result.sell_in).toBe(0);
    expect(result.quality).toBe(80);
  });

  test("backstage passes increase correctly then drop to zero after concert", () => {
    // 11 days left
    let pass = executeDay(new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20));
    expect(pass.quality).toBe(21);
    // 10 days left
    pass = executeDay(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    expect(pass.quality).toBe(22);
    // 5 days left
    pass = executeDay(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
    expect(pass.quality).toBe(23);
    // concert over
    pass = executeDay(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    expect(pass.quality).toBe(0);
  });

  test("conjured items degrade twice as fast", () => {
    const result = executeDay(new Item("Conjured Mana Cake", 3, 6));
    expect(result.quality).toBe(4);
  });
});
