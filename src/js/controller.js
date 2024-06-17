import * as model from './model.js';
import recipeView from './views/reciepeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import PaginationView from './views/paginationView.js';

import 'core-js/stable'; // Polyfiling everything else
import 'regenerator-runtime/runtime'; // Polyfiling async/await
import paginationView from './views/paginationView.js';

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goTOPage) {
  resultsView.render(model.getSearchResultsPage(goTOPage));

  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
