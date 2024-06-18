import View from './View';
import previewView from './previewView';

import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No reciepes found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView._generateMarkupPreview(result))
      .join('');
  }
}

export default new ResultsView();
