import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refselements';
import { fetchCountries } from './js/fetchCountries';
import { countryCardTeemplate, countryListTempate } from './js/teemplate';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry() {
  const countryName = refs.searchBox.value;
  clearDataInput();
  if (countryName === '') {
    return;
  }

  fetchCountries(countryName.trim())
    .then(countrys => {
      console.log(countrys);
      if (countrys.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countrys.length <= 10) {
        const listMarkup = countrys.map(country => countryListTempate(country));
        refs.countryInfo.innerHTML = listMarkup.join('');
      }

      if (countrys.length === 1) {
        const markup = countrys.map(country => countryCardTeemplate(country));
        refs.countryInfo.innerHTML = markup.join('');
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');

      return error;
    });
}

function clearDataInput() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
