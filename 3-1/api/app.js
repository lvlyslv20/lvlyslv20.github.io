const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));


window.addEventListener('DOMContentLoaded', () => init());

allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}


searchForm.addEventListener('submit', getInputValue);


const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/1142444040055028/search/${searchText}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
         
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
});

const showSuperheroDetails = (data) => {
    if (data && data[0] && data[0].image) {
        document.querySelector('.app-body-content-thumbnail').innerHTML = `
            <img src="${data[0].image.url}">
        `;
    }

    document.querySelector('.name').textContent = data[0].name;

    if (data && data[0] && data[0].powerstats) {
        document.querySelector('.powerstats').innerHTML = `
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>intelligence</span>
                </div>
                <span>${data[0].powerstats.intelligence}</span>
            </li>
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>strength</span>
                </div>
                <span>${data[0].powerstats.strength}</span>
            </li>
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>speed</span>
                </div>
                <span>${data[0].powerstats.speed}</span>
            </li>
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>durability</span>
                </div>
                <span>${data[0].powerstats.durability}</span>
            </li>
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>power</span>
                </div>
                <span>${data[0].powerstats.power}</span>
            </li>
            <li>
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>combat</span>
                </div>
                <span>${data[0].powerstats.combat}</span>
            </li>
        `;
    }

    if (data && data[0] && data[0].biography) {
        document.querySelector('.biography').innerHTML = `
            <li>
                <span>full name:</span>
                <span>${data[0].biography['full-name']}</span>
            </li>
            <li>
                <span>alert-egos:</span>
                <span>${data[0].biography['alter-egos']}</span>
            </li>
            <li>
                <span>aliases:</span>
                <span>${data[0].biography['aliases']}</span>
            </li>
            <li>
                <span>place-of-birth:</span>
                <span>${data[0].biography['place-of-birth']}</span>
            </li>
            <li>
                <span>first-apperance:</span>
                <span>${data[0].biography['first-appearance']}</span>
            </li>
            <li>
                <span>publisher:</span>
                <span>${data[0].biography['publisher']}</span>
            </li>
        `;
    }
};

const fox_btn = document.getElementById('fox_btn');

const fox_result = document.getElementById('fox_result');

fox_btn.addEventListener('click', getRandomFox);


function getRandomFox() {
	fetch('https://meme-api.com/gimme/wholesomememes')
		.then(res => res.json())
		.then(data => {
            if(data.url.includes('.gif','.jpg','.png')) {
				getRandomFox();
			}
			else {
			fox_result.innerHTML = `<img src=${data.url} alt="fox" />`
            }
		});
}

getRandomFox();

