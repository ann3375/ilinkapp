import './styles/index.scss';
import { checkUploadFile, deleteFile } from './scripts/utils';

import { isValidData, validateForm } from './scripts/validateSchema';
import { getLocalStorageValue } from './scripts/localStorageUtils';
import { createError } from './scripts/createError';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const fileLoader = document.getElementById('input-file');
  const deleteButton = document.getElementById('delete-file');
  const dropZone = document.getElementById('dropZone');
  const error = document.querySelector('.add-file__area .error');
  const username = document.getElementById('username');
  const gender = document.getElementById('gender');
  const country = document.getElementById('country');
  const city = document.getElementById('city');
  const birthday = document.getElementById('birthday');

  const allSelectors = document.querySelectorAll('.form__input');
  let file;

  if (window.FileList && window.File) {
    const reader = new FileReader();
    dropZone.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();

      file = event.dataTransfer.files[0];

      reader.readAsDataURL(file);
      validateForm(username, gender, country, city, birthday, file);

      reader.addEventListener('load', (event) => {
        checkUploadFile(file, error, event);
      });
    });
  }

  fileLoader.addEventListener('change', (event) => {
    const reader = new FileReader();

    const files = event.target.files;
    file = files[0] === undefined ? file : files[0];

    if (file) {
      reader.addEventListener('load', (event) => {
        checkUploadFile(file, error, event);
      });
      validateForm(username, gender, country, city, birthday, file);
      reader.readAsDataURL(file);
    }
  });

  fileLoader.addEventListener('click', () => {
    if (file) {
      file = isValidData.isValidFile(file) ? file : null;
      validateForm(username, gender, country, city, birthday, file);
    }
  });

  getLocalStorageValue(username);
  getLocalStorageValue(gender);
  getLocalStorageValue(country);
  getLocalStorageValue(city);
  getLocalStorageValue(birthday);

  validateForm(username, gender, country, city, birthday, file);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    formData.append('image', file);

    for (let p of formData) {
      console.log(p);
    }
  });

  async function formSend(event) {
    event.preventDefault();
    let formData = new FormData(form);
    formData.append('image', fileLoader.files[0]);
    console.log(formData);
    try {
      let response = await fetch('', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      let json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  form.addEventListener('input', () => {
    validateForm(username, gender, country, city, birthday, file);
  });

  allSelectors.forEach((selector) => {
    selector.addEventListener('input', (event) => {
      localStorage.setItem(event.target.id, event.target.value);
      createError(event.target, event.target.id);
    });
  });
});
