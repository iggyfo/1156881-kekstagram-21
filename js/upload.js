'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const page = document.querySelector(`body`);
const photoUpload = document.querySelector(`.img-upload__form`);
const photoUploadInput = photoUpload.querySelector(`#upload-file`);
const photoPreview = photoUpload.querySelector(`.img-upload__preview img`);
const photoEditForm = photoUpload.querySelector(`.img-upload__overlay`);

photoUploadInput.addEventListener(`change`, (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      photoEditForm.classList.remove(`hidden`);
      page.classList.add(`modal-open`);
      photoPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    photoUploadInput.value = ``;
  }
});
