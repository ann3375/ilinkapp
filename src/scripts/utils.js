import { isValidData } from './validateSchema';

const container = document.getElementById('file-list');
const deleteButton = document.getElementById('delete-file');
const fileLoader = document.getElementById('input-file');

export function convertFileSize(size) {
  if (size > 100000) {
    return `${(size / 1024 ** 2).toFixed(1).replace('.', ',')} m.b`;
  } else {
    return `${(size / 1024).toFixed(1).replace('.', ',')} k.b`;
  }
}

export function returnFileExt(fileType) {
  const ext = fileType.split('/')[1].toUpperCase();
  return ext;
}

export function addFileCardToHTML(src, file) {
  if (document.querySelector('.filecard')) {
    deleteFile();
  }

  const content = document.createElement('div');
  content.classList.add('filecard');
  content.innerHTML = createFileCard(src, file);
  container.appendChild(content);

  if (deleteButton) {
    deleteButton.addEventListener('click', () => deleteFile());
  }
}

export function createFileCard(src, fileInfo) {
  return `<div class="filecard__inner">
    <img class="filecard__img" src="${src}" alt='${fileInfo.name}' />
    <div class="filecard__info">
      <span class="filecard__name">${fileInfo.name.split('.')[0]}</span>
      <span class="filecard__ext">${returnFileExt(fileInfo.type)} ${convertFileSize(
    fileInfo.size
  )}</span>
    </div>
    <span id="delete-file" class="filecard__delete"></span></div>`;
}

export function deleteFile() {
  fileLoader.value = '';
  const el = document.getElementById('file-list');
  el.innerHTML = '';
}

export function checkUploadFile(file, error, event) {
  if (!isValidData.isValidFile(file)) {
    error.innerHTML = 'The file size must less than 5 Mb and have .jpg,  .gif, .png extension';
    error.classList.add('error_active');
    deleteFile();
  } else {
    error.classList.remove('error_active');
    addFileCardToHTML(event.target.result, file);
  }
}
