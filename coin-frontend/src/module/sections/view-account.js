import { el, setChildren } from 'redom';
import { DataInteraction, dataAcquisition } from '../data-processing';
import { accountsContentCreation } from './your-accounts';
import { definitionOfDate, lastMonths } from '../secondary-functions/date';
import { elemVisible, elemHidden } from '../secondary-functions/element-hidden';
import { selectEvent } from '../secondary-functions/select';
import { hidingItem } from '../secondary-functions/hiding-items';
import { drawingAGraph } from '../secondary-functions/canvas';
import { cardImage } from '../secondary-functions/cards';
import { containerMain } from '../../main';

// create elements account
const viewAccount = el('section', { className: 'viewAccount' });
const viewAccountHeader = el('div', { className: 'viewAccount__header' });
const viewAccountHeaderTitleBox = el('div', {
  className: 'viewAccount__header-title-box',
});
const viewAccountHeaderTitle = el(
  'h1',
  { className: 'viewAccount__header-title title-main' },
  'Просмотр счёта'
);
const viewAccountHeaderBtnBox = el('div', {
  className: 'viewAccount__header-btn-box',
});
const viewAccountHeaderBtn = el(
  'button',
  { className: 'viewAccount__header-btn btn-us' },
  'Вернуться назад'
);
const viewAccountHeaderTitleBalance = el('h2', {
  className: 'viewAccount__header-title-balance',
});
const viewAccountContainer = el('ul', { className: 'viewAccount__list' });
const viewAccountCardForm = el('article', {
  className: 'viewAccount__card viewAccount__card-form',
});
const viewAccountCardTitleForm = el(
  'h3',
  { className: 'viewAccount__card-title' },
  'Новый перевод'
);

const viewAccountCardBalance = el('article', {
  className: 'viewAccount__card viewAccount__card-balance',
});
const viewAccountCardTitleBalance = el(
  'h3',
  { className: 'viewAccount__card-title' },
  'Динамика баланса'
);
const viewAccountChartDynamicContainer = el('div', {
  className: 'viewAccount__canvas-container',
});
const viewAccountChartDynamicBox = el('div', {
  className: 'viewAccount__canvas-box',
});
const viewAccountChartDynamicAmountBox = el('div', {
  className: 'viewAccount__canvas-amount-box',
});
const viewAccountCardRatio = el('article', {
  className: 'viewAccount__card viewAccount__card-ratio',
});
const viewAccountCardTitleRatio = el(
  'h3',
  { className: 'viewAccount__card-title' },
  'Соотношение входящих исходящих транзакций'
);
const viewAccountChartRatioContainer = el('div', {
  className: 'viewAccount__canvas-container',
});
const viewAccountChartRatioBox = el('div', {
  className: 'viewAccount__canvas-box viewAccount__canvas-box-ratio',
});
const viewAccountChartRatioAmountBox = el('div', {
  className: 'viewAccount__canvas-amount-box',
});
const viewAccountCardTransaction = el('article', {
  className: 'viewAccount__card viewAccount__card-transaction',
});
const viewAccountCardTitleTransaction = el(
  'h3',
  { className: 'viewAccount__card-title' },
  'История переводов'
);
const viewAccountTable = el('table', {
  className: 'viewAccount__table',
});
const viewAccountTableboxTitle = el('tr', {
  className: 'viewAccount__table-title-box',
});

// create title table account
['Счёт отправителя', 'Счёт получателя', 'Сумма', 'Дата'].forEach((title) => {
  const viewAccountTableTitle = el(
    'h3',
    { className: 'viewAccount__table-title' },
    title
  );
  const viewAccountTableCellTitle = el('th');
  viewAccountTableCellTitle.append(viewAccountTableTitle);
  viewAccountTableboxTitle.append(viewAccountTableCellTitle);
});

// add content btn header account
viewAccountHeaderBtn.insertAdjacentHTML(
  'afterbegin',
  '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7L16 7V5L3.83 5Z" fill="white"/></svg>'
);

// add elements account in DOM
setChildren(viewAccountCardTransaction, [
  viewAccountCardTitleTransaction,
  viewAccountTable,
]);
setChildren(viewAccountChartRatioContainer, [
  viewAccountChartRatioBox,
  viewAccountChartRatioAmountBox,
]);
setChildren(viewAccountCardRatio, [
  viewAccountCardTitleRatio,
  viewAccountChartRatioContainer,
]);
setChildren(viewAccountChartDynamicContainer, [
  viewAccountChartDynamicBox,
  viewAccountChartDynamicAmountBox,
]);
setChildren(viewAccountCardBalance, [
  viewAccountCardTitleBalance,
  viewAccountChartDynamicContainer,
]);
setChildren(viewAccountHeaderBtnBox, [
  viewAccountHeaderBtn,
  viewAccountHeaderTitleBalance,
]);
setChildren(viewAccountHeader, [
  viewAccountHeaderTitleBox,
  viewAccountHeaderBtnBox,
]);
setChildren(viewAccount, [viewAccountHeader, viewAccountContainer]);

let more = false;

export function accountContentCreation(
  dataAccountId,
  container,
  tableItem = -10
) {
  // event for nav-btns
  document
    .querySelectorAll('.header__nav-btn')
    .forEach((btn) => (btn.disabled = false));

  // cleaning DOM table and container account
  viewAccountTable.innerHTML = '';
  viewAccountContainer.innerHTML = '';

  // create title account
  const viewAccountHeaderTitleviewAccount = el(
    'h2',
    { className: 'viewAccount__header-title-account' },
    `№ ${dataAccountId.account}`
  );

  // add content elements account
  viewAccountHeaderTitleviewAccount.insertAdjacentHTML(
    'beforeend',
    cardImage(dataAccountId.account)
  );
  viewAccountHeaderTitleBalance.innerHTML = `Баланс <span>${dataAccountId.balance.toFixed(
    2
  )} ₽</span>`;

  if (more === false) {
    // create form and btn form account
    const viewAccountForm = el('form', { className: 'viewAccount__form' });
    const viewAccountFormBtn = el(
      'button',
      { className: 'viewAccount__form-btn btn-us' },
      'Отправить'
    );

    // add content btn form account
    viewAccountFormBtn.insertAdjacentHTML(
      'afterbegin',
      '<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842547 0.928533 -0.00101428 2 -9.95438e-07H18C19.1046 -9.95438e-07 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="white"/></svg>'
    );

    [
      { id: 'from', name: 'Номер счёта отправителя' },
      { id: 'to', name: 'Номер счёта получателя' },
      { id: 'amount', name: 'Сумма перевода' },
    ].forEach((obj) => {
      // create elements form account
      const viewAccountInputBox = el('div', {
        className: 'viewAccount__form-input-box',
      });
      const viewAccountInput = el('input', {
        className: 'viewAccount__form-input input-us',
        placeholder: 'Placeholder',
        name: obj.name,
        id: obj.id,
        autocomplete: 'off',
      });
      const viewAccountLabel = el(
        'label',
        {
          className: 'viewAccount__form-input-label label-us',
          for: obj.id,
        },
        `${obj.name}`
      );

      if (obj.id === 'from') {
        viewAccountInputBox.style.display = 'none';
        viewAccountInput.setAttribute('value', dataAccountId.account);
      }
      if (obj.id === 'to') {
        // create elements form select account
        const viewAccountSelectContainer = el('div', {
          className: 'viewAccount__form-select-container',
        });
        const viewAccountSelectDropdown = el('div', {
          className: 'viewAccount__form-select-dropdown dropdown-us',
        });

        // add elements select account in DOM
        setChildren(viewAccountSelectContainer, [
          viewAccountInput,
          viewAccountSelectDropdown,
        ]);
        setChildren(viewAccountInputBox, [
          viewAccountLabel,
          viewAccountSelectContainer,
        ]);

        // event select account
        selectEvent(
          viewAccountInput,
          viewAccountSelectDropdown,
          viewAccountSelectContainer,
          viewAccountSelectContainer,
          'viewAccount__form-select-active',
          'dropdown-us__open',
          'dropdown-us__close'
        );

        if (localStorage.getItem("beneficiary's-account") !== null) {
          // add content elements select account
          viewAccountSelectDropdown.setAttribute('data-simplebar', '');
          if (
            JSON.parse(localStorage.getItem("beneficiary's-account")).length ===
              1 &&
            JSON.parse(localStorage.getItem("beneficiary's-account"))[0] ===
              dataAccountId.account
          )
            viewAccountSelectDropdown.hidden = 'true';
          else {
            viewAccountSelectDropdown.removeAttribute('hidden');
            viewAccountSelectContainer.insertAdjacentHTML(
              'beforeend',
              '<svg class="input-arrow" width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.951904 0.5L5.9519 5.5L10.9519 0.5L0.951904 0.5Z" fill="#182233"/></svg>'
            );
          }

          JSON.parse(localStorage.getItem("beneficiary's-account")).forEach(
            (account) => {
              if (account !== dataAccountId.account) {
                // create option select account
                const viewAccountSelectOption = el(
                  'div',
                  {
                    className: 'viewAccount__form-select-option option-us',
                  },
                  account
                );

                // event option select account
                viewAccountSelectOption.addEventListener('click', (e) => {
                  viewAccountInput.value = e.currentTarget.textContent;

                  viewAccountSelectContainer.classList.toggle(
                    'viewAccount__form-select-active'
                  );
                  if (
                    viewAccountSelectDropdown.classList.contains(
                      'dropdown-us__open'
                    )
                  ) {
                    elemHidden(
                      viewAccountSelectDropdown,
                      'dropdown-us__open',
                      'dropdown-us__close',
                      400
                    );
                  } else {
                    elemVisible(
                      viewAccountSelectDropdown,
                      'dropdown-us__open',
                      'flex'
                    );
                  }
                });

                viewAccountSelectDropdown.append(viewAccountSelectOption);
              }
            }
          );
        } else viewAccountSelectDropdown.hidden = 'true';
      } else
        setChildren(viewAccountInputBox, [viewAccountLabel, viewAccountInput]);

      viewAccountForm.append(viewAccountInputBox);
    });

    // add element form in DOM
    viewAccountForm.append(viewAccountFormBtn);
    setChildren(viewAccountCardForm, [
      viewAccountCardTitleForm,
      viewAccountForm,
    ]);
  }

  // building content based on data from the last 6 or 12 months
  let arrayMonths = [];
  let arrayObjLastMonths = [];
  let arrayAmountOfProfit = [];
  let arrayAmountOfLoss = [];
  let arraylastMonths = [];
  let maxAmountOfProfit = 0;
  let minAmountOfProfit = 0;
  let maxAmountOfLoss = 0;

  dataAccountId.transactions
    .sort((a, b) => (new Date(a['date']) > new Date(b['date']) ? 1 : -1))
    .forEach((transaction) => {
      if (arrayMonths.indexOf(definitionOfDate(transaction.date)) !== -1)
        return;
      arrayMonths.push(definitionOfDate(transaction.date));
    });

  // last 6 or 12 months
  if (more === false) arraylastMonths = arrayMonths.splice(-6);
  else arraylastMonths = arrayMonths.splice(-12);

  arraylastMonths.forEach((date) =>
    lastMonths(
      arrayObjLastMonths,
      dataAccountId.account,
      dataAccountId.transactions,
      date
    )
  );

  // create content bar chart

  // dynamic
  const viewAccountChartDynamicDateList = el('ul', {
    className: 'viewAccount__canvas-date-list',
  });
  const viewAccountChartDynamic = el('canvas', {
    className: 'viewAccount__canvas',
    id: 'canvas',
  });
  const ctxDynamic = viewAccountChartDynamic.getContext('2d');
  // ratio
  const viewAccountChartRatioDateList = el('ul', {
    className: 'viewAccount__canvas-date-list',
  });
  const viewAccountChartRatio = el('canvas', {
    className: 'viewAccount__canvas',
    id: 'canvas',
  });
  const ctxRatio = viewAccountChartRatio.getContext('2d');

  arrayObjLastMonths.forEach((obj) => {
    arrayAmountOfProfit.push(parseInt(obj.amountOfProfit));
    maxAmountOfProfit = Math.max.apply(null, arrayAmountOfProfit);
    minAmountOfProfit = Math.min.apply(null, arrayAmountOfProfit);

    // create max and min amount of profit dinamic chart
    const viewAccountChartDynamicItem = el('li', {
      className: 'viewAccount__canvas-date-item',
    });
    const viewAccountChartDynamicMonth = el('h4', {
      className: 'viewAccount__canvas-date',
    });
    const viewAccountChartDynamicAmountMax = el(
      'h4',
      {
        className: 'viewAccount__canvas-amount',
        title: `${maxAmountOfProfit} ₽`,
      },
      `${maxAmountOfProfit} ₽`
    );
    const viewAccountChartDynamicAmountMin = el(
      'h4',
      {
        className: 'viewAccount__canvas-amount',
        title: `${minAmountOfProfit} ₽`,
      },
      `${minAmountOfProfit} ₽`
    );

    viewAccountChartDynamicMonth.innerHTML = `${obj.month
      .replace(obj.month.split(' ')[0], obj.month.split(' ')[0].substring(0, 3))
      .replace(/ /gi, '<br>')}`;

    setChildren(viewAccountChartDynamicItem, viewAccountChartDynamicMonth);
    viewAccountChartDynamicDateList.append(viewAccountChartDynamicItem);
    setChildren(viewAccountChartDynamicAmountBox, [
      viewAccountChartDynamicAmountMax,
      viewAccountChartDynamicAmountMin,
    ]);

    if (more === true) {
      arrayAmountOfLoss.push(parseInt(obj.amountOfLoss));
      maxAmountOfLoss = Math.max.apply(null, arrayAmountOfLoss);

      // create max and min amount of profit ratio chart
      const viewAccountChartRatioItem = el('li', {
        className: 'viewAccount__canvas-date-item',
      });
      const viewAccountChartRatioMonth = el('h4', {
        className: 'viewAccount__canvas-date',
      });
      const viewAccountChartRatioAmountMax = el(
        'h4',
        {
          className: 'viewAccount__canvas-amount',
          title: `${maxAmountOfProfit} ₽`,
        },
        `${maxAmountOfProfit} ₽`
      );
      const viewAccountChartRatioAmountOfLossMax = el(
        'h4',
        {
          className: 'viewAccount__canvas-amount',
          title: `${maxAmountOfLoss} ₽`,
        },
        `${maxAmountOfLoss} ₽`
      );
      const viewAccountChartRatioAmountMin = el(
        'h4',
        {
          className: 'viewAccount__canvas-amount',
          title: `${minAmountOfProfit} ₽`,
        },
        `${minAmountOfProfit} ₽`
      );

      viewAccountChartRatioMonth.innerHTML = `${obj.month
        .replace(
          obj.month.split(' ')[0],
          obj.month.split(' ')[0].substring(0, 3)
        )
        .replace(/ /gi, '<br>')}`;

      setChildren(viewAccountChartRatioItem, viewAccountChartRatioMonth);
      viewAccountChartRatioDateList.append(viewAccountChartRatioItem);
      setChildren(viewAccountChartRatioAmountBox, [
        viewAccountChartRatioAmountMax,
        viewAccountChartRatioAmountOfLossMax,
        viewAccountChartRatioAmountMin,
      ]);
    }
  });

  // rendering bar chart
  if (more === false) {
    drawingAGraph(
      viewAccountChartDynamic,
      { rectBox: ctxDynamic, rectWidth: 30, rectIndent: [15, 48] },
      arrayAmountOfProfit,
      maxAmountOfProfit,
      6,
      '#116ACC'
    );
  } else {
    drawingAGraph(
      viewAccountChartDynamic,
      { rectBox: ctxDynamic, rectWidth: 15, rectIndent: [8, 24.5] },
      arrayAmountOfProfit,
      maxAmountOfProfit,
      12,
      '#116ACC'
    );

    drawingAGraph(
      viewAccountChartRatio,
      { rectBox: ctxRatio, rectWidth: 15, rectIndent: [8, 24.5] },
      arrayAmountOfProfit,
      maxAmountOfProfit,
      12,
      '#76CA66'
    );

    drawingAGraph(
      viewAccountChartRatio,
      { rectBox: ctxRatio, rectWidth: 15, rectIndent: [8, 24.5] },
      arrayAmountOfLoss,
      maxAmountOfProfit,
      12,
      '#FD4E5D',
      false
    );
  }

  setChildren(viewAccountChartRatioBox, [
    viewAccountChartRatio,
    viewAccountChartRatioDateList,
  ]);
  setChildren(viewAccountChartDynamicBox, [
    viewAccountChartDynamic,
    viewAccountChartDynamicDateList,
  ]);

  // add elements table account in DOM
  setChildren(viewAccountTable, viewAccountTableboxTitle);

  dataAccountId.transactions.slice(tableItem).forEach((transaction) => {
    let symbol;
    transaction.from === dataAccountId.account
      ? (symbol = '-')
      : (symbol = '+');

    // create elements account table
    const viewAccountTableboxContent = el('tr', {
      className: 'viewAccount__table-content-box',
    });
    const viewAccountTableCellFrom = el('td');
    const viewAccountTableCellTo = el('td');
    const viewAccountTableCellAmount = el('td');
    const viewAccountTableCellDate = el('td');
    const viewAccountTableContentFrom = el(
      'div',
      {
        className: 'viewAccount__table-content viewAccount__table-content-from',
        title: transaction.from,
      },
      transaction.from
    );
    const viewAccountTableContentTo = el(
      'div',
      {
        className: 'viewAccount__table-content viewAccount__table-content-to',
        title: transaction.to,
      },
      transaction.to
    );
    const viewAccountTableContentAmount = el(
      'div',
      {
        className: `viewAccount__table-content viewAccount__table-content-amount ${
          symbol === '+'
            ? 'viewAccount__table-content-amount-green'
            : 'viewAccount__table-content-amount-red'
        }`,
      },
      `${symbol} ${transaction.amount.toFixed(2)} ₽`
    );
    const viewAccountTableContentDate = el(
      'div',
      {
        className: 'viewAccount__table-content viewAccount__table-content-date',
      },

      `${new Date(transaction.date).toLocaleDateString()}`
    );

    // add content elements table account
    viewAccountTableContentFrom.insertAdjacentHTML(
      'beforeend',
      cardImage(transaction.from)
    );
    viewAccountTableContentTo.insertAdjacentHTML(
      'beforeend',
      cardImage(transaction.to)
    );

    // add elements table account in DOM
    setChildren(viewAccountTableCellFrom, viewAccountTableContentFrom);
    setChildren(viewAccountTableCellTo, viewAccountTableContentTo);
    setChildren(viewAccountTableCellAmount, viewAccountTableContentAmount);
    setChildren(viewAccountTableCellDate, viewAccountTableContentDate);
    setChildren(viewAccountTableboxContent, [
      viewAccountTableCellFrom,
      viewAccountTableCellTo,
      viewAccountTableCellAmount,
      viewAccountTableCellDate,
    ]);
    viewAccountTable.append(viewAccountTableboxContent);
  });

  // add elements account in DOM
  if (
    dataAccountId.balance !== '0' &&
    dataAccountId.transactions.length !== 0
  ) {
    [
      viewAccountCardForm,
      viewAccountCardBalance,
      viewAccountCardRatio,
      viewAccountCardTransaction,
    ].forEach((card) => {
      const viewAccountItem = el('li', { className: 'viewAccount__item' });
      if (
        more === false &&
        !card.classList.contains('viewAccount__card-ratio')
      ) {
        if (card.classList.contains('viewAccount__card-form')) {
          viewAccountItem.classList.add('viewAccount__item-form');
        }
        if (card.classList.contains('viewAccount__card-balance')) {
          viewAccountCardBalance.classList.remove(
            'viewAccount__card-balance-more'
          );
          viewAccountItem.classList.remove('viewAccount__item-balance');
          viewAccountItem.classList.add('viewAccount__item-dynamic');
          viewAccountChartDynamicBox.classList.remove(
            'viewAccount__canvas-box-balance'
          );
        }
        viewAccountItem.append(card);
        viewAccountContainer.append(viewAccountItem);
      } else if (
        more === true &&
        !card.classList.contains('viewAccount__card-form')
      ) {
        if (card.classList.contains('viewAccount__card-ratio'))
          viewAccountItem.classList.add('viewAccount__item-ratio');
        if (card.classList.contains('viewAccount__card-balance')) {
          viewAccountCardBalance.classList.add(
            'viewAccount__card-balance-more'
          );
          viewAccountItem.classList.remove('viewAccount__item-dynamic');
          viewAccountItem.classList.add('viewAccount__item-balance');
          viewAccountChartDynamicBox.classList.add(
            'viewAccount__canvas-box-balance'
          );
        }
        viewAccountItem.append(card);
        viewAccountContainer.append(viewAccountItem);
      }
    });
  } else viewAccountContainer.innerHTML = '';
  setChildren(viewAccountHeaderTitleBox, [
    viewAccountHeaderTitle,
    viewAccountHeaderTitleviewAccount,
  ]);
  setChildren(container, viewAccount);

  // hidding item table
  hidingItem(
    11,
    'viewAccount__table',
    'viewAccount__table-content-box-hidden',
    'viewAccount__table-btn'
  );

  if (
    more === false &&
    dataAccountId.balance !== '0' &&
    dataAccountId.transactions.length !== 0 &&
    document.querySelector('.viewAccount__form')
  ) {
    // transaction
    new DataInteraction({
      url: 'http://localhost:3000/transfer-funds',
      method: 'POST',
      form: '.viewAccount__form',
      error: [
        {
          received: 'Invalid account to',
          processed:
            'Не указан счёт зачисления, или данный счёт не существует!',
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
}

// creation of elements of all invoices
viewAccountHeaderBtn.addEventListener('click', () => {
  if (more === false) {
    return dataAcquisition(
      new DataInteraction({
        url: 'http://localhost:3000/accounts',
        method: 'GET',
      }),
      accountsContentCreation,
      containerMain
    );
  } else {
    more = false;

    [viewAccountTable, viewAccountChartDynamicBox].forEach(
      (elem) => (elem.style.cursor = 'pointer')
    );

    return dataAcquisition(
      new DataInteraction({
        url: `http://localhost:3000/account/${
          JSON.parse(sessionStorage.getItem('received-data')).account
        }`,
        method: 'GET',
      }),
      accountContentCreation,
      containerMain
    );
  }
});

// event more content
[viewAccountTable, viewAccountChartDynamicBox].forEach((el, id, array) => {
  el.style.cursor = 'pointer';

  el.addEventListener('click', () => {
    if (more === false) {
      more = true;

      array.forEach((elem) => (elem.style.cursor = 'initial'));

      const dataId = new DataInteraction({
        url: `http://localhost:3000/account/${
          JSON.parse(sessionStorage.getItem('received-data')).account
        }`,
        method: 'GET',
      });

      return dataId._contentData.then((resultData) => {
        dataId.postDataLocalStorage(resultData);
        accountContentCreation(
          dataId.getDataLocalStorage(),
          containerMain,
          -30
        );
      });
    }
  });
});
