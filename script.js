const DASHBOARD_TITLES = [...document.querySelectorAll(".dashboard__title")],
  DASHBOARD_CURRENT_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data"),
  ],
  DASHBOARD_PREVIOUS_TIME_ELEMENT = [
    ...document.querySelectorAll(".dashboard__data-info"),
  ];

const fetchData = function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderData(data);
    });
};

const renderData = (data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    DASHBOARD_TITLES[i].textContent = data[i].title;
    if (data[i].title === "Work") {
      console.log(data[i].timeframes.daily.current);
      DASHBOARD_CURRENT_TIME_ELEMENT[i].textContent =
        data[i].timeframes.daily.current;
    }
    // daily weekly monthly - by adding and removing toggling ? active class added by css depending which info should be displayed

    data.forEach((dataObject, index) => {
      DASHBOARD_CURRENT_TIME_ELEMENT[index].textContent =
        dataObject.timeframes.daily.current;
      DASHBOARD_PREVIOUS_TIME_ELEMENT[index].textContent =
        dataObject.timeframes.daily.previous;

      //   console.log(index);
    });
  }
};
const init = function () {
  fetchData();
};
init();
