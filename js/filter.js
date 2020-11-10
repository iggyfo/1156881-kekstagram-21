'use strict';
(() => {
  const imgFilter = document.querySelector(`.img-filters`);
  const filterBtns = document.querySelectorAll(`.img-filters__button`);
  const FILTER_BTN_ACTIVE_CLASS = `img-filters__button--active`;
  const NUM_RANDOM_PHOTO = 10;

  let primaryData = [];

  // Функция получает данные от сервера. При получении оттображает блок фильтрации.
  const getPrimaryData = (dataFromServer) => {
    primaryData = dataFromServer;
    if (primaryData.length > 0) {
      imgFilter.classList.remove(`img-filters--inactive`);
    }
  };

  // Функция ищет все картинки отображенные в DOM, удаляет их, и рендерит новые на основе обработанного массива
  const refreshGallery = (secondaryData) => {
    const pictures = document.querySelectorAll(`.picture`);
    pictures.forEach((element) => {
      element.remove();
    });
    window.gallery.renderGallery(secondaryData);
  };

  const getSortedData = () => {
    const sortedData = primaryData.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    return sortedData;
  };

  const getRandomData = () => {
    let randomData = primaryData.slice().sort(() => {
      return 0.5 - Math.random();
    }).slice(0, NUM_RANDOM_PHOTO);
    return randomData;
  };

  filterBtns.forEach((element) => {
    element.addEventListener(`click`, (evt) => {
      switch (element.id) {
        case `filter-discussed`:
          window.utils.buttonToggle(evt, filterBtns, FILTER_BTN_ACTIVE_CLASS);
          window.utils.debounce(refreshGallery(getSortedData()));
          break;
        case `filter-random`:
          window.utils.buttonToggle(evt, filterBtns, FILTER_BTN_ACTIVE_CLASS);
          window.utils.debounce(refreshGallery(getRandomData()));
          break;
        case `filter-default`:
          window.utils.buttonToggle(evt, filterBtns, FILTER_BTN_ACTIVE_CLASS);
          window.utils.debounce(refreshGallery(primaryData));
          break;
      }
    });
  });

  window.filter = {
    getPrimaryData
  };
})();


