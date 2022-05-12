import { el, setChildren } from 'redom';
import { btnCurrency } from './header';
import { DataInteraction } from '../data-processing';
import { elemHidden } from '../secondary-functions/element-hidden';
import { selectEvent } from '../secondary-functions/select';

// create elements currencies
const currencies = el('section', { className: 'currencies' });
const currenciesTitle = el(
  'h1',
  { className: 'currencies__title title-main' },
  'Валютный обмен'
);
const currenciesContainer = el('ul', { className: 'currencies__list' });
const currenciesCardYourCurrencies = el('article', {
  className: 'currencies__card currencies__card-yourCurrencies',
});
const currenciesTitleYourCurrencies = el(
  'h2',
  { className: 'currencies__card-title' },
  'Ваши валюты'
);
const currenciesListYourCurrencies = el('ul', {
  className: 'currencies__card-list',
});
const currenciesCardCurrencyExchange = el('article', {
  className: 'currencies__card currencies__card-CurrencyExchange',
});
const currenciesTitleCurrencyExchange = el(
  'h2',
  { className: 'currencies__card-title' },
  'Обмен валюты'
);
const currenciesCardChangingRates = el('article', {
  className: 'currencies__card currencies__card-ChangingRates',
});
const currenciesTitleChangingRates = el(
  'h2',
  { className: 'currencies__card-title' },
  'Изменение курсов в реальном времени'
);
const currenciesListChangingRates = el('ul', {
  className: 'currencies__card-list',
});

// add in DOM elements currencies
[
  currenciesCardYourCurrencies,
  currenciesCardChangingRates,
  currenciesCardCurrencyExchange,
].forEach((card) => {
  const currenciesItem = el('li', {
    className: `currencies__item ${
      card.classList.contains('currencies__card-ChangingRates')
        ? 'currencies__item-ChangingRates'
        : ''
    }`,
  });
  setChildren(currenciesItem, card);
  currenciesContainer.append(currenciesItem);
});
setChildren(currenciesCardChangingRates, [
  currenciesTitleChangingRates,
  currenciesListChangingRates,
]);
setChildren(currenciesCardYourCurrencies, [
  currenciesTitleYourCurrencies,
  currenciesListYourCurrencies,
]);
setChildren(currencies, [currenciesTitle, currenciesContainer]);

export function currenciesContentCreation(dataCurrencies, container) {
  // event for nav-btn
  btnCurrency.disabled = true;

  // cleaning DOM list your currencies
  currenciesListYourCurrencies.innerHTML = '';

  for (const obj in dataCurrencies) {
    const currenciesItemYourCurrencies = el('li', {
      className: 'currencies__card-item currencies__card-item-yourCurrencies',
    });
    const currenciesCodeYourCurrencies = el(
      'h3',
      { className: 'currencies__card-title currencies__card-title-code' },
      dataCurrencies[obj].code
    );
    const currenciesAmountYourCurrencies = el(
      'h3',
      { className: 'currencies__card-title currencies__card-title-amount' },
      dataCurrencies[obj].amount.toFixed(2)
    );

    setChildren(currenciesItemYourCurrencies, [
      currenciesCodeYourCurrencies,
      currenciesAmountYourCurrencies,
    ]);
    currenciesListYourCurrencies.append(currenciesItemYourCurrencies);
  }

  // create form currencies
  const currenciesForm = el('form', {
    className: 'currencies__form',
  });
  const currenciesFormContainer = el('div', {
    className: 'currencies__form-box',
  });
  const currenciesFormBtn = el(
    'button',
    {
      className: 'currencies__form-btn btn-us',
    },
    'Обменять'
  );

  new DataInteraction({
    url: 'http://localhost:3000/all-currencies',
    method: 'GET',
  })._contentData.then((arrayCode) => {
    [
      { id: 'from', name: 'Из' },
      { id: 'to', name: 'в' },
      { id: 'amount', name: 'Сумма' },
    ].forEach((obj) => {
      // create inputs form currencies
      const currenciesInputBox = el('div', {
        className: 'currencies__form-input-box',
      });
      const currenciesInput = el('input', {
        className: 'currencies__form-input input-us',
        placeholder: 'Placeholder',
        name: obj.name,
        id: obj.id,
        autocomplete: 'off',
      });
      const currenciesLabel = el(
        'label',
        {
          className: 'currencies__form-input-label label-us',
          for: obj.id,
        },
        `${obj.name}`
      );

      if (obj.id === 'from' || obj.id === 'to') {
        // create elements dropdown select input currencies
        const currenciesInputDropdownBox = el('div', {
          className: 'currencies__form-select-dropdown-box',
        });
        const currenciesInputDropdown = el('div', {
          className: 'currencies__form-select-dropdown dropdown-us',
        });

        // add dropdown input form in DOM
        setChildren(currenciesInputDropdownBox, [
          currenciesInput,
          currenciesInputDropdown,
        ]);
        setChildren(currenciesInputBox, [
          currenciesLabel,
          currenciesInputDropdownBox,
        ]);

        // event select input form currencies
        selectEvent(
          currenciesInput,
          currenciesInputDropdown,
          currenciesInputDropdownBox,
          currenciesInputDropdownBox,
          'currencies__form-select-active',
          'dropdown-us__open',
          'dropdown-us__close'
        );

        JSON.parse(arrayCode).forEach((option) => {
          if (option !== currenciesInput.getAttribute('value')) {
            // create option select currencies
            const currenciesInputOption = el(
              'div',
              {
                className: 'currencies__form-select-option option-us',
              },
              option
            );

            // event option select currencies
            currenciesInputOption.addEventListener('click', (e) => {
              if (
                currenciesInputDropdown.classList.contains('dropdown-us__open')
              )
                elemHidden(
                  currenciesInputDropdown,
                  'dropdown-us__open',
                  'dropdown-us__close',
                  400
                );

              currenciesInput.value = e.currentTarget.textContent;
            });

            currenciesInputDropdown.append(currenciesInputOption);
          }
        });

        currenciesInputDropdown.setAttribute('data-simplebar', '');
      } else {
        currenciesLabel.classList.add('currencies__form-input-label-amount');
        setChildren(currenciesInputBox, [currenciesLabel, currenciesInput]);
      }
      currenciesFormContainer.append(currenciesInputBox);
    });
  });

  // add elements from in DOM currencies
  setChildren(currenciesForm, [currenciesFormContainer, currenciesFormBtn]);
  setChildren(currenciesCardCurrencyExchange, [
    currenciesTitleCurrencyExchange,
    currenciesForm,
  ]);

  new WebSocket('ws://localhost:3000/currency-feed').addEventListener(
    'message',
    (e) => {
      // max length list changing rates currencies
      if (window.screen.width <= 859) {
        if (currenciesListChangingRates.childNodes.length === 10)
          currenciesListChangingRates.firstChild.remove();
      } else if (window.screen.width >= 859) {
        if (currenciesListChangingRates.childNodes.length === 22)
          currenciesListChangingRates.firstChild.remove();
      }

      // create elements list changing rates currencies
      const currenciesItemChangingRates = el('li', {
        className: 'currencies__card-item',
      });
      const currenciesCodeChangingRates = el(
        'h3',
        {
          className:
            'currencies__card-title currencies__card-title-ChangingRates currencies__card-title-code',
        },
        `${JSON.parse(e.data).from}/${JSON.parse(e.data).to}`
      );
      const currenciesAmountChangingRates = el(
        'h3',
        {
          className:
            'currencies__card-title currencies__card-title-ChangingRates currencies__card-title-amount',
        },
        JSON.parse(e.data).rate
      );

      // add content item changing rates currencies
      if (JSON.parse(e.data).change !== 0) {
        currenciesItemChangingRates.classList.add(
          `${
            JSON.parse(e.data).change === 1
              ? 'currencies__card-item-green'
              : 'currencies__card-item-red'
          }`
        );
        currenciesAmountChangingRates.insertAdjacentHTML(
          'beforeend',
          `${
            JSON.parse(e.data).change === 1
              ? '<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/></svg>'
              : '<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/></svg>'
          }`
        );
      }

      // add elements list changing rates in DOM currencies
      setChildren(currenciesItemChangingRates, [
        currenciesCodeChangingRates,
        currenciesAmountChangingRates,
      ]);
      currenciesListChangingRates.append(currenciesItemChangingRates);
    }
  );

  // add elements in DOM currencies
  setChildren(container, currencies);

  // form currency operation
  new DataInteraction({
    url: 'http://localhost:3000/currency-buy',
    method: 'POST',
    form: '.currencies__form',
    error: [
      {
        received: 'Unknown currency code',
        processed: 'Передан неверный валютный код!',
      },
      {
        received: 'Not enough currency',
        processed: 'На валютном счёте списания нет средств!',
      },
      {
        received: 'Invalid amount',
        processed: 'Не указана сумма перевода, или она отрицательная!',
      },
      {
        received: 'Overdraft prevented',
        processed:
          'Попытка перевести больше денег, чем доступно на счёте списания!',
      },
    ],
  });
}
