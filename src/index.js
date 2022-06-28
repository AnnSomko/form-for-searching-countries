import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import API from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;

let formInput = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');

formInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  let name = formInput.value;
  let trimmedName = name.trim();
  if (trimmedName) {
    API.fetchCountries(trimmedName)
      .then(countries => {
        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length <= 10 && countries.length >= 2) {
          renderCountries(countries);
          return;
        }
        if (countries.length == 1) {
          renderOneCountry(countries[0]);
        }
      })
      .catch(error =>
        Notify.failure('Oops, there is no country with that name')
      );
  } else {
    trimmedName = '';
    countryList.innerHTML = '';
  }
}

function renderCountries(countries) {
  let markup = countries
    .map(country => {
      return `
      <li>
        <li class="list_item"><img src="${country.flags.png}" width="30" height="20"></li> 
        <li class="list_item"><h2>${country.name}</h2></li>
      </li> `;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(country) {
  countryList.innerHTML = `
    <li>
      <li class="list_item"><img src="${country.flags.png}"></li>
      <li class="list_item"><h2>${country.name}</h2></li>
    </li>
    <li><b>Capital:</b> ${country.capital}</li>
    <li><b>Population:</b> ${country.population}</li>
    <li><b>Languages:</b> ${country.languages.map(lang => lang.name)}</li>
      `;
}
