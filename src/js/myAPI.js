import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34339864-0ee58b65a9ac9bce25a8041d2';

export class myAPI {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getImages() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    try {
      const {
        data: { hits, totalHits },
      } = await axios.get(BASE_URL, { searchParams });

      return { hits, totalHits };
    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
//
