import { validationForm } from './secondary-functions/validation';
import { preloader } from './sections/common';

export class DataInteraction {
  constructor(params) {
    if (params.url === undefined || params.url === '')
      throw new Error('No URL specified for further interaction with data!');
    else this.url = String(params.url);
    if (params.method === undefined || params.method === '')
      throw new Error('No method specified for further interaction with data!');
    else {
      switch (String(params.method).toUpperCase()) {
        case 'GET':
          this.method = String(params.method).toUpperCase();
          break;
        case 'POST': {
          this.method = String(params.method).toUpperCase();
          if (
            params.form === undefined ||
            document.querySelector(`${params.form}`) === null
          )
            throw new Error('Form not specified or does not exist!');
          else {
            this.form = document.querySelector(`${params.form}`);
            if (params.error === undefined)
              throw new Error('Array of possible errors not specified!');
            else {
              if (params.error === 'none') this.error = 'none';
              else {
                if (Array.isArray(params.error)) {
                  this.error = params.error;
                  this.form.insertAdjacentHTML(
                    'afterend',
                    `<div class="error" id="error" role="alert"></div>`
                  );
                } else throw new Error('Is not an Array of possible errors!');
              }
            }
          }
          break;
        }
        default:
          throw new Error(`${params.method} method is not supported!`);
      }
    }
    if (params.authorization === undefined || params.authorization !== true)
      this.authorization = false;
    else this.authorization = params.authorization;
    if (params.token === undefined || params.token === '') this.token = '';
    this.contentData = undefined;
  }

  set form(el) {
    if (this.method === 'POST') {
      this._form = el;
      this.postData(this._form);
    }
  }

  get form() {
    return this._form;
  }

  set token(content) {
    if (this.method === 'POST') {
      this._token = sessionStorage.getItem('token');
    }
  }

  get token() {
    return this._token;
  }

  set contentData(content) {
    if (this.method === 'GET') {
      this._contentData = this.getData(sessionStorage.getItem('token'));
    }
  }

  get contentData() {
    return this._contentData;
  }

  headersResponse(token) {
    if (!token) return { 'Content-Type': 'application/json' };
    else
      return {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
              'Authorization': `Basic ${token}`,
      };
  }

  errorMessage(el, content) {
    if (!el.classList.contains('error__active')) {
      el.classList.add('error__active');
      el.textContent = content;
      setTimeout(() => el.classList.remove('error__active'), 4000);
    }
  }

  postDataLocalStorage(data) {
    sessionStorage.setItem('received-data', data);
    sessionStorage.setItem(
      'DOM-section',
      `${new URL(this.url).pathname.split('/')[1]}`
    );
  }

  getDataLocalStorage() {
    if (sessionStorage.getItem('received-data') !== null)
      return JSON.parse(sessionStorage.getItem('received-data'));
  }

  getData(token) {
    preloader.style.display = 'flex';
    return fetch(this.url, {
      method: this.method,
      headers: this.headersResponse(token),
    })
      .then((response) => response.json())
      .then((result) => {
        preloader.style.display = 'none';
        const data = JSON.stringify(result.payload);
        return data;
      });
  }

  postData(form) {
    let value = {};

    form.addEventListener('submit', (e) => {
      value = {};
      try {
        e.preventDefault();
        for (let elem of e.currentTarget.elements) {
          if (elem.nodeName === 'INPUT') {
            validationForm(
              elem,
              elem.value,
              sessionStorage.getItem('DOM-section'),
              'error__input'
            );
            value[elem.id] = elem.value;
          }
        }
        preloader.style.display = 'flex';

        fetch(this.url, {
          method: this.method,
          body: value === {} ? undefined : JSON.stringify(value),
          headers:
            this.authorization === false
              ? this.headersResponse(sessionStorage.getItem('token'))
              : this.headersResponse(),
        })
          .then((response) => response.json())
          .then((data) => {
            preloader.style.display = 'none';

            if (data.payload === null) {
              throw new Error(data.error);
            } else {
              if (this.authorization === true)
                sessionStorage.setItem('token', data.payload.token);

              if (form.elements) {
                for (let elem of form.elements) {
                  if (
                    elem.nodeName === 'INPUT' &&
                    sessionStorage.getItem('DOM-section') === 'account' &&
                    elem.id === 'to'
                  ) {
                    if (
                      localStorage.getItem("beneficiary's-account") === null
                    ) {
                      localStorage.setItem(
                        "beneficiary's-account",
                        JSON.stringify([elem.value])
                      );
                    } else {
                      let accountArray = JSON.parse(
                        localStorage.getItem("beneficiary's-account")
                      );
                      accountArray.push(elem.value);
                      let newAccountArray = accountArray.filter((item, pos) => {
                        return accountArray.indexOf(item) === pos;
                      });
                      localStorage.setItem(
                        "beneficiary's-account",
                        JSON.stringify(newAccountArray)
                      );
                    }
                  }
                }
              }

              return window.location.reload();
            }
          })
          .catch((err) => {
            if (this.error === 'none') throw new Error(err);
            else {
              this.error.forEach((error) => {
                if (error.received === err.message)
                  this.errorMessage(
                    document.getElementById('error'),
                    error.processed
                  );
              });
            }
          });
      } catch (error) {
        this.errorMessage(document.getElementById('error'), error.message);
      }
    });
  }
}

export function dataAcquisition(
  classForGetData,
  functionCreatingContent,
  container
) {
  classForGetData._contentData.then((resultData) => {
    classForGetData.postDataLocalStorage(resultData);
    functionCreatingContent(classForGetData.getDataLocalStorage(), container);
  });
}
