import { useState } from "react";

export default function App() {

  const initialUsers = ["Alice", "Bob", "Charlie"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowList(true); 
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Authentication Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <hr />

      {showList && (
        <div>
          <h2>Users List</h2>
          {users.map((name, index) => (
            <p key={index}>
              {name}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
