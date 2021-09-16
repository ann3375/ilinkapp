import { checkUploadFile, deleteFile } from './scripts/utils';
import { isValidData, validateForm } from './scripts/validateSchema';
import { getLocalStorageValue } from './scripts/localStorageUtils';
import { createError } from './scripts/createError';

import './styles/index.scss';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const fileLoader = document.getElementById('input-file');
  const dropZone = document.getElementById('dropZone');
  const error = document.querySelector('.add-file__area .error');
  const username = document.getElementById('username');
  const gender = document.getElementById('gender');
  const country = document.getElementById('country');
  const city = document.getElementById('city');
  const birthday = document.getElementById('birthday');
  const formStatus = document.querySelector('.form__status');
  const formButton = document.querySelector('.form__button');

  const allSelectors = document.querySelectorAll('.form__input');
  let file;

  getLocalStorageValue(username);
  getLocalStorageValue(gender);
  getLocalStorageValue(country);
  getLocalStorageValue(city);
  getLocalStorageValue(birthday);

  validateForm(username, gender, country, city, birthday, file);

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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    formData.append('image', file);

    sendDataForm().then(() => {
      for (let data of formData) {
        console.log(data);
      }

      setTimeout(function () {
        formStatus.classList.remove('form__status_active');
        localStorage.clear();
        form.reset();
        deleteFile();
      }, 3000);
    });
  });

  gender.addEventListener('click', () => {
    document.querySelector('.form__select-arrow').classList.toggle('form__select-arrow_active');
  });

  form.addEventListener('input', () => {
    validateForm(username, gender, country, city, birthday, file);
  });

  allSelectors.forEach((selector) => {
    selector.addEventListener('input', (event) => {
      localStorage.setItem(event.target.id, event.target.value);
      createError(event.target, event.target.id);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('filecard__delete')) {
      file = null;
      deleteFile();
      validateForm(username, gender, country, city, birthday, file);
    }
  });

  function sendDataForm() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve('Success!');
        formStatus.classList.add('form__status_active');
        formButton.disabled = true;
      }, 3000);
    });
  }
});
