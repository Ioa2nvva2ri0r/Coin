import validator from 'validator';

export function checkingForSpaces(value, inputName) {
  if (value.includes(' ')) {
    throw new Error(`Значение "${inputName}" содержит пробельные символы!`);
  }
  return false;
}

export function checkForEmptyInputField(value, inputName) {
  if (!validator.isLength(value, { min: 1 })) {
    throw new Error(
      `Значение "${inputName}" не указано, укажите для дальнешего выполнения операции!`
    );
  } else return false;
}

export function checkingIfOnlyNumbersMatter(value, inputName) {
  if (/[^0-9]/.test(value)) {
    throw new Error(
      `Значение "${inputName}" содержит символы не являющиеся цифрами!`
    );
  } else return false;
}

export function checkingIfTheValueIsAFloatingPointDigit(value, inputName) {
  if (/[^0-9.]/.test(value)) {
    throw new Error(
      `Значение "${inputName}" содержит символы не являющиеся цифрами, либо имеет отрицательное значение!`
    );
  } else return false;
}

export function checkingIfOnlyLettersMatter(value, inputName) {
  if (/[^a-zа-яё]/gi.test(value)) {
    throw new Error(
      `Значение "${inputName}" содержит символы не являющиеся буквами!`
    );
  } else return false;
}

export function validationForm(input, value, DOM, classError) {
  input.addEventListener('focus', (e) =>
    e.currentTarget.classList.remove(classError)
  );
  input.classList.add(classError);

  checkingForSpaces(value, input.name);

  if (input.id === 'login' || input.id === 'password') {
    if (!validator.isLength(value, { min: 6 })) {
      throw new Error(
        `"${input.name}" не указан, или его значение менее 6 символов!`
      );
    }
  } else if (input.id === 'amount') {
    checkForEmptyInputField(value, input.name);
    checkingIfTheValueIsAFloatingPointDigit(value, input.name);
  } else if (DOM === 'account' && input.id === 'to') {
    checkForEmptyInputField(value, input.name);
    checkingIfOnlyNumbersMatter(value, input.name);
  } else if (DOM === 'currencies' && input.id === 'to') {
    if (!validator.isLength(value, { min: 1, max: 3 })) {
      throw new Error(
        `Код валюты "${input.name}" не указан, либо имеет значение больше 3-х символов!`
      );
    }
    checkingIfOnlyLettersMatter(value, input.name);
  } else input.classList.remove(classError);
}
