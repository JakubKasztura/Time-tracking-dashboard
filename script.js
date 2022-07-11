const MENU_LIST = document.querySelector(".menu__list"),
  DASHBOARD_TITLES_ELEMENT = [
    ...document.querySelectorAll(".dashboard__title"),
  ],
  DASHBOARD_CURRENT_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data"),
  ],
  DASHBOARD_PREVIOUS_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data-info"),
  ];
let dataObj = [];

const changeData = function (event) {
  if (event.target.tagName.toLowerCase() == "li") {
    const menuItems = [...MENU_LIST.querySelectorAll(".menu__list-item")];
    const itemIndex = menuItems.indexOf(event.target);
    console.log(itemIndex);

    if (itemIndex === 0) {
      menuItems[0].classList.add("menu__list-item_active");
      menuItems[1].classList.remove("menu__list-item_active");
      menuItems[2].classList.remove("menu__list-item_active");
      renderData("Day", "daily");
    } else if (itemIndex === 1) {
      menuItems[0].classList.remove("menu__list-item_active");
      menuItems[1].classList.add("menu__list-item_active");
      menuItems[2].classList.remove("menu__list-item_active");
      renderData("Week", "weekly");
    } else if (itemIndex === 2) {
      menuItems[0].classList.remove("menu__list-item_active");
      menuItems[1].classList.remove("menu__list-item_active");
      menuItems[2].classList.add("menu__list-item_active");
      renderData("Month", "monthly");
    }
  }
};

const fetchData = function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getData(data);
    });
};

const getData = (data) => {
  console.log(data);
  dataObj = [...data];
  setTitles(dataObj);
  renderData("Day", "daily");
};
const setTitles = function (data) {
  for (let i = 0; i < data.length; i++) {
    DASHBOARD_TITLES_ELEMENT[i].textContent = data[i].title;
  }
};
const renderData = function (periodInfo, period) {
  for (let i = 0; i < dataObj.length; i++) {
    dataObj.forEach((dataObject, index) => {
      DASHBOARD_CURRENT_TIME_ELEMENT[
        index
      ].textContent = `${dataObject.timeframes[period].current}hrs`;
      DASHBOARD_PREVIOUS_TIME_ELEMENT[
        index
      ].textContent = `Last ${periodInfo} - ${dataObject.timeframes[period].previous}hrs`;
    });
  }
};
const init = function () {
  fetchData();
};
init();
MENU_LIST.addEventListener("click", changeData);
