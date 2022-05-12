import { el, setChildren } from 'redom';

// create elements account
export const account = el('section', { className: 'account' });
const accountformBox = el('div', { className: 'account__form-container' });
const accountformTitle = el(
  'h1',
  { className: 'account__form-title title-main' },
  'Вход в аккаунт'
);
const accountform = el('form', { className: 'account__form' });
const accountformBtn = el(
  'button',
  { className: 'account__form-btn btn-us', id: 'btn-account' },
  'Войти'
);

// cleaning DOM from account
accountform.innerHTML = '';

[
  { id: 'login', name: 'Логин' },
  { id: 'password', name: 'Пароль' },
].forEach((obj) => {
  // create elements form account
  const inputBox = el('div', {
    className: 'account__form-input-box',
  });
  const inputAccount = el('input', {
    className: 'account__form-input input-us',
    placeholder: 'Placeholder',
    name: obj.name,
    type: obj.id === 'password' ? 'password' : 'text',
    id: obj.id,
  });
  const label = el(
    'label',
    {
      className: 'account__form-input-label label-us',
      for: obj.id,
    },
    `${obj.name}`
  );

  // add elements form account in DOM
  setChildren(inputBox, [label, inputAccount]);
  accountform.append(inputBox);
});

// add elements account in DOM
accountform.append(accountformBtn);
setChildren(account, accountformBox);
setChildren(accountformBox, [accountformTitle, accountform]);
