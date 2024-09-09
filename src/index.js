import {renderPhoneBook, renderContacts} from './script/render';
import {setContactData} from './script/serviceStorage';
import sortingData, {data} from './script/data';
import * as controls from './script/controls';

import './index.html';
import './scss/index.scss';

const {
  modalControl,
  deleteControl,
  sortedControl,
  formControl,
  hoverRow,
} = controls;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list, thead, form, logo, btnAdd, btnDel, formOverlay} =
        renderPhoneBook(app, title);

    // Функционал
    const sortingProperty = sessionStorage.getItem('sortingProperty');
    const contacts = sortingProperty ? sortingData(sortingProperty) : [...data];

    setContactData('contacts', contacts);

    const allRow = renderContacts(list, contacts);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    sortedControl(thead, list, logo);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}

document.addEventListener('DOMContentLoaded', () => {
  window.phoneBookInit('#app', 'Emil');
});
