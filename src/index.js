import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const API_KEY = 'live_u32GosH3z96t27To0vi83OFNB6w58fS7IkjhSBAK7LN7pTgvLyAXIDwQCGgyaWbP';

axios.defaults.headers.common["x-api-key"] = API_KEY;

const refs = {
    select: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    catInfo: document.querySelector(".cat-info"),
};

hideSelector();
fetchBreeds().then(breeds => {
    renderBreedsSelectMarkup(breeds);
    hideLoader();
    hideSelector();
}).catch(error => console.log(error));

refs.select.addEventListener("change", onChange);

function onChange() {
    hideLoader();

    fetchCatByBreed(refs.select.value).then(breed => {
        renderCatInfoMarkup(breed);
        hideLoader();
    }).catch(error => {
        console.log(error);
        hideLoader();
        clearCatInfo();
        showError();
    });
}

function renderBreedsSelectMarkup(breeds) {
    const markup = breeds.map(({id, name}) => {
        return `<option value="${id}">${name}</option>`;
    }).join();

    refs.select.innerHTML = markup;

    const slimSelect = new SlimSelect({
        select: '#breed-select'
    });
}

function renderCatInfoMarkup([breed]) {
    const {url, breeds: [{name, description, temperament}]} = breed;
    const markup =  `<img src="${url}">
    <div>
    <h1>${name}</h1>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
    </div>`;

    refs.catInfo.innerHTML = markup;
}

function hideLoader() {
    refs.loader.hidden = !refs.loader.hidden;
}

function hideSelector() {
    refs.select.hidden = !refs.select.hidden;
}

function showError() {
    Notiflix.Report.failure('Error', 'Oops! Something went wrong! Try reloading the page!');
}

function clearCatInfo() {
    refs.catInfo.innerHTML = '';
}