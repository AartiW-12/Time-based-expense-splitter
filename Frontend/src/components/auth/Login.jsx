import {  useState } from "react"
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useAuth } from "./AuthContext";

const data = {
    username: "aartiwhaval12@gmail.com",
    password: "Aarti@1234"
}
export default function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [usernameErr, setUsernameErr] = useState(false);
    let [passwordErr, setPasswordErr] = useState(false);


    let navigate = useNavigate();

    const { login } = useAuth();

    function handleLogin() {
        setUsernameErr(false);
        setPasswordErr(false);

        const sucess = login(username , password)

        if(sucess){
            navigate('/dashboard')
        }
        else{
            if (username !== data.username) {
                setUsernameErr(true);
            }
            if (password !== data.password) {
            setPasswordErr(true);
            }
        }
        
        
    }
    return (
        <div className="login-container">
            <div className="login-div">
                <label>USERNAME</label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setUsernameErr(false)
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setPasswordErr(false)    
                    }}
                />
            </div>
            <div className="buttons">
                <button onClick={() => navigate('/')} className="button">Back</button>
                <button onClick={handleLogin} className="button">
                    Login
                </button>
            </div>
            <div className="err-div">
                {usernameErr && passwordErr ? (
                    <p className="error">* Invalid Username and Password</p>
                ) : usernameErr ? (
                    <p className="error">* Invalid Username</p>
                ) : passwordErr ? (
                    <p className="error">* Invalid Password</p>
                ) : null}
            </div>
        </div>
    )
}