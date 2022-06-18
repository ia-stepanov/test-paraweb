import './index.css';
import $ from "jquery";
import "slick-carousel";

import {
  cardTemplate,
  cardElement,
  authorFilter,
  inputHiddenFrom,
  inputHiddenTo,
  dateFilterFrom,
  dateFilterTo,
  month,
  authors,
  showInput,
  noName,
} from "../utils/constants.js";

let cardsList = [];
let selectedAuthor = showInput;
let selectedDate = {
  from: new Date().toISOString(),
  to: new Date().toISOString(),
};

fetch("https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc")
  .then((res) => res.json())
  .then(({ articles }) => {
    articles.forEach((card) => {
      card.author = card.author == undefined ? noName : card.author;
      authors.add(card.author);
      if (card.publishedAt < selectedDate.from) {
        selectedDate.from = card.publishedAt;
        dateFilterFrom.min = card.publishedAt;
        dateFilterTo.min = card.publishedAt;
      }
      if (card.publishedAt > selectedDate.to) {
        selectedDate.to = card.publishedAt;
        dateFilterFrom.max = card.publishedAt;
        dateFilterTo.max = card.publishedAt;
      }
      renderCard(card);
    });
    renderAuthorOptions(authors);
    cardsList = articles;
  })
  .catch((error) => console.log(error));

const getTemplate = () =>
  cardTemplate.content.querySelector(".card").cloneNode(true);

const setCardData = (card, { title, description, author, publishedAt }) => {
  const authorElement = card.querySelector(".card__badge-name");
  let date = new Date(publishedAt);

  date = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  card.querySelector(".card__title").innerText = title;
  card.querySelector(".card__text").innerText = description;
  card.querySelector(".card__date").innerText = date;

  authorElement.innerText = author;
  authorElement.addEventListener("click", handleClickAuthor);
};

const renderCard = (card) => {
  const cardTemplate = getTemplate();
  setCardData(cardTemplate, card);
  cardElement.appendChild(cardTemplate);
};

const renderAuthorOptions = (authors) => {
  Array.from(authors)
    .sort()
    .forEach((author) => {
      authorFilter.appendChild(createOption(author));
    });
  authorFilter.prepend(createOption(showInput));
  authorFilter.value = showInput;
};

const createOption = (author) => {
  const option = document.createElement("option");
  option.textContent = author;
  return option;
};

const filter = () => {
  let filteringCards = filterAuthor();
  filteringCards = filterDate(filteringCards);
  return filteringCards;
};

const filterAuthor = () => {
  let filteringCards = cardsList;
  cardElement.innerHTML = "";
  if (selectedAuthor !== showInput)
    filteringCards = cardsList.filter((card) => card.author === selectedAuthor);
  return filteringCards;
};

const filterDate = (cards) => {
  const filteringCards = cards.filter(
    (card) =>
      new Date(card.publishedAt) >= new Date(selectedDate.from) &&
      new Date(card.publishedAt) <= new Date(selectedDate.to)
  );
  return filteringCards;
};

const handleClickAuthor = (e) => {
  selectedAuthor = e.target.innerText;
  const filteringCards = filter();
  filteringCards.forEach((card) => renderCard(card));
  authorFilter.value = selectedAuthor;
};

const handleFilterAuthor = (e) => {
  selectedAuthor = e.target.value;
  const filteringCards = filter();
  filteringCards.forEach((card) => renderCard(card));
};

const handleFilterDate = (input) => {
  input.showPicker();
};

const handleFilterDateChange = (input, inputHidden, field) => {
  inputHidden.value = input.value;
  selectedDate[field] = new Date(input.value).toISOString();
  const filteringCards = filter();
  filteringCards.forEach((card) => renderCard(card));
};

authorFilter.addEventListener("change", handleFilterAuthor);
inputHiddenFrom.addEventListener("click", () =>
  handleFilterDate(dateFilterFrom)
);
inputHiddenTo.addEventListener("click", () => handleFilterDate(dateFilterTo));
dateFilterFrom.addEventListener("change", () =>
  handleFilterDateChange(dateFilterFrom, inputHiddenFrom, "from")
);
dateFilterTo.addEventListener("change", () =>
  handleFilterDateChange(dateFilterTo, inputHiddenTo, "to")
);

$(".carousel").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: true,
});
