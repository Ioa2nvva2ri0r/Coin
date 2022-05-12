import { elemVisible, elemHidden } from './element-hidden';

export function selectEvent(
  select,
  dropdown,
  containerSelect,
  arrow,
  classActive,
  classOpen,
  classClose
) {
  select.addEventListener('focus', () => {
    if (dropdown.classList.contains(classOpen)) {
      arrow.classList.remove(classActive);
      elemHidden(dropdown, classOpen, classClose, 400);
    } else {
      arrow.classList.add(classActive);
      elemVisible(dropdown, classOpen, 'flex');
    }
  });
  document.body.addEventListener('click', (el) => {
    if (dropdown.classList.contains(classOpen)) {
      if (!containerSelect.contains(el.target)) {
        arrow.classList.remove(classActive);
        elemHidden(dropdown, classOpen, classClose, 400);
      }
    }
  });
}
