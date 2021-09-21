'use strict'

const {db, models: {User, Product} } = require('../server/db')
/** creating fake data */
const faker = require('faker')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  //Create Fake Users
  const fakeUsers = []
  for(let i = 0; i < 20; i++){
    fakeUsers.push( {
      username: faker.internet.email(),
      password: faker.internet.password()
    })
  }
  fakeUsers.forEach( async (user) => await User.create(user))

  //Create Fake Products
  const fakeProducts = []
  for(let i = 0; i < 20; i++){
    fakeProducts.push( {
      name: faker.random.word(),
      imageUrl: faker.image.food(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price()
    })
  }
  fakeProducts.forEach( async (product) => await Product.create(product))

  // Original Code: Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  }
 catch (err) {
    console.error(err)
    process.exitCode = 1
  }
 finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
