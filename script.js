const MENU_LIST = document.querySelector(".menu__list"),
  DASHBOARD_TITLES_ELEMENT = [
    ...document.querySelectorAll(".dashboard__title"),
  ],
  DASHBOARD_CURRENT_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data"),
  ],
  DASHBOARD_PREVIOUS_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data-info"),
  ],
  DASHBOARD_CONTENT_ELEMENT = document.querySelector("main.dashboard");
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

const showArticleExtraInfo = function (event) {
  if (event.target.tagName.toLowerCase() === "img") {
    const sectionActionButtons = [
      ...DASHBOARD_CONTENT_ELEMENT.querySelectorAll(".dashboard__action-img"),
    ];
    const sectionIndex = sectionActionButtons.indexOf(event.target);
    const parentElement =
      sectionActionButtons[sectionIndex].parentElement.parentElement;
    const container = parentElement.querySelector(".dashboard__extra-info");
    if (!container) {
      createArticleExtraInfoChildren(parentElement, sectionIndex);
    }
  }
};
const createArticleExtraInfoChildren = function (parent, sectionIndex) {
  const container = document.createElement("div");
  const articleBackground = document.createElement("div");
  const hideButtonContainer = document.createElement("div");
  const hideLine1 = document.createElement("span");
  const hideLine2 = document.createElement("span");

  container.classList.add("dashboard__extra-info");
  container.textContent = "Some additionial text";
  articleBackground.classList.add("article-background");
  hideButtonContainer.classList.add("hide-button-container");
  hideLine1.classList.add("hide-line1");
  hideLine2.classList.add("hide-line2");
  hideButtonContainer.appendChild(hideLine1);
  hideButtonContainer.appendChild(hideLine2);

  if (sectionIndex === 0) {
    container.style.backgroundColor = "hsl(15, 100%, 70%)";
  } else if (sectionIndex === 1) {
    container.style.backgroundColor = "hsl(195,  74%, 62%)";
  } else if (sectionIndex === 2) {
    container.style.backgroundColor = "hsl(348,  100%, 68%)";
  } else if (sectionIndex === 3) {
    container.style.backgroundColor = "hsl(145,  58%, 55%)";
  } else if (sectionIndex === 4) {
    container.style.backgroundColor = "hsl(264,  64%, 52%)";
  } else if (sectionIndex === 5) {
    container.style.backgroundColor = "hsl(43,  84%, 65%)";
  }

  parent.append(container, articleBackground, hideButtonContainer);
  hideButtonContainer.addEventListener("click", () => {
    removeArticleExtraInfoChildren(
      parent,
      container,
      articleBackground,
      hideButtonContainer
    );
  });
};
const removeArticleExtraInfoChildren = function (
  parent,
  container,
  articleBackground,
  hideButtonContainer
) {
  parent.removeChild(container);
  parent.removeChild(articleBackground);
  parent.removeChild(hideButtonContainer);
};
const init = function () {
  fetchData();
};
init();
MENU_LIST.addEventListener("click", changeData);
DASHBOARD_CONTENT_ELEMENT.addEventListener("click", showArticleExtraInfo);
