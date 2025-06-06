import { useState } from "react";

const ContactBook = () => {
  type ContactProps = {
    id: string;
    name: string;
    city: string;
  };

  const [contactList, setContactList] = useState<ContactProps[]>([]);
  const [contact, setContact] = useState<Omit<ContactProps, "id">>({
    name: "",
    city: "",
  });
  const [editContact, setEditContact] = useState<ContactProps>({
    id: "",
    name: "",
    city: "",
  });

  const handleAddContact = () => {
    if (contact.name.trim() !== "" && contact.city.trim() !== "") {
      const newContact: ContactProps = {
        id: crypto.randomUUID(),
        name: contact.name,
        city: contact.city,
      };
      setContactList([...contactList, newContact]);
      setContact({ name: "", city: "" });
    }
  };

  const handleEdit = (id: string, updatedContact: ContactProps) => {
    const updatedList = contactList.map((item) =>
      item.id === id ? updatedContact : item
    );
    setContactList(updatedList);
    setEditContact({ id: "", name: "", city: "" });
  };

  const handleDelete = (id: string) => {
    const updatedList = contactList.filter((item) => item.id !== id);
    setContactList(updatedList);

    if (editContact.id === id) {
      setEditContact({ id: "", name: "", city: "" });
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

        <span>City:</span>
        <input
          type="text"
          placeholder="city"
          value={contact.city}
          onChange={(e) => setContact({ ...contact, city: e.target.value })}
        />

        <button onClick={handleAddContact}>Add contact</button>

        {contactList.map((c) => (
          <div key={c.id}>
            {editContact.id === c.id ? (
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
                <button onClick={() => handleDelete(c.id)}>Delete</button>

                <button
                  onClick={() => setEditContact({ id: "", name: "", city: "" })}
                >
                  Cancel
                </button>
                <button onClick={() => handleEdit(c.id, editContact)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{c.name}</h3>
                <p>{c.city}</p>
                <button onClick={() => setEditContact(c)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactBook;
