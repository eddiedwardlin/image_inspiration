import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/Form.css";

interface Props {
    route: string; 
    method: string;
};

function LoginRegisterForm({route, method}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await api.post(route, {
                username: username, 
                password: password
            });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/"); // Navigate to home after login
            } else {
                navigate("/login"); // Navigate to login after registration
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <Form onSubmit={handleSubmit} className="form-container">
        <h2>{name}</h2>
        <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username *</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password *</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className="form-button-container">
            <Button variant="primary" type="submit">
                {name}
            </Button>
            {method == "login" && 
                <Button variant="secondary" type="button" onClick={() => navigate('/register')}>
                    Create Account
                </Button>
            }
            {method == "register" && 
                <Button variant="secondary" type="button" onClick={() => navigate('/login')}>
                    Login
                </Button>
            }
        </div>
    </Form>;
};

export default LoginRegisterForm;