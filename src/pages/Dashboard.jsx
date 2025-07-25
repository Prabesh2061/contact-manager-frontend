import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4004';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch(`${apiUrl}/api/users/current`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data.userinfo))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch(`${apiUrl}/api/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => setContacts([]));
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const url = editId
      ? `${apiUrl}/api/contacts/${editId}`
      : `${apiUrl}/api/contacts`;
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(editId ? "Contact updated!" : "Contact added!");
      setForm({ name: "", email: "", phone: "" });
      setEditId(null);
    } else {
      setMessage(data.message || "Error!");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${apiUrl}/api/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage("Contact deleted!");
    } else {
      setMessage("Delete failed!");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEdit = (contact) => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditId(contact._id);
  };

  const handleCancelEdit = () => {
    setForm({ name: "", email: "", phone: "" });
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12">
      <div className="w-full max-w-4xl glass-card rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              {user ? `Welcome, ${user.username}!` : "Welcome!"}
            </h2>
            <p className="text-gray-600 mt-1">Manage your contacts below.</p>
            
          </div>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          To add a contact, fill out the form fields and click{" "}
          Add.
        </p>

        {message && (
          <div className="text-blue-500 text-center text-sm mb-4">{message}</div>
        )}

        <div className="bg-white/70 rounded-xl shadow p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 mt-4 justify-end md:col-span-3">
              <button
                className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-2 px-6 rounded-lg hover:from-pink-500 hover:to-blue-500 transition"
                type="submit"
                style={{ minWidth: "100px" }}
              >
                {editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-400 transition"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by name..."
            className="bg-white border border-gray-300 rounded-lg p-2 w-full max-w-xs"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

            <p className="text-sm text-gray-500 mt-1">
              Here are your saved contacts. To edit or delete a contact, use the actions on the right.
            </p>

        <div>
          {loading ? (
            <div className="text-center text-gray-500">Loading contacts...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center text-gray-500">No contacts found.</div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white/80 rounded-xl shadow">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Phone</th>
                      <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map(contact => (
                      <tr key={contact._id} className="border-t">
                        <td className="py-2 px-4">{contact.name}</td>
                        <td className="py-2 px-4">{contact.email}</td>
                        <td className="py-2 px-4">{contact.phone}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            className="text-blue-500 hover:underline mr-4"
                            onClick={() => handleEdit(contact)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDelete(contact._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden flex flex-col gap-4">
                {filteredContacts.map(contact => (
                  <div key={contact._id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                    <div className="font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.email}</div>
                    <div className="text-sm text-gray-600">{contact.phone}</div>
                    <div className="flex gap-4 mt-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEdit(contact)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}