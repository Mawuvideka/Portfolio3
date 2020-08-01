/** @format */

const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentE1 = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionE1 = document.getElementById("question");
const answerE1 = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// keep track of the current card
let currentActiveCard = 0;

// store DOM cards in an array
const cardsE1 = [];

// store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `<div class="inner-card"><div class="inner-card-front"><p>${data.question}</p></div><div class="inner-card-back"><p>${data.answer}</p></div></div>`;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //add to DOM cards
  cardsE1.push(card);

  cardsContainer.appendChild(card);
  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentE1.innerText = `${currentActiveCard + 1}/${cardsE1.length}`;
}

// fetch cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// event listeners

// next button
nextBtn.addEventListener("click", () => {
  cardsE1[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsE1.length - 1) {
    currentActiveCard = cardsE1.length - 1;
  }

  cardsE1[currentActiveCard].className = "card active";
  updateCurrentText();
});

// prev button
prevBtn.addEventListener("click", () => {
  cardsE1[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsE1[currentActiveCard].className = "card active";
  updateCurrentText();
});

// show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionE1.value;
  const answer = answerE1.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionE1.value = "";
    answerE1.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
