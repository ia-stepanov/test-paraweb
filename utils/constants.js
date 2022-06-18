const cardTemplate = document.querySelector("#card-template");
const cardElement = document.querySelector(".cards");

const authorFilter = document.querySelector(".sticky-filter__author");
const dateFilter = document.querySelector(".sticky-filter__date");
const inputHiddenFrom = dateFilter.querySelector("#input-hidden-from");
const inputHiddenTo = dateFilter.querySelector("#input-hidden-to");
const dateFilterFrom = dateFilter.querySelector(".input-hidden-from");
const dateFilterTo = dateFilter.querySelector(".input-hidden-to");

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const authors = new Set(null);
const showInput = "Выбор автора";
const noName = "no name";

export {
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
};
