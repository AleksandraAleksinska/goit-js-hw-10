export function fetchCountries() {
    
    const fetchedCountries = 'https://restcountries.com/v3.1/name/' + document.querySelector('#search-box').value.trim() + '?fields=name,capital,population,flags,languages';
    return fetch(fetchedCountries).then((response) =>{
        if(!response.ok) {
            throw new Error(error.status);
        }
        return response.json();   
    }) 
}