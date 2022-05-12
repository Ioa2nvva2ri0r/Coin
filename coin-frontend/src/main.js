import { el, setChildren } from 'redom';

import './module/resource';
import { DataInteraction, dataAcquisition } from './module/data-processing';
import { preloader } from './module/sections/common';
import {
  header,
  containerHeader,
  logo,
  nav,
  navList,
  navBtnOpen,
  navBtnClose,
} from './module/sections/header';
import { account } from './module/sections/account-login';
import { createMap } from './module/sections/banks';
import { accountsContentCreation } from './module/sections/your-accounts';
import { accountContentCreation } from './module/sections/view-account';
import { currenciesContentCreation } from './module/sections/currencies';

// create main container
export const containerMain = el('div', { className: 'container' });

// add container in DOM
setChildren(window.document.body, [header, containerMain, preloader]);
setChildren(containerMain, account);

const token = new DataInteraction({
  url: 'http://localhost:3000/login',
  method: 'POST',
  form: '.account__form',
  authorization: true,
  error: [
    {
      received: 'No such user',
      processed: 'Пользователя с таким логином не существует!',
    },
    {
      received: 'Invalid password',
      processed: 'Неверный пароль!',
    },
  ],
});

if (token._token) {
  containerMain.innerHTML = '';
  setChildren(containerHeader, [logo, nav, navBtnOpen]);
  setChildren(nav, [navList, navBtnClose]);

  if (sessionStorage.getItem('received-data') === null) {
    dataAcquisition(
      new DataInteraction({
        url: 'http://localhost:3000/accounts',
        method: 'GET',
      }),
      accountsContentCreation,
      containerMain
    );
  } else {
    switch (sessionStorage.getItem('DOM-section')) {
      case 'banks':
        dataAcquisition(
          new DataInteraction({
            url: 'http://localhost:3000/banks',
            method: 'GET',
          }),
          createMap,
          containerMain
        );
        break;
      case 'accounts':
        dataAcquisition(
          new DataInteraction({
            url: 'http://localhost:3000/accounts',
            method: 'GET',
          }),
          accountsContentCreation,
          containerMain
        );
        break;
      case 'account':
        dataAcquisition(
          new DataInteraction({
            url: `http://localhost:3000/account/${
              JSON.parse(sessionStorage.getItem('received-data')).account
            }`,
            method: 'GET',
          }),
          accountContentCreation,
          containerMain
        );
        break;
      case 'currencies':
        dataAcquisition(
          new DataInteraction({
            url: 'http://localhost:3000/currencies',
            method: 'GET',
          }),
          currenciesContentCreation,
          containerMain
        );
        break;
    }
  }

  document
    .querySelectorAll('.header__nav-btn')
    .forEach((btn, idBtn, arrayBtn) => {
      btn.disabled = false;
      if (btn.id === sessionStorage.getItem('DOM-section')) btn.disabled = true;
      btn.addEventListener('click', () => {
        arrayBtn.forEach((btn) => (btn.disabled = false));
        switch (btn.id) {
          case 'banks':
            dataAcquisition(
              new DataInteraction({
                url: 'http://localhost:3000/banks',
                method: 'GET',
              }),
              createMap,
              containerMain
            );
            break;
          case 'accounts':
            dataAcquisition(
              new DataInteraction({
                url: 'http://localhost:3000/accounts',
                method: 'GET',
              }),
              accountsContentCreation,
              containerMain
            );
            break;
          case 'currencies':
            dataAcquisition(
              new DataInteraction({
                url: 'http://localhost:3000/currencies',
                method: 'GET',
              }),
              currenciesContentCreation,
              containerMain
            );
            break;
          case 'logOff':
            sessionStorage.clear();
            window.location.reload();
            break;
        }
      });
    });
}
