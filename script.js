let items = [];
const itemList = document.querySelector('[data-type ="item-list"]');
const loadingCard = document.querySelector('[data-type="loading"]');

function showLoading() {
    loadingCard.style.display = 'flex';
}

function noneLoading() {
    loadingCard.style.display = 'none';
}

function createCardElement(item) {
    const template = document.querySelector('[data-type= "card-template"]');
    const cardClone = document.importNode(template.content, true);

    const itemTitle = cardClone.querySelector('[data-item-title]');
    const itemImage = cardClone.querySelector('[data-item-img]');
    itemImage.src = item.images;
    itemImage.onerror = function () {
        itemImage.src ='./27002.jpg';
    };

    const itemDescription = cardClone.querySelector('[data-item-description]');

    const cardCategory = cardClone.querySelector('[data-card-category]');
    const cardPrice = cardClone.querySelector('[data-card-price]');

    itemTitle.textContent = item.title;
    itemImage.src = item.images;
    const maxWord = 6;
    const words = item.description.split(' ');
    itemDescription.textContent = words.length > maxWord
        ? `${words.slice(0, maxWord).join(' ')}...`
        : item.description;
    cardCategory.textContent = item.category.name;
    cardPrice.textContent = `$ ${item.price}`;

    return cardClone;
}

function renderCards(container, gamesCards) {
    container.innerText = '';
    const fragment = document.createDocumentFragment();

    gamesCards.forEach((item) => {
        const cardElement = createCardElement(item);
        fragment.appendChild(cardElement);
    });

    container.appendChild(fragment);
}

async function fetchCards() {
    try {
        const apiUrl =  'https://api.escuelajs.co/api/v1/products';
        showLoading();

        const option = {
            method: 'GET',
        };

        const response = await fetch(apiUrl, option);
        items = await response.json();
        renderCards(itemList, items.slice(0, 52));
    } catch (err) {
        console.error(err, 'Get error:');
    } finally {
        noneLoading();
    }
}

document.addEventListener('DOMContentLoaded', fetchCards);
