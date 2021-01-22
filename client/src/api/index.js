import axios from 'axios';

const url = 'https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;population;area;flag;region;subregion';

export const fetchCountry = () => axios.get(url);