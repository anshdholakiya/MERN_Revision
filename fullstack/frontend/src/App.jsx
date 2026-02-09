import { useState, useEffect } from "react";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) getUserData();  //! if there is token then getUserData automatically run

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        console.log("Token Saved");
    }

    const getUserData = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();
        setUser(data);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">Login</button>

            </form>
            <br />

            <button onClick={getUserData}>Get My Data</button>
            {user && (<div>
                <h2>User Info</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <button onClick={logout}>Logout</button>

            </div>)}
        </div>
    );

}

export default App;
