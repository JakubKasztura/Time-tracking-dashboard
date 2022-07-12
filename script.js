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

const init = function () {
  fetchData();
};
const showArticleExtraInfo = function (event) {
  if (event.target.tagName.toLowerCase() === "img") {
    const sectionActionButtons = [
      ...DASHBOARD_CONTENT_ELEMENT.querySelectorAll(".dashboard__action-img"),
    ];
    const sectionIndex = sectionActionButtons.indexOf(event.target);
    const parentElement =
      sectionActionButtons[sectionIndex].parentElement.parentElement;
    // console.log(parentElement);

    const container = parentElement.querySelector(".dashboard__extra-info");
    const articleBackground = parentElement.querySelector(
      ".article-background"
    );
    if (!container) {
      createArticleExtraInfoChild(parentElement, sectionIndex);
    } else {
      removeArticleExtraInfoChild(parentElement, container, articleBackground);
    }
  }
};
const createArticleExtraInfoChild = function (parent, sectionIndex) {
  const container = document.createElement("div");
  container.classList.add("dashboard__extra-info");
  container.textContent = "Some additionial text";
  const articleBackground = document.createElement("div");
  articleBackground.classList.add("article-background");
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

  parent.append(container, articleBackground);
};
const removeArticleExtraInfoChild = function (
  parent,
  container,
  articleBackground
) {
  parent.removeChild(container);
  parent.removeChild(articleBackground);
};
init();
MENU_LIST.addEventListener("click", changeData);
DASHBOARD_CONTENT_ELEMENT.addEventListener("click", showArticleExtraInfo);
