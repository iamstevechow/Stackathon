'use strict';

const db = require('../server/db');
const {
  User,
  Ingredient,
  Fridge,
  Recipe,
  SavedRecipe
} = require('../server/db/models');

const recipes = require('./recipes/recipeSeed');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({ email: 'steve@steve.com', password: '123' })
  ]);
  console.log(`seeded ${users.length} users`);

  await Promise.all(await Recipe.bulkCreate(recipes));
  console.log(`seeded ${recipes.length} recipes`);

  const ingredients = await Promise.all([
    Ingredient.create({
      name: 'chicken',
      image:
        'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1495472730%2FGettyImages-182184170.jpg%3Fitok%3Dl2saM5zn&w=700&q=85',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'beef',
      image:
        'https://previews.123rf.com/images/magone/magone1511/magone151100055/49170157-fresh-raw-beef-steak-isolated-on-white-background-top-view.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'fish',
      image:
        'https://static1.squarespace.com/static/56edee0f9f7266dd860d7fc2/t/58a937065016e11d7e579f76/1487484702789/?format=750w',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'pork',
      image:
        'https://previews.123rf.com/images/olgna/olgna1409/olgna140900931/31592706-two-raw-pork-chops-on-white-background.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'onion',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/815kv1Ns16L._SY355_.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'pepper',
      image:
        'https://cimg3.ibsrv.net/cimg/www.fitday.com/693x350_85-1/635/green-20pepper-20bell_000016163311_Small-106635.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'broccoli',
      image:
        'https://www.cookforyourlife.org/wp-content/uploads/2015/08/shutterstock_294838064-min.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'tomato',
      image:
        'https://www.sciencedaily.com/images/2017/07/170713153023_1_540x360.jpg',
      expiration: '3'
    })
  ]);
  console.log(`seeded ${ingredients.length} ingredients`);
  const fridges = await Promise.all([
    Fridge.create({
      expirationDate: new Date(),
      userId: 3,
      ingredientId: 1,
      quantity: 2
    }),
    Fridge.create({
      expirationDate: new Date(),
      userId: 3,
      ingredientId: 2,
      quantity: 3
    })
  ]);
  console.log(`seeded ${fridges.length} fridge items`);
  const savedRecipes = await Promise.all([
    SavedRecipe.create({
      userId: 3,
      recipeId: 1
    }),
    SavedRecipe.create({
      userId: 3,
      recipeId: 2
    }),
    SavedRecipe.create({
      userId: 3,
      recipeId: 3
    })
  ]);
  console.log(`seeded ${savedRecipes.length} saved recipes`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
