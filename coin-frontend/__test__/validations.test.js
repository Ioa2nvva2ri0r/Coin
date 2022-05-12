import {
  checkingForSpaces,
  checkForEmptyInputField,
  checkingIfOnlyNumbersMatter,
  checkingIfOnlyLettersMatter,
  checkingIfTheValueIsAFloatingPointDigit,
} from '../src/module/secondary-functions/validation';

test('Проверка значения на содердание пробелов', () => {
  expect(() => checkingForSpaces('developer ', 'Логин')).toThrow(Error);
  expect(() => checkingForSpaces('skill box', 'Пароль')).toThrow(Error);
  expect(checkingForSpaces('developer', 'Логин')).toBe(false);
  expect(checkingForSpaces('skillbox', 'Пароль')).toBe(false);
});

test('Проверка поля для вводя на пустоту', () => {
  expect(() => checkForEmptyInputField('', 'Логин')).toThrow(Error);
  expect(() => checkForEmptyInputField('', 'Пароль')).toThrow(Error);
  expect(checkForEmptyInputField('developer', 'Логин')).toBe(false);
  expect(checkForEmptyInputField('skillbox', 'Пароль')).toBe(false);
});

test('Проверка значения на содержание только цифр', () => {
  expect(() =>
    checkingIfOnlyNumbersMatter(
      '17307867 d27360602623 - 5887604',
      'Номер карты'
    )
  ).toThrow(Error);
  expect(() =>
    checkingIfOnlyNumbersMatter('2712020805046ss400800252;8428', 'Номер карты')
  ).toThrow(Error);
  expect(
    checkingIfOnlyNumbersMatter('74213041477477406320783754', 'Номер карты')
  ).toBe(false);
  expect(
    checkingIfOnlyNumbersMatter('17307867273606026235887604', 'Номер карты')
  ).toBe(false);
});

test('Проверка значения на содержание только цифр с плавающей точкой, либо без неё', () => {
  expect(() =>
    checkingIfTheValueIsAFloatingPointDigit('25,06', 'Сумма перевода')
  ).toThrow(Error);
  expect(() =>
    checkingIfTheValueIsAFloatingPointDigit('10a23/455.5', 'Сумма перевода')
  ).toThrow(Error);
  expect(
    checkingIfTheValueIsAFloatingPointDigit('74213.45', 'Сумма перевода')
  ).toBe(false);
  expect(
    checkingIfTheValueIsAFloatingPointDigit('2358000', 'Сумма перевода')
  ).toBe(false);
});

test('Проверка значения на содержание только букв', () => {
  expect(() => checkingIfOnlyLettersMatter('BY2R', 'Код валюты')).toThrow(
    Error
  );
  expect(() => checkingIfOnlyLettersMatter('U;-SD', 'Код валюты')).toThrow(
    Error
  );
  expect(checkingIfOnlyLettersMatter('BYR', 'Код валюты')).toBe(false);
  expect(checkingIfOnlyLettersMatter('USD', 'Код валюты')).toBe(false);
});
