import { el, setChildren } from 'redom';
import logoPath from '../../assets/img/logo.svg';
import { elemVisible, elemHidden } from '../secondary-functions/element-hidden';

// create elements header
export const header = el('header', { className: 'header' });
export const containerHeader = el('div', {
  className: 'header__container container',
});
export const logo = el('img', {
  className: 'header__logo',
  src: logoPath,
  alt: 'logo',
});
export const nav = el('nav', { className: 'header__nav' });
export const navList = el('list', { className: 'header__nav-list' });
export const btnATMs = el(
  'button',
  {
    className: 'header__nav-btn header__nav-btn-ATM btn-us',
    id: 'banks',
  },
  'Банкоматы'
);
export const btnAccounts = el(
  'button',
  {
    className: 'header__nav-btn header__nav-btn-accounts btn-us',
    id: 'accounts',
    disabled: 'true',
  },
  'Счета'
);
export const btnCurrency = el(
  'button',
  {
    className: 'header__nav-btn header__nav-btn-currency btn-us',
    id: 'currencies',
  },
  'Валюта'
);
const btnLogOff = el(
  'button',
  {
    className: 'header__nav-btn header__nav-btn-logOff btn-us',
    id: 'logOff',
  },
  'Выйти'
);

export const navBtnOpen = el('button', {
  className: 'header__nav-btn-open',
  ariaLabel: 'Открыть меню',
});
export const navBtnClose = el('button', {
  className: 'header__nav-btn-close',
  ariaLabel: 'Закрыть меню',
});

// add content btn menu
navBtnOpen.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="3" rx="1.5" fill="#ffffff" /><rect y="21" width="24" height="3" rx="1.5" fill="#ffffff" /><rect y="11" width="24" height="3" rx="1.5" fill="#ffffff" /></svg>';
navBtnClose.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4.5752" y="2.9541" width="24" height="3" rx="1.5" transform="rotate(45 4.5752 2.9541)" fill="#ffffff" /><rect x="21.5459" y="5.0752" width="24" height="3" rx="1.5" transform="rotate(135 21.5459 5.0752)" fill="#ffffff" /></svg>';

// event btn menu
navBtnOpen.addEventListener('click', () =>
  elemVisible(nav, 'header__nav-open', 'block')
);
navBtnClose.addEventListener('click', () =>
  elemHidden(nav, 'header__nav-open', 'header__nav-close', 400)
);
document.body.addEventListener('click', (el) => {
  if (
    window.screen.width <= 859 &&
    nav.classList.contains('header__nav-open')
  ) {
    if (!nav.contains(el.target) && !navBtnOpen.contains(el.target)) {
      elemHidden(nav, 'header__nav-open', 'header__nav-close', 400);
    }
  }
});
window.addEventListener('resize', () => {
  if (window.screen.width >= 859) nav.style.display = 'block';
  else nav.style.display = 'none';
});
window.addEventListener('load', () => {
  if (window.screen.width >= 859) nav.style.display = 'block';
  else nav.style.display = 'none';
});

// cleaning DOM nav
navList.innerHTML = '';

// add btn in DOM nav
[btnATMs, btnAccounts, btnCurrency, btnLogOff].forEach((btn) => {
  const navItem = el('item', { className: 'header__nav-item' });

  // event btn nav
  if (window.screen.width <= 859) {
    btn.addEventListener('click', () =>
      elemHidden(nav, 'header__nav-open', 'header__nav-close', 400)
    );
  }

  setChildren(navItem, btn);
  navList.append(navItem);
});

// add elements in DOM header
setChildren(containerHeader, [logo, nav]);
setChildren(header, containerHeader);
