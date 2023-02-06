import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchCountries from './js/fetchCountries';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.search.addEventListener('input', debounce(onSearchCountries, 300));

function onSearchCountries() {
  const query = this.value.trim();
  this.value = query;

  if (query === '') {
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(query).then(renderCountries).catch(onFetchError);
}

function renderCountries(countries) {
  let markup = '';

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length === 1) {
    refs.countryList.innerHTML = '';

    const { flags, name, capital, population, languages } = countries[0];

    markup = `<div class="card">
      <img src="${flags.svg}" alt="${name.common}" width="70"/>
      <p class="countryname">${name.common}</p>
    </div>
    <div>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${languages
        .map(language => language.name)
        .join(', ')}</p>
    </div>`;

    refs.countryInfo.innerHTML = markup;

    return;
  }

  refs.countryInfo.innerHTML = '';

  markup = countries
    .map(
      ({ flags, name }) =>
        `<li class="item">
            <div class="card">
              <img src="${flags.svg}" alt="${name.common}" width="70"/>
              <p class="txt">${name.official}</p>
            </div>
          </li>\n`
    )
    .join('');

  refs.countryList.innerHTML = markup;
}

function onFetchError(error) {
  refs.countryInfo.innerHTML = refs.countryList.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
