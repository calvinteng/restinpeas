const Recipe = require('./models/recipe');

function dummyData() {
  Recipe.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

  const recipe1 = new Recipe({
    author: "calvin teng",
    title: "cereal",
    ingredients: ["milk", "cereal"],
    description: "it's cereal",
    servings: 1,
    directions: "pour cereal, then milk"
  });

    Recipe.create(recipe1, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}

module.exports = {dummyData}