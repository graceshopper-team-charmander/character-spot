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
  // mario.forEach((product) => {
  //   product.setCategories([marioCat, nintendoCat]);
  // });

  // dbz.forEach((product) => {
  //   product.setCategories([dragonballZCat, animeCat]);
  // });

  // pokemon.forEach((product) => {
  //   product.setCategories([pokemonCat, nintendoCat]);
  // });

  // kirby.forEach((product) => {
  //   product.setCategories([kirbyCat, nintendoCat]);
  // });

  // hunter.forEach((product) => {
  //   product.setCategories([hunterXHunterCat, animeCat]);
  // });

  // final.forEach((product) => {
  //   product.setCategories([finalFantasyCat]);
  // });

  // sailor.forEach((product) => {
  //   product.setCategories([sailorMoonCat, animeCat]);
  // });

  //Set Products on Users
  // cody.setProducts(mario[0], mario[4]);
  // murphy.setProducts(dbz[2]);
  // alexandra.setProducts(sailor[1], kirby[0]);
  // nicole.setProducts(hunter[0], pokemon[4]);
  // amaya.setProducts(final[0]);

  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  };
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
