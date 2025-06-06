import { useState } from "react";
const ContactBook = () => {
  type ContactProps = {
    name: string;
    city: string;
  };
  const [contactList, setContactList] = useState<ContactProps[]>([]);
  const [contact, setContact] = useState<ContactProps>({ name: "", city: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editContact, setEditContact] = useState<ContactProps>({
    name: "",
    city: "",
  });

  const handleAddContact = () => {
    if (contact.name.trim() !== "" && contact.city.trim() !== "") {
      const newContacts = [...contactList, contact];
      setContactList(newContacts);
      console.log(contactList);
      setContact({ name: "", city: "" });
    }
  };

  const handleEdit = (index: number, updatedContact: ContactProps) => {
    const updatedList = contactList.map((contact, i) =>
      i === index ? updatedContact : contact
    );
    setContactList(updatedList);
  };

  const handleDelete = (index: number) => {
  const updatedList = contactList.filter((_, i) => i !== index);
  setContactList(updatedList);

  if (editIndex === index) {
    setEditIndex(null);
  }
};


  return (
    <>
      <div>
        <h1>Contact Book</h1>
        <p>Keep track of where your friends live</p>
        <span>Name:</span>
        <input
          type="text"
          placeholder="name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <span>City</span>
        <input
          type="text"
          placeholder="city"
          value={contact.city}
          onChange={(e) => setContact({ ...contact, city: e.target.value })}
        />
        <button onClick={handleAddContact}>Add contact</button>
        {contactList.map((contact, index) => (
          <div key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editContact.name}
                  onChange={(e) =>
                    setEditContact({ ...editContact, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editContact.city}
                  onChange={(e) =>
                    setEditContact({ ...editContact, city: e.target.value })
                  }
                />

                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>

                <button onClick={() => setEditIndex(null)}>Cancel</button>

                <button
                  onClick={() => {
                    handleEdit(index, editContact);
                    setEditIndex(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{contact.name}</h3>
                <p>{contact.city}</p>
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setEditContact(contact);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactBook;
