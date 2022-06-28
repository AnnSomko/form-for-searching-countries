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
  API.fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

        return;
      }
      if (countries.length > 1) {
        renderCountries((countries.length = 10));
        return;
      }
      if (countries.length == 1) {
        renderCountry(countries[0]);
      }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `
      <li class="list_item"><img src="${country.flags.png}" width="30" height="20"></li>
      <li class="list_item"><h2>${country.name}</h2></li>
        `;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `
    <li class="list_item"><img src="${country.flags.png}" width="30" height="20"></li>
    <li class="list_item"><h2>${country.name}</h2></li>
        <li><b>Capital:</b> ${country.capital}</li>
        <li><b>Population:</b> ${country.population}</li>
        <li><b>Languages:</b> ${country.languages[0].name}</li>
      `;
    })
    .join('');
  countryList.innerHTML = markup;
}

//.filter(el => el.name <= 10)
