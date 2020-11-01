'use strict';
// модуль работы с формой

(() => {
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);
  const regex = /^#[А-Яа-яA-Za-z0-9]{2,19}$/;
  const MAX_NUM_HASHTAGS = 5;
  const MAX_NUM_COMMENTS = 140;
  const MAX_NUM_CHAR = 20;

  // Добавляем обработчик на поле ввода хэштега
  const validateHashtags = () => {
    const hashTags = inputHashtag.value.split(` `);
    inputHashtag.setCustomValidity(``);
    if (hashTags.length > MAX_NUM_HASHTAGS) {
      inputHashtag.setCustomValidity(`Максимальное количество хэштегов - не более пяти`);
      return;
    }

    for (let tag of hashTags) {
      // Проверяем на максимальное количество знаков
      if (tag.length > MAX_NUM_CHAR) {
        inputHashtag.setCustomValidity(`Максимальное количество знаков в хэштеге - не более 20 ` + tag);
        return;
      }
      // Проверяем есть ли повторяющиеся хэштеги
      if (window.utils.getNumDublicate(hashTags, tag) > 1) {
        inputHashtag.setCustomValidity(`Хештеги не должны повторяться - удалите один из ` + tag);
        return;
      }
      // Проверяем содержание хэштега
      if (!regex.test(tag)) {
        inputHashtag.setCustomValidity(`Хештег ` + tag + ` должен начинаться с # и состоять из букв/цифр`);
        return;
      }
    }
  };

  const validateComment = () => {
    inputComment.setCustomValidity(``);
    if (inputComment.textLength > MAX_NUM_COMMENTS) {
      inputComment.setCustomValidity(`Длина комментария должна быть не более ` + MAX_NUM_COMMENTS + ` символов`);
    }
  };
  // Добавляем обработчик на поле ввода комментария

  window.form = {
    validateHashtags,
    validateComment
  };
})();
