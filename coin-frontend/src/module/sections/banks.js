/* eslint-disable no-undef */
import { el, setChildren } from 'redom';
import { btnATMs } from './header';
import { preloader } from './common';

// create elements banks
const banks = el('section', { className: 'banks' });
const banksTitle = el(
  'h1',
  { className: 'banks__title title-main' },
  'Карта банкоматов'
);
const banksMap = el('div', { className: 'banks__map', id: 'map' });
let initMap = true;

export function createMap(data, container) {
  preloader.style.display = 'flex';

  // event for nav-btn header
  btnATMs.disabled = true;

  // add path api-map in head
  document.getElementById('api-map').src =
    'https://api-maps.yandex.ru/2.1/?apikey=вашAPI-ключ&lang=ru_RU';

  function init() {
    // create map
    const myMap = new ymaps.Map('map', {
      center: [55.7545748445774, 37.620033063476576],
      zoom: 11,
    });

    // create placemarks
    data.forEach((coordinates) => {
      const myPlacemark = new ymaps.Placemark(
        [coordinates.lat, coordinates.lon],
        {},
        {
          iconImageSize: [25, 25],
        }
      );

      myMap.geoObjects.add(myPlacemark);
    });
  }

  fetch('https://api-maps.yandex.ru/2.1/?apikey=вашAPI-ключ&lang=ru_RU').then(
    (response) => {
      if (response.ok) {
        preloader.style.display = 'none';
        if (initMap === true) {
          // init map
          ymaps.ready(init);
          initMap = false;
        }

        // add elements banks in DOM
        setChildren(banks, [banksTitle, banksMap]);
        setChildren(container, banks);
      }
    }
  );
}
