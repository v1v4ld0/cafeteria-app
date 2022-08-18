import itens from "./model/dataset.js";
import foods from './model/food.js';

function loadFoods() {
  if (localStorage.getItem('foods-app:loaded') !== 'ok') {
    foods.load(itens);
    localStorage.setItem('foods-app:loaded', 'ok');
  }

  for (const food of foods.readAll()) {
    createFoodCard(food);
  }
};

function createFoodCard(food) {
  let foodCard = `<div class="col-4">
        <div class="card" style="width: 18rem;">
            <img src="${food.imagem}" class="card-img-top" alt="${food.nome}">
            <div class="card-body">
                <h5 class="card-title">${food.nome}</h5>
                <p class="card-text">
                    ${food.descricao}
                </p>
            </div>
        </div>
    </div>`;
    let cardDeck = document.querySelector("#card-deck");
    cardDeck.insertAdjacentHTML("beforeend", foodCard);
}

function loadFormValues(titulo, nome, descri, preco, img) {
  const formLabel = document.querySelector('#exampleModalLabel');
  const nomeInput = document.querySelector('#nomeitem');
  const descriInput = document.querySelector('#descricaoitem');
  const precoInput = document.querySelector('#precoitem');
  const imagemInput = document.querySelector('#imagemitem'); 
  
  formLabel.innerHTML = titulo;
  nomeInput.value = nome;
  descriInput.value = descri;
  precoInput.value = preco;
  imagemInput.value = img;  
}

function loadFormCreateFood() {
  const formFood = document.querySelector('#foodForm');

  loadFormValues('Nova Comida', '', '', '', '');

  formFood.onsubmit = (e) => {
    e.preventDefault();

    let food = Object.fromEntries(new FormData(formFood));

    const newFood = foods.create(food);

    createFoodCard(newFood);

    $('#foodModal').modal('toggle');

    document.querySelector('#addFoodButton').blur();
  };
}

window.loadFormCreateFood = loadFormCreateFood;

loadFoods();


