/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */
// /* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('Приложение "COIN"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Авторизация клиента', () => {
    cy.log('Вводим логин');
    cy.get('#login').type('developer').should('have.value', 'developer');

    cy.log('Вводим пароль');
    cy.get('#password').type('skillbox').should('have.value', 'skillbox');

    cy.log('Входим в аккаунт');
    cy.get('form').submit();
    cy.wait(1000);
  });

  it('Создание счёта', () => {
    cy.log('Проверяем есть ли список счётов');
    cy.get('ul.accounts__list').should('be.visible');

    cy.log('Проверяем наличие основного счёта');
    cy.get('ul.accounts__list li:first-child h2').should(
      'have.text',
      '74213041477477406320783754'
    );

    const $lengthAccountsList = Cypress.$('ul.accounts__list li').length;
    cy.log(`Исходная длина списка счетов: ${$lengthAccountsList}`);

    cy.log('Подтверждаем что длина списка соответствует действительности');
    cy.get('ul.accounts__list li').should('have.length', $lengthAccountsList);

    cy.log('Создание нового счёта');
    cy.get('form').submit();
    cy.wait(1000);

    cy.get('ul.accounts__list li').should(
      'have.length',
      $lengthAccountsList + 1
    );
  });

  it('Перевод средств с основного счёта на созданный, проверяем созданный счёт на проведенную транзакцию и производим транзакцию с созданного счёта на основной', () => {
    const $accountBasic = Cypress.$('ul.accounts__list li:first-child h2')
      .text()
      .trim();
    cy.log(`Основной счёт: ${$accountBasic}`);

    const $accountCreated = Cypress.$('ul.accounts__list li:last-child h2')
      .text()
      .trim();
    cy.log(`Созданный счёт: ${$accountCreated}`);

    const $amount = 1000;
    cy.log(`Сумма перевода: ${$amount}`);

    cy.log('Открываем основной счёт для последующей транзакции');
    cy.get('ul.accounts__list li:first-child').contains('Открыть').click();

    cy.log('Вводим номер счёта получателя');
    cy.get('input[name="Номер счёта получателя"]')
      .type($accountCreated)
      .should('have.value', $accountCreated)
      .focus();

    cy.log('Вводим сумму перевода');
    cy.get('input[name="Сумма перевода"]')
      .type($amount)
      .should('have.value', $amount);

    cy.log('Производим транзакцию');
    cy.get('form').submit();
    cy.wait(1000);

    cy.log('Проверяем произошла ли транзакция');
    cy.get('table > tr:last-child')
      .find('td')
      .first()
      .should('have.text', $accountBasic)
      .next()
      .should('have.text', $accountCreated)
      .next()
      .should('have.text', `- ${$amount}.00 ₽`);

    cy.log('Возвращаемся к списку счетов');
    cy.contains('Вернуться назад').click();

    cy.log('Открываем созданный счёт');
    cy.get('ul.accounts__list li')
      .contains(`${$accountCreated}`)
      .parent()
      .parent()
      .contains('Открыть')
      .click();

    cy.log('Проверяем произошла ли транзакция');
    cy.get('table > tr:last-child')
      .find('td')
      .first()
      .should('have.text', $accountBasic)
      .next()
      .should('have.text', $accountCreated)
      .next()
      .should('have.text', `+ ${$amount}.00 ₽`);

    cy.log('Производим транзакцию c созданного счёта');
    cy.log('Вводим номер счёта получателя');
    cy.get('input[name="Номер счёта получателя"]')
      .type($accountBasic)
      .should('have.value', $accountBasic)
      .focus();

    cy.log('Вводим сумму перевода');
    cy.get('input[name="Сумма перевода"]')
      .type($amount)
      .should('have.value', $amount);

    cy.log('Производим транзакцию');
    cy.get('form').submit();
    cy.wait(1000);

    cy.log('Проверяем произошла ли транзакция');
    cy.get('table > tr:last-child')
      .find('td')
      .first()
      .should('have.text', $accountCreated)
      .next()
      .should('have.text', $accountBasic)
      .next()
      .should('have.text', `- ${$amount}.00 ₽`);

    cy.log('Возвращаемся к списку счетов');
    cy.contains('Вернуться назад').click();

    cy.log('Открываем основной счёт');
    cy.get('ul.accounts__list li:first-child').contains('Открыть').click();

    cy.log('Проверяем произошла ли транзакция');
    cy.get('table > tr:last-child')
      .find('td')
      .first()
      .should('have.text', $accountCreated)
      .next()
      .should('have.text', $accountBasic)
      .next()
      .should('have.text', `+ ${$amount}.00 ₽`);
  });

  it('Выходим из аккаунта', () => {
    cy.get('#logOff').click();
  });
});
