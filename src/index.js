import './css/styles.css';

import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const _ = require('lodash');
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const searchBox = document.querySelector('#search-box');

function fetchCountries() {
    
    fetchedCountries = 'https://restcountries.com/v3.1/name/' + searchBox.value.trim() + '?fields=name,capital,population,flags,languages';
    return fetch(fetchedCountries).then((response) =>{
        if(!response.ok) {
            throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
        }
        return response.json();   
    }) 
}

function renderCountries(countries) {
    const markup = countries
    .map(({name, capital, population, flags, languages}) => {
        if (countries.length ===  1) {   
        return `<li>
        <h2 class="country-name"><img class="flag-svg" src=${flags.svg} width=45; height=35 />  ${name.official}</h2>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(countries[0].languages)}</p>
        </li>`;
        }

        else if (countries.length > 1 && countries.length <= 10){
        return `<li>
        <h2 class="country-name"><img class="flag-svg" src=${flags.svg} width=45; height=35 />  ${name.official}</h2>
        </li>`;
        }
        else {
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }        
    })
    .join("");
    countryList.innerHTML = markup;
    console.log(countries);
}

searchBox.addEventListener('input', _.debounce(() => {
    fetchCountries()
    .then((countries) => renderCountries(countries))
    .catch((error) => console.log(error));
}, DEBOUNCE_DELAY))
