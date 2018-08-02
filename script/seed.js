'use strict';

const db = require('../server/db');
const { User, Ingredient, Fridge, Recipe } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({ email: 'steve@steve.com', password: '123' })
  ]);
  console.log(`seeded ${users.length} users`);
  const recipes = await Promise.all([
    Recipe.create({
      name: 'recipe one',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdn5X7GmXAvcPEbNsgQ2VPq_JU-B4AgrbP_GZovwa3UNJbQcWxpg',
      edamameId: 'one'
    }),
    Recipe.create({
      name: 'recipe two',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS40_uhQqsxXTTgX3V-N18ENFWml-ZTgx1zAhueNXlkTEK0eZeCLg',
      edamameId: 'two'
    }),
    Recipe.create({
      name: 'recipe three',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUhfxwbOFw4p0PnJ6r5qPHcc6EaRAXIoPJxGq4RHm9dnJe869DA',
      edamameId: 'three'
    })
  ]);
  console.log(`seeded ${recipes.length} users`);
  const ingredients = await Promise.all([
    Ingredient.create({
      name: 'chicken',
      image:
        'https://thumbs.dreamstime.com/b/roast-chicken-cartoon-drawing-isolated-white-38241272.jpg',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'beef',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'fish',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'pork',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'onion',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'pepper',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'broccoli',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    }),
    Ingredient.create({
      name: 'tomato',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQcrhq-PzEWSgzkPy8nDm4L2COY8TvATrMIwdnAH9FmRCO9atuw',
      expiration: '3'
    })
  ]);
  console.log(`seeded ${ingredients.length} users`);
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
  console.log(`seeded ${fridges.length} users`);
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
