'use strict';
// модуль работы с формой
(() => {
  const form = document.querySelector(`.img-upload__form`);
  const effectNone = form.querySelector(`#effect-none`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);
  const regex = /^#[А-Яа-яA-Za-z0-9]{2,19}$/;
  const MAX_NUM_HASHTAGS = 5;
  const MAX_NUM_COMMENTS = 140;
  const MAX_NUM_CHAR = 20;
  const FAIL_VALIDATE_STYLE = `border: 3px solid crimson`;
  const FULL_SCALE = 100;

  // Добавляем обработчик на поле ввода хэштега
  const validateHashtags = () => {
    const hashTags = inputHashtag.value.split(` `);
    inputHashtag.setCustomValidity(``);
    inputHashtag.style.border = `none`;

    if (hashTags.length > MAX_NUM_HASHTAGS) {
      inputHashtag.setCustomValidity(`Максимальное количество хэштегов - не более пяти`);
      inputHashtag.style = FAIL_VALIDATE_STYLE;
      return;
    }

    for (let tag of hashTags) {
      // Проверяем на максимальное количество знаков
      if (tag.length > MAX_NUM_CHAR) {
        inputHashtag.setCustomValidity(`Максимальное количество знаков в хэштеге - не более 20 ` + tag);
        inputHashtag.style = FAIL_VALIDATE_STYLE;
        return;
      }
      // Проверяем есть ли повторяющиеся хэштеги
      if (window.utils.getNumDublicate(hashTags, tag) > 1) {
        inputHashtag.setCustomValidity(`Хештеги не должны повторяться - удалите один из ` + tag);
        inputHashtag.style = FAIL_VALIDATE_STYLE;
        return;
      }
      // Проверяем содержание хэштега
      if (!regex.test(tag)) {
        inputHashtag.setCustomValidity(`Хештег ` + tag + ` должен начинаться с # и состоять из букв/цифр`);
        inputHashtag.style = FAIL_VALIDATE_STYLE;
        return;
      }
    }
  };

  const validateComment = () => {
    inputComment.setCustomValidity(``);
    if (inputComment.textLength > MAX_NUM_COMMENTS) {
      inputComment.setCustomValidity(`Длина комментария должна быть не более ` + MAX_NUM_COMMENTS + ` символов`);
      inputHashtag.style = FAIL_VALIDATE_STYLE;
    }
  };

  const submitHandler = (evt) => {
    window.upload.sendDataToServer(new FormData(form), getCustomFormSettings(evt));
    evt.preventDefault();
  };

  // В случае успешной отправки утаноавливаем 100% маштаб, эффект сбрасывается на «Оригинал», поля ввода очищаются.
  const getCustomFormSettings = (evt) => {
    window.preview.closeModal(evt);
    scaleControlValue.value = FULL_SCALE + `%`;
    imgPreview.style.transform = `scale(` + (FULL_SCALE / 100) + `)`;
    imgPreview.className = `img-upload__preview`;
    imgPreview.style.removeProperty(`filter`);
    inputHashtag.value = ``;
    inputComment.value = ``;
    effectNone.checked = true;
  };

  window.form = {
    validateHashtags,
    validateComment,
    getCustomFormSettings,
    submitHandler
  };
})();
