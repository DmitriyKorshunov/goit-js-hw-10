import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};
console.log(refs.searchBox);
console.log(refs.countryList);
console.log(refs.countryInfo);

//http делает запрос

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
//Разметка карточки
function countryCardTeemplate({ flags, name, capital, population, languages }) {
  return `
    <div class="country-info__container">
      <div class="country-info__wrapper">
        <img class="country-info__flags" src="${flags.svg}" alt="${
    name.official
  }" width="50" />
        <h2 class="country-info__name">${name.official}</h2>
      </div>
      <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
      <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
      <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
        languages
      )}</p>
    </div>
  `;
}
