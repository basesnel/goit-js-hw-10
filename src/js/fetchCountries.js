function fetchCountries(name) {
  // const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default fetchCountries;
