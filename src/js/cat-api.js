const BASE_URL = 'https://api.thecatapi.com/v1';

const API_KEY = 'live_u32GosH3z96t27To0vi83OFNB6w58fS7IkjhSBAK7LN7pTgvLyAXIDwQCGgyaWbP';

function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds`).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
}

function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId,
        api_key: API_KEY,
    });

    return fetch(`${BASE_URL}/images/search?${params}`).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
}

export {fetchBreeds, fetchCatByBreed};