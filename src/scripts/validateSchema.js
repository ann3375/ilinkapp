const secondStepForm = document.querySelector('.form__second-step');
const thirdStepForm = document.querySelector('.add-file__area');
const formButton = document.querySelector('.form__button');

export const isValidData = {
  isValidFile(file) {
    if (
      !['image/jpeg', 'image/png', 'image/gif'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      return false;
    }

    return true;
  },

  isValidDate(selector) {
    const value = selector.value;
    const data = value.split('.');
    const pattern = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
    const enterDateToTimestamp = Date.parse(data[2] + '-' + data[1] + '-' + data[0]);
    const isEnterDateLessNow = Date.now() - enterDateToTimestamp > 0 ? true : false;

    if (!pattern.test(value) || isNaN(enterDateToTimestamp) || !isEnterDateLessNow) {
      return false;
    }

    return true;
  },

  isValidValue(selector) {
    const value = selector.value;

    if (value.length === 0) {
      return false;
    } else if (value.length <= 1 || value.length >= 20) {
      return false;
    } else if (/\d/g.test(value)) {
      return false;
    }
    return true;
  },
};

export function validateForm(username, gender, country, city, birthday, file) {
  const isFirstStepCompleted =
    isValidData.isValidValue(username) && isValidData.isValidValue(gender);

  const isSecondStepCompleted =
    isValidData.isValidValue(country) &&
    isValidData.isValidValue(city) &&
    isValidData.isValidDate(birthday);

  const isThirdStepCompleted = file ? isValidData.isValidFile(file) : false;

  isFirstStepCompleted ? secondStepForm.classList.add('form__second-step_active') : null;
  isSecondStepCompleted ? thirdStepForm.classList.add('add-file__area_active') : null;

  isThirdStepCompleted ? (formButton.disabled = false) : (formButton.disabled = true);
}
