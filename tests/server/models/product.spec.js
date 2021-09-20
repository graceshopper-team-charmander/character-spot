import { expect } from "chai";

const {
  db,
  models: { Product }
} = require("../../../server/db/index");
// const seed = require("../../../script/seed");

describe("Product Sequelize Model", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    // seed();
  });

  it("has name, imageUrl, price, and description", async () => {
    const product = await Product.create({
      name: "KitKat",
      imageUrl: "/images/kitkat.jpg",
      price: 1.25,
      description: "Mmmm... tasty"
    });
    expect(product.name).to.equal("KitKat");
    expect(product.imageUrl).to.equal("/images/kitkat.jpg");
    expect(parseFloat(product.price)).to.equal(1.25);
    expect(product.description).to.equal("Mmmm... tasty");
  });

  it("name and price cannot be null", async () => {
    const product = await Product.build();
    try {
      await product.validate();
      throw Error("validation should have failed -- name and price cannot be null");
    } catch (err) {
      expect(err.message).to.contain("name cannot be null");
      expect(err.message).to.contain("price cannot be null");
    }
  });
  it("image should have a default value", async () => {
    const product = await Product.build({
      name: "KitKat",
      price: 1.25,
      description: "Mmmm... tasty"
    });
    await product.validate();
      expect(product.imageUrl).to.be.a("string");
      expect(product.imageUrl.length).to.be.greaterThan(1);
  });
});
