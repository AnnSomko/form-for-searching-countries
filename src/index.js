import './css/styles.css';
import debounce from 'lodash.debounce';
//import Notiflix from 'notiflix';
import API from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;

let formInput = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');

formInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  let name = formInput.value;
  API.fetchCountries(name)
    .then(countries => renderCountryCard(countries))
    .catch(error => console.log(error));
}

function renderCountryCard(countries) {
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
