const { Item } = require("../src/item");
const { items, update_quality } = require("../src/gilded_rose");

describe("Gilded Rose kata", () => {
  it("foo sample test from starter should fail", () => {
    items.length = 0;                              // clear array
    items.push(new Item("foo", 0, 0));
    update_quality();
    expect(items[0].name).toEqual("fixme");        // guaranteed to fail
  });
});
