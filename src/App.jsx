import "./App.css";
import { useState, useEffect } from "react";

function LoginForm({ users, addUser }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const userExists = users.some((user) => user.name === userName);
		if (userExists) {
			alert("User exists!");
		} else {
			const newUser = {
				id: users.length + 1,
				name: userName,
				password: password,
				age: 0, // default age
				hobby: "" // default hobby
			};
			addUser(newUser);
			alert("User added!");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					type="text"
					placeholder="Username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Password:
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<br />
			<button type="submit">Login</button>
		</form>
	);
}

export default function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("https://my-json-server.typicode.com/rnxo/study-react/users")
			.then((response) => response.json()) // レスポンスをJSONに変換
			.then((data) => setUsers(data)) // 取得したデータをステートに保存
			.catch((error) => console.error("Error:", error)); // エラー処理
	}, []);

	const addUser = (newUser) => {
		setUsers([...users, newUser]);
		// Save to API
		fetch("https://my-json-server.typicode.com/rnxo/study-react/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		})
			.then((response) => response.json())
			.then((data) => console.log("User added:", data))
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div>
			<h3>Login Form</h3>
			<LoginForm users={users} addUser={addUser} />
			<ul>
				{users.map((user) => (
					<li key={user.id}>Username: {user.name}</li>
				))}
			</ul>
		</div>
	);
}
