'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

window.form.photoUploadInput.addEventListener(`change`, (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      window.preview.showModal();
      window.form.photoPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    throw new Error(`Загрузите подходящий формат фотографии: gif, jpg, jpeg или png`);
  }
});
