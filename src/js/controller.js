import * as model from './model.js';
import recipeView from './views/reciepeView.js';

import 'core-js/stable'; // Polyfiling everything else
import 'regenerator-runtime/runtime'; // Polyfiling async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// API fetch to call reciepes
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe on front-end
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
