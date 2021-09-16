import { isValidData } from './validateSchema';

export function createError(
  selector,
  selectorName,
  error = selector.parentNode.querySelector('.error')
) {
  const value = selector.value;
  const isDateValue = selectorName === 'birthday';
  const isFileInput = selectorName === 'input-file' || selectorName === 'dropZone';
  error.classList.add('error_active');

  if (isDateValue) {
    return !isValidData.isValidDate(birthday)
      ? (error.innerHTML = 'Enter correct date in format dd.mm.yyyy')
      : error.classList.remove('error_active');
  }

  if (!isFileInput) {
    if (value.length === 0) {
      return (error.innerHTML = 'The field cannot be empty ');
    } else if (value.length <= 1 || value.length >= 20) {
      return (error.innerHTML = ` Your ${selectorName} must be more then 1 and less then 20 letters`);
    } else if (/\d/g.test(value)) {
      return (error.innerHTML = `Your ${selectorName} must not contain numbers`);
    } else if (!/^[A-Za-zА-Яа-яЁё]*$/g.test(value)) {
      return (error.innerHTML = `Your ${selectorName} must not contain symbols`);
    }
  }

  error.classList.remove('error_active');
}
