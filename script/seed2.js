"use strict";

const {
  db,
  models: { User, Product, Cart, ProductCategory }
} = require("../server/db");
/** creating fake data */
const faker = require("faker");
const Order = require("../server/db/models/Order");
const {
  marioProducts,
  dbzProducts,
  pokemonProducts,
  kirbyProducts,
  hunterProducts,
  finalFantasyProducts,
  sailorMoonProducts
} = require("./productsSeed");
const dbpg = require("../server/db/dbpg");
const { customUsers } = require("./usersSeed");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  //Create Users
  const [cody, murphy, alexandra, nicole, amaya] = await User.bulkCreate(customUsers);
  const users = [cody, murphy, alexandra, nicole, amaya];

  //Create Categories
  const categories = [
    { name: "anime" },
    { name: "Nintendo" },
    { name: "Mario" },
    { name: "Dragonball Z" },
    { name: "Pokemon" },
    { name: "Kirby" },
    { name: "Hunter x Hunter" },
    { name: "Final Fantasy" },
    { name: "Sailor Moon" }
  ];
  const [
    animeCat,
    nintendoCat,
    marioCat,
    dragonballZCat,
    pokemonCat,
    kirbyCat,
    hunterXHunterCat,
    finalFantasyCat,
    sailorMoonCat
  ] = await ProductCategory.bulkCreate(categories);

  //Create Orders
  const createdFakeOrders = [];
  for (let i = 0; i < users.length; i++) {
    const order = await Order.create({ status: "PENDING" });
    createdFakeOrders.push(order);
    await order.setUser(users[i]);
  }

  //Create Products
  const mario = await Product.bulkCreate(marioProducts);
  const dbz = await Product.bulkCreate(dbzProducts);
  const pokemon = await Product.bulkCreate(pokemonProducts);
  const kirby = await Product.bulkCreate(kirbyProducts);
  const hunter = await Product.bulkCreate(hunterProducts);
  const final = await Product.bulkCreate(finalFantasyProducts);
  const sailor = await Product.bulkCreate(sailorMoonProducts);

  //Product Category Associations
  for (let i = 0; i < mario.length; i++) {
    const marioProduct = mario[i];
    await marioProduct.setCategories([marioCat, nintendoCat]);
  }

  for (let i = 0; i < dbz.length; i++) {
    const dbzProduct = dbz[i];
    await dbzProduct.setCategories([dragonballZCat, animeCat]);
  }

  for (let i = 0; i < pokemon.length; i++) {
    const pokemonProduct = pokemon[i];
    await pokemonProduct.setCategories([pokemonCat, nintendoCat]);
  }

  for (let i = 0; i < kirby.length; i++) {
    const kirbyProduct = kirby[i];
    await kirbyProduct.setCategories([kirbyCat, nintendoCat]);
  }

  for (let i = 0; i < hunter.length; i++) {
    const hunterProduct = hunter[i];
    await hunterProduct.setCategories([hunterXHunterCat, animeCat]);
  }

  for (let i = 0; i < final.length; i++) {
    const finalProduct = final[i];
    await finalProduct.setCategories([finalFantasyCat]);
  }

  for (let i = 0; i < sailor.length; i++) {
    const sailorProduct = sailor[i];
    await sailorProduct.setCategories([sailorMoonCat, animeCat]);
  }

  // Set Products on Users
  const codyOrder = await cody.getOrders();
  await codyOrder[0].setProducts([mario[0], mario[4]]);

  const murphyOrder = await murphy.getOrders();
  await murphyOrder[0].setProducts([dbz[2]]);

  const alexandraOrder = await alexandra.getOrders();
  await alexandraOrder[0].setProducts([sailor[1], kirby[0]]);

  const nicoleOrder = await nicole.getOrders();
  await nicoleOrder[0].setProducts([hunter[0], pokemon[4]]);

  const amayaOrder = await amaya.getOrders();
  await amayaOrder[0].setProducts([final[0], pokemon[5]]);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
    // await dbpg.query("CREATE EXTENSION pg_trgm");
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
