import { el, setChildren } from 'redom';
import { btnAccounts } from './header';
import { DataInteraction, dataAcquisition } from '../data-processing';
import { accountContentCreation } from './view-account';
import { elemHidden, elemVisible } from '../secondary-functions/element-hidden';
import { selectEvent } from '../secondary-functions/select';
import { sortArray } from '../secondary-functions/sort';
import { definitionOfDate } from '../secondary-functions/date';
import { cardImage } from '../secondary-functions/cards';

// create elements accounts
const accounts = el('section', { className: 'accounts' });
const accountsHeader = el('div', { className: 'accounts__header' });
const accountsHeaderBox = el('div', { className: 'accounts__header-box' });
const accountsHeaderTitle = el(
  'h1',
  { className: 'accounts__header-title title-main' },
  'Ваши счета'
);
const accountsSelectContainer = el('div', {
  className: 'accounts__header-select-box',
});
const accountsSelect = el(
  'div',
  { className: 'accounts__header-select', tabindex: '0', value: 'balance' },
  'Сортировка'
);
const accountsSelectDropdown = el('div', {
  className: 'accounts__header-select-dropdown dropdown-us',
});
const accountsContainer = el('ul', { className: 'accounts__list' });
let balanceInit = true;

// add content elements accounts
accountsSelect.insertAdjacentHTML(
  'beforeend',
  '<svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.951904 0.5L5.9519 5.5L10.9519 0.5L0.951904 0.5Z" fill="#182233"/></svg>'
);

// add elements in DOM accounts
setChildren(accountsSelectContainer, [accountsSelect, accountsSelectDropdown]);
setChildren(accountsHeaderBox, [accountsHeaderTitle, accountsSelectContainer]);
setChildren(accounts, [accountsHeader, accountsContainer]);

// event select accounts
selectEvent(
  accountsSelect,
  accountsSelectDropdown,
  accountsSelectContainer,
  accountsSelect,
  'accounts__header-select-active',
  'dropdown-us__open',
  'dropdown-us__close'
);

export function accountsContentCreation(dataAccounts, container) {
  // event for nav-btn
  btnAccounts.disabled = true;

  // cleaning DOM select and container accounts
  accountsContainer.innerHTML = '';
  accountsSelectDropdown.innerHTML = '';

  // sort list by balance
  if (balanceInit === true) {
    sortArray(dataAccounts, 'balance', '<');
    balanceInit = false;
  }

  // create elements accounts form
  const accountsCreateForm = el('form', { className: 'accounts__header-form' });
  const accountsCreateBtn = el(
    'button',
    { className: 'accounts__header-form-btn btn-us', id: 'create-account' },
    'Создать новый счёт'
  );

  // add content accounts btn form
  accountsCreateBtn.insertAdjacentHTML(
    'afterbegin',
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8" stroke="white" stroke-width="2"/></svg>'
  );

  dataAccounts.forEach((objAccount) => {
    // create item accounts
    const accountsItem = el('li', { className: 'accounts__item' });
    const accountsCard = el('article', { className: 'accounts__card' });
    const accountsCardBoxTitle = el('div', {
      className: 'accounts__card-title-box',
    });
    const accountsCardBoxTransaction = el('div', {
      className: 'accounts__card-transaction-box',
    });
    const accountsCardTitle = el('h2', {
      className: 'accounts__card-title',
      ariaLabel: 'Номер счёта',
    });
    const accountsCardBalance = el('strong', {
      className: 'accounts__card-balance',
      ariaLabel: 'Баланс на счёте',
    });
    const accountsCardTransaction = el('h3', {
      className: 'accounts__card-transaction',
    });
    const accountsCardBtn = el(
      'button',
      { className: 'accounts__card-btn btn-us', id: objAccount.account },
      'Открыть'
    );

    // add content item accounts
    accountsCardTitle.textContent = objAccount.account;
    accountsCardTitle.title = objAccount.account;
    accountsCardTitle.insertAdjacentHTML(
      'beforeend',
      cardImage(objAccount.account)
    );
    accountsCardBalance.textContent = `${objAccount.balance.toFixed(2)} ₽`;
    if (objAccount.transactions.length === 0) {
      accountsCardTransaction.innerHTML =
        '<span>Последняя транзакция:</span><br>Не осуществлялась';
    } else {
      objAccount.transactions.forEach(
        (transaction) =>
          (accountsCardTransaction.innerHTML = `<span>Последняя транзакция:</span><br>${definitionOfDate(
            transaction.date,
            true
          )}`)
      );
    }

    // add elements item accounts in DOM
    setChildren(accountsCardBoxTitle, [accountsCardTitle, accountsCardBalance]);
    setChildren(accountsCardBoxTransaction, [
      accountsCardTransaction,
      accountsCardBtn,
    ]);
    setChildren(accountsCard, [
      accountsCardBoxTitle,
      accountsCardBoxTransaction,
    ]);
    setChildren(accountsItem, accountsCard);
    accountsContainer.append(accountsItem);
  });

  [
    { content: 'По номеру', value: 'account' },
    { content: 'По балансу', value: 'balance' },
    { content: 'По последней транзакции', value: 'date' },
  ].forEach((objOption) => {
    // create option select accounts
    const accountsSelectOption = el(
      'div',
      {
        className: 'accounts__header-select-option option-us',
        value: objOption.value,
        tabindex: '0',
      },
      objOption.content
    );

    // add content option accounts
    if (
      accountsSelectOption.getAttribute('value') ===
      accountsSelect.getAttribute('value')
    )
      accountsSelectOption.insertAdjacentHTML(
        'beforeend',
        '<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.00003 11.17L1.83003 7.00003L0.410034 8.41003L6.00003 14L18 2.00003L16.59 0.590027L6.00003 11.17Z" fill="#182233"/></svg>'
      );

    // event option accounts
    accountsSelectOption.addEventListener('click', (e) => {
      accountsSelect.classList.toggle('accounts__header-select-active');
      accountsSelect.setAttribute(
        'value',
        `${accountsSelectOption.getAttribute('value')}`
      );
      if (accountsSelectDropdown.classList.contains('dropdown-us__open')) {
        elemHidden(
          accountsSelectDropdown,
          'dropdown-us__open',
          'dropdown-us__close',
          400
        );
      } else {
        elemVisible(accountsSelectDropdown, 'dropdown-us__open', 'flex');
      }

      // accounts list sorting
      if (e.currentTarget.getAttribute('value') === 'balance') {
        sortArray(dataAccounts, e.currentTarget.getAttribute('value'), '<');
      } else if (e.currentTarget.getAttribute('value') === 'date') {
        dataAccounts.sort((a, b) => {
          let x = a.transactions[0];
          let y = b.transactions[0];
          if (x === undefined || y === undefined) {
            x = 0;
            y = 0;
          } else {
            x = a.transactions[0]['date'];
            y = b.transactions[0]['date'];
          }

          return new Date(x) < new Date(y)
            ? -1
            : new Date(x) > new Date(y)
            ? 1
            : 0;
        });
      } else
        sortArray(dataAccounts, e.currentTarget.getAttribute('value'), '>');

      // DOM remodeling after sorting
      accountsContentCreation(dataAccounts, container);
    });

    // add option accounts in DOM
    accountsSelectDropdown.append(accountsSelectOption);
  });

  // add elements accounts in DOM
  setChildren(accountsCreateForm, accountsCreateBtn);
  setChildren(accountsHeader, [accountsHeaderBox, accountsCreateForm]);
  setChildren(container, accounts);

  if (document.querySelector('.accounts__header-form')) {
    // create account
    new DataInteraction({
      url: 'http://localhost:3000/create-account',
      method: 'POST',
      form: '.accounts__header-form',
      error: 'none',
    });
  }

  // creating invoice elements by id
  document.querySelectorAll('.accounts__card-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      dataAcquisition(
        new DataInteraction({
          url: `http://localhost:3000/account/${e.currentTarget.id}`,
          method: 'GET',
        }),
        accountContentCreation,
        container
      );
    });
  });
}
