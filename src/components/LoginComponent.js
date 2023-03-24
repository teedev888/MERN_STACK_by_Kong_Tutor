import { useState } from "react";
import NavbarComponent from "./NavbarComponent";

const LoginComponent = () => {

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const { username, password } = state;

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.table({username, password});
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={inputValue("username")} />
                </div>
                <div className="from-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={inputValue("password")} />
                </div>
                <br />
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
            </form>
        </div>
    )
};

export default LoginComponent;