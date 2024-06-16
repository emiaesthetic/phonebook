import {
  createHeader,
  createMain,
  createFooter,
  createLogo,
  createButtonGroup,
  createTable,
  createForm,
  createRow,
} from './createElements.js';

export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const main = createMain();
  const footer = createFooter();
  const logo = createLogo(title);
  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.buttonWrapper, table, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    thead: table.thead,
    form,
    logo,
    btnAdd: buttonGroup.buttons[0],
    btnDel: buttonGroup.buttons[1],
    formOverlay: overlay,
  };
};

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
