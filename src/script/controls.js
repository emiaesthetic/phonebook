import {renderContacts} from './render';
import {addContactData, removeContactData} from './serviceStorage';
import sortingData from './data';
import {createRow} from './createElements';

export const hoverRow = (allRow, logo) => {
  const logoText = logo.textContent;

  allRow.forEach((contact) => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = logoText;
    });
  });
};

export const modalControl = (btnAdd, formOverlay) => {
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

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const contact = target.closest('.contact');
      contact.remove();

      const phoneNumber = contact.querySelector('a').textContent;
      removeContactData(phoneNumber);
    }
  });
};

export const sortedControl = (thead, list, logo) => {
  thead.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.thead-name') || target.closest('.thead-surname')) {
      const property = target.className.split('-')[1];
      const sortedData = sortingData(property);

      list.innerHTML = '';
      const contacts = renderContacts(list, sortedData);
      hoverRow(contacts, logo);
      sessionStorage.setItem('sortingProperty', property);
    }
  });
};

const addContactPage = (list, contact) => {
  const contactRow = createRow(contact);
  list.append(contactRow);
};

export const formControl = (form, list, closeModal) => {
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
