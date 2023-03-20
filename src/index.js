import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const _ = require('lodash');
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');
const body = document.querySelector('body');

searchBox.addEventListener('input', _.debounce(() => {
    fetchCountries()
    .then((countries) => renderCountries(countries))
    .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
}, DEBOUNCE_DELAY))


function renderCountries (countries) {
    
    if (countries.length === 1) {
        const divMarkup = countries
        .map(({capital, population, languages}) => {
            return `<p><b>Capital: </b>${capital}</p>
             <p><b>Population: </b>${population}</p>
             <p><b>Languages: </b>${Object.values(countries[0].languages)}</p>`
        })
        .join('');
        const liMarkup = countries
        .map(({name, flags}) => {
            return `<li>
            <h2 class="country-header"><img class="flag-svg" src=${flags.svg} width=45; height=35 />  ${name.official}</h2>
            </li>`
        })
        .join('');
        countryInfo.innerHTML = divMarkup;
        countryList.innerHTML = liMarkup;
        
    }
    else if (countries.length <= 10 && countries.length > 1) {
        const liMarkup = countries
        .map(({name, flags}) => {
            return `<li>
            <p class="country-name"><img class="flag-svg" src=${flags.svg} width=45; height=30 />  ${name.official}</p>
            </li>`
        })
        .join('');
        countryList.innerHTML = liMarkup;
        countryInfo.innerHTML = '';
    }
    else if (countries.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
            
    }
}


