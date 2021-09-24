"use strict";

const {
  db,
  models: { User, Product, Cart, ProductCategory }
} = require("../server/db");
/** creating fake data */
const faker = require("faker");
const Order = require("../server/db/models/Order");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  let amtOfFakeData = 22;
  //Create Fake Users
  const fakeUsers = [];
  for (let i = 0; i < amtOfFakeData; i++) {
    fakeUsers.push({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password()
    });
  }

  const createdFakeUsers = await Promise.all(fakeUsers.map((user) => User.create(user)));

  //Create Fake Categories
  const categories = Array(10).fill('').map(item => ProductCategory.create({
    name: faker.random.word()
  }));

  await Promise.all(categories);

  const createdFakeOrders = [];

  for (let i = 0; i < createdFakeUsers.length; i++) {
    const order = await Order.create({ status: "PENDING" });
    createdFakeOrders.push(order);
    await order.setUser(createdFakeUsers[i]);
  }

  //Create Fake Products
  const fakeProducts = [];
  for (let i = 0; i < amtOfFakeData; i++) {
    fakeProducts.push({
      name: faker.random.word(),
      imageUrl: faker.image.food(),
      description: faker.lorem.sentence(),
      price: faker.datatype.number(),
      quantity: faker.datatype.number()
    });
  }
  const createdFakeProducts = await Promise.all(
    fakeProducts.map((product) => Product.create(product))
  );

  createdFakeProducts.forEach(product => {
    product.addCategory(Math.floor(Math.random() * 10) + 1);
  });

  //Map Products to Users
  createdFakeOrders[0].addProduct(createdFakeProducts[0]);
  createdFakeOrders[0].addProduct(createdFakeProducts[1]);
  createdFakeOrders[0].addProduct(createdFakeProducts[2]);
  createdFakeOrders[0].addProduct(createdFakeProducts[3]);
  createdFakeOrders[21].addProduct(createdFakeProducts[0]);

  // Original Code: Creating Users
  const users = await Promise.all([
    User.create({
      email: "cody@charm.com",
      firstName: "Cody",
      lastName: "Turtle",
      password: "123"
    }),
    User.create({
      email: "murphy@charm.com",
      firstName: "Murphy",
      lastName: "Law",
      password: "123"
    })
  ]);

  const cody = users[0];
  const order = await Order.create({ status: "PENDING" });
  await order.setUser(cody);
  await order.addProduct(createdFakeProducts[0]);

  await Product.create({
    name: "Luigi",
    imageUrl: "https://live.staticflickr.com/65535/51509441876_dbc8c6d5bd_o.png",
    description: "An Italian plumber's brother. Makes better spaghetti.",
    price: 9999,
    quantity: 1
  });

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
