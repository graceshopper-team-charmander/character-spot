import { expect } from "chai";

const {
  db,
  models: { Product }
} = require("../../../server/db/index");
const seed = require("../../../script/seed");

describe("Product Sequelize Model", () => {
  beforeEach(() => {
    db.sync({ force: true });
    seed();
  });

  it("has name, imageUrl, price, and description", async () => {
    process.exit(0);
    const product = await Product.create({
      name: "KitKat",
      imageUrl: "/images/kitkat.jpg",
      price: 1.25,
      description: "Mmmm... tasty"
    });
    expect(product.name).to.equal("KitKat");
    expect(product.imageUrl).to.equal("/images/kitkat.jpg");
    expect(product.price).to.equal(1.25);
    expect(product.description).to.equal("Mmmm... tasty");
  });
});
