import "./App.css";
import { useState } from "react";

export default function App() {
	const [ userName, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  
  return (
		<div>
			<h3>Login Form</h3>
			<form>
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
      <div>
        <p>Username: {userName}</p>
        <p>Password: {password}</p>
      </div>
		</div>
	);
}
