const getContactData = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setContactData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addContactData = (contact) => {
  const contacts = getContactData('contacts');
  contacts.push(contact);
  setContactData('contacts', contacts);
};

export const removeContactData = (phoneNumber) => {
  const contacts = getContactData('contacts');
  setContactData(
      'contacts',
      contacts.filter((contact) => contact.phone !== phoneNumber),
  );
};
