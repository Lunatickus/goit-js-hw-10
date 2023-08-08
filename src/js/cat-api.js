const BASE_URL = 'https://api.thecatapi.com/v1';

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
    });

    return fetch(`${BASE_URL}/images/search?${params}`).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
}

function fetchCatInfoByBreed(breedId) {
    return fetch(`${BASE_URL}/breeds/${breedId}`).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
}

export {fetchBreeds, fetchCatByBreed, fetchCatInfoByBreed};