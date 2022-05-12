export function hidingItem(
  limitQuantity,
  classList,
  classHidden,
  classBtnHidden
) {
  function hiddenItems(list) {
    const fullLength = list.children.length;
    const rangeLength = fullLength - limitQuantity;
    const arr = Array.from(list.children);
    return arr.slice(fullLength - rangeLength, fullLength);
  }
  if (document.querySelector(`.${classBtnHidden}`))
    document.querySelector(`.${classBtnHidden}`).remove();

  const listCheckboxCatalog = document.querySelectorAll(`.${classList}`);

  listCheckboxCatalog.forEach((el) => {
    el.classList.remove(`${classList}-active`);
    if (el.children.length > limitQuantity) {
      el.classList.add(`${classList}-active`);
      hiddenItems(el).forEach((el) => {
        el.classList.add(`${classHidden}`);
      });
      el.insertAdjacentHTML(
        'afterend',
        `<button title="Показать всю историю" class="${classBtnHidden} btn-us">Показать всю историю</button>`
      );
    }
  });

  const btnListCheckboxCatalog = document.querySelectorAll(
    `.${classBtnHidden}`
  );

  btnListCheckboxCatalog.forEach((el) => {
    el.addEventListener('click', () => {
      listCheckboxCatalog.forEach((list) => {
        if (!el.classList.contains(`${classBtnHidden}-active`)) {
          el.classList.add(`${classBtnHidden}-active`);
          el.title = 'Свернуть';
          el.textContent = 'Свернуть';
          hiddenItems(list).forEach((itemHidden) => {
            itemHidden.classList.remove(`${classHidden}`);
          });
        } else {
          el.classList.remove(`${classBtnHidden}-active`);
          hiddenItems(list).forEach((itemHidden) => {
            el.classList.remove(`${classHidden}`);
            el.title = 'Показать всю историю';
            el.textContent = 'Показать всю историю';
            itemHidden.classList.add(`${classHidden}`);
          });
        }
      });
    });
  });
}
