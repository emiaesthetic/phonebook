'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const addContactData = (contact) => {
    data.push(contact);
    console.log(data);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createButtonGroup = (params) => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('btn-wrapper');

    const buttons = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.className = className;
      button.textContent = text;

      return button;
    });

    buttonWrapper.append(...buttons);

    return {
      buttonWrapper,
      buttons,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="thead-name">Имя</th>
        <th class="thead-surname">Фамилия</th>
        <th class="thead-phone">Телефон</th>
      </tr>
    `);
    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.thead = thead;
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input
          class="form-input"
          name="name"
          id="name"
          type="text"
          required
        >
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input
          class="form-input"
          name="surname"
          id="surname"
          type="text"
          required
        >
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input
          class="form-input"
          name="phone"
          id="phone"
          type="number"
          required
        >
      </div>
    `);

    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.buttons);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
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
    const { form, overlay } = createForm();

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

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);
    tr.phoneLink = phoneLink;

    const tdEdit = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-success');;
    editButton.textContent = 'Редактировать';
    tdEdit.append(editButton);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const logoText = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });

      contact.addEventListener('mouseleave', () => {
        logo.textContent = logoText;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });
  };

  const sortedControl = (thead, list) => {
    const sortingData = (property) => {
      const copyData = [...data];
      return copyData.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    };

    thead.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.thead-name') || target.closest('.thead-surname')) {
        const property = target.className.split('-')[1];
        const sortedData = sortingData(property);

        list.innerHTML = '';
        renderContacts(list, sortedData);
      }
    });
  };

  const addContactPage = (list, contact) => {
    const contactRow = createRow(contact);
    list.append(contactRow);
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(list, newContact);
      addContactData(newContact);

      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      thead,
      form,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
    } = renderPhoneBook(app, title);

    // Функционал
    const allRow = renderContacts(list, data);
    const { closeModal } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    sortedControl(thead, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
