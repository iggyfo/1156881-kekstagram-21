'use strict';
const MAX_NUM_HASHTAGS = 5;
const MAX_NUM_COMMENTS = 140;
const MAX_NUM_CHAR = 20;
const FAIL_VALIDATE_STYLE = `border: 3px solid crimson`;
const FULL_SCALE = 100;
const ESC = `Escape`;
const regex = /^#[А-Яа-яA-Za-z0-9ёЁ]{1,19}$/;
const main = document.querySelector(`main`);
const photoUpload = document.querySelector(`.img-upload__form`);
const photoUploadInput = photoUpload.querySelector(`#upload-file`);
const effectNone = photoUpload.querySelector(`#effect-none`);
const scaleControlValue = photoUpload.querySelector(`.scale__control--value`);
const imgPreview = photoUpload.querySelector(`.img-upload__preview`);
const photoPreview = photoUpload.querySelector(`.img-upload__preview img`);
const photoEditForm = photoUpload.querySelector(`.img-upload__overlay`);
const inputHashtag = photoUpload.querySelector(`.text__hashtags`);
const inputComment = photoUpload.querySelector(`.text__description`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const reset = () => {
  inputHashtag.setCustomValidity(``);
  inputHashtag.style.border = `none`;
  inputComment.setCustomValidity(``);
  photoPreview.src = ``;
};


const validateHashtags = () => {
  const inputHashTags = inputHashtag.value.split(` `);
  const hashTags = inputHashTags.filter((hashtag) => hashtag !== ``);
  inputHashtag.setCustomValidity(``);
  inputHashtag.style.border = `none`;

  if (hashTags.length > MAX_NUM_HASHTAGS) {
    inputHashtag.setCustomValidity(`Максимальное количество хэштегов - не более пяти`);
    inputHashtag.style = FAIL_VALIDATE_STYLE;
    return;
  }

  for (let tag of hashTags) {
    if (tag.length > MAX_NUM_CHAR) {
      inputHashtag.setCustomValidity(`Максимальное количество знаков в хэштеге - не более 20 ` + tag);
      inputHashtag.style = FAIL_VALIDATE_STYLE;
      return;
    }
    if (window.utils.getNumDublicate(hashTags, tag) > 1) {
      inputHashtag.setCustomValidity(`Хештеги не должны повторяться - удалите один из ` + tag);
      inputHashtag.style = FAIL_VALIDATE_STYLE;
      return;
    }
    if (tag && !regex.test(tag)) {
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

const getCustomSettings = (evt) => {
  window.preview.closeModal(evt);
  photoUploadInput.value = ``;
  scaleControlValue.value = FULL_SCALE + `%`;
  imgPreview.style.transform = `scale(` + (FULL_SCALE / 100) + `)`;
  imgPreview.className = `img-upload__preview`;
  imgPreview.style.removeProperty(`filter`);
  inputHashtag.value = ``;
  inputComment.value = ``;
  effectNone.checked = true;
};

inputHashtag.addEventListener(`input`, validateHashtags);
inputComment.addEventListener(`input`, validateComment);

const closeSuccessMessage = (evt) => {
  const successOverlay = main.querySelector(`.success`);
  const successCloseBtn = successOverlay.querySelector(`.success__button`);
  if (evt.target === successOverlay || evt.target === successCloseBtn || evt.key === ESC) {
    main.removeChild(main.lastChild);
    document.removeEventListener(`keydown`, closeSuccessMessage);
  }
};

const closeErrorMessage = (evt) => {
  const errorOverlay = main.querySelector(`.error`);
  const errorCloseButton = main.querySelector(`.error__button`);
  if (evt.target === errorOverlay || evt.target === errorCloseButton || evt.key === ESC) {
    main.removeChild(main.lastChild);
    document.removeEventListener(`keydown`, closeErrorMessage);
  }
};

const onSuccessUpload = () => {
  const successNode = successTemplate.cloneNode(true);
  main.appendChild(successNode);
  const successOverlay = main.querySelector(`.success`);
  successOverlay.addEventListener(`click`, closeSuccessMessage);
  document.addEventListener(`keydown`, closeSuccessMessage);
};

const onErrorUpload = () => {
  const errorNode = errorTemplate.cloneNode(true);
  main.appendChild(errorNode);
  const errorOverlay = main.querySelector(`.error`);
  errorOverlay.addEventListener(`click`, closeErrorMessage);
  document.addEventListener(`keydown`, closeErrorMessage);
};

window.form = {
  photoUpload,
  photoPreview,
  photoEditForm,
  photoUploadInput,
  validateHashtags,
  validateComment,
  getCustomSettings,
  onSuccessUpload,
  onErrorUpload,
  imgPreview,
  reset
};
