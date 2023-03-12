import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class myAPI {
  API_KEY = '34339864-0ee58b65a9ac9bce25a8041d2';
  page;
  query;

  searchParams = new URLSearchParams({
    per_page: 40,
    image_type: photo,
    orientation: 'horizontal',
    safesearch: true,
    client_id: this.API_KEY,
  });

  constructor() {
    this.page = 1;
    this.query = '';
  }

  async getImages() {
    const { data } = await axios.get(
      `?query=${this.query}&page=${this.page}&${this.searchParams}`
    );

    return data;
  }

  get page() {
    return this.page;
  }

  set page(newPage) {
    this.page = newPage;
  }

  updatePage() {
    this.page += 1;
  }

  set query(newQuery) {
    this.query = newQuery;
  }
}
