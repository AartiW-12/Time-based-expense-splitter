import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import { useAuth } from "./AuthContext";

const emailId = "aartiwhaval12@gmail.com"


export default function SignUp() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("")
    let [emailErr, setEmailErr] = useState("");
    let [passwordErr, setPasswordErr] = useState(false);
    let [name , setName] = useState("")
    let [nameErr , setNameErr] = useState(false)

    let navigate = useNavigate();

    const {signUp} = useAuth()

    function isEmailExist(mailId) {
        return mailId === emailId;
    }

    function validatePassword(pass) {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (pass.length > 5 && pattern.test(pass)) {
            return true
        }
        return false
    }

    function validateEmail(mailId) {
        let pattern = /^\w+@\w+\.\w+$/;
        if (pattern.test(mailId)) {
            return true;
        }
        return false
    }
    return (
        <>
            <div className="signup-container">
                <div className="signup-div">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setNameErr(false)    
                        }}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id="pass-constraints">Password Constraints</p>
                    <ul className="password-rules">
                        <li>Minimum 8 characters</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                        <li>At least one special character (@ $ ! % * ? &)</li>
                    </ul>
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="buttons">
                        <button onClick={() => navigate('/')} className="button">Back</button>
                        <button
                            onClick={() => {
                                setEmailErr(false);
                                setPasswordErr(false);

                                if(!name.trim()){
                                    setNameErr(true)
                                    return  
                                }

                                if (isEmailExist(email)) {
                                    setEmailErr("* Email already exists");
                                    return;
                                }

                                if (!validateEmail(email)) {
                                    setEmailErr("* Invalid Email");
                                    return;
                                }

                                if (!validatePassword(password)) {
                                    setPasswordErr(true);
                                    return;
                                }

                                signUp(email, password, name.trim())
                                navigate("/dashboard");
                            }}
                            className="button"
                        >
                            Create Account
                        </button>

                    </div>

                </div>
                <div className="err-div">
                    {nameErr && <p className="error">* Name is required</p>}
                    {emailErr && <p className="error">{emailErr}</p>}
                    {passwordErr && <p className="error">* Invalid Password</p>}
                </div>
            </div>
        </>
    )
}