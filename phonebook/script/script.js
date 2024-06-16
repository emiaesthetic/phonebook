import {renderPhoneBook, renderContacts} from './modules/render.js';
import {setContactData} from './modules/serviceStorage.js';
import sortingData, {data} from './modules/data.js';
import * as controls from './modules/controls.js';

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
