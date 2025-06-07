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
      <div className="contact-container">
        <h1>Contact Book</h1>
        <p>Keep track of where your friends live</p>

        <div className="add-contact-div">
          <div className="add-name-input-div">
            <label>
              Name:
              <input className="add-name-input"
                type="text"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </label>
          </div>
          <div className="add-city-input-div">
            <label>
              City:
              <input className="add-city-input"
                type="text"
                value={contact.city}
                onChange={(e) =>
                  setContact({ ...contact, city: e.target.value })
                }
              />
            </label>
          </div>
          <button onClick={handleAddContact}>Add contact</button>
        </div>

        <div className="contacts-grid">
          {contactList.map((contact) => (
            <div key={contact.id} className="contact-card">
              {editContact.id === contact.id ? (
                <div className="edit-mode">
                  <div className="edit-inputs">
                    <div className="edit-input-group">
                      <span>Name:</span>
                      <input
                        type="text"
                        value={editContact.name}
                        onChange={(e) =>
                          setEditContact({
                            ...editContact,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="edit-input-group">
                      <span>City:</span>
                      <input
                        type="text"
                        value={editContact.city}
                        onChange={(e) =>
                          setEditContact({
                            ...editContact,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="edit-buttons">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        setEditContact({ id: "", name: "", city: "" })
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="save-btn"
                      onClick={() => handleEdit(contact.id, editContact)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <p>{contact.city}</p>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => setEditContact(contact)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactBook;
