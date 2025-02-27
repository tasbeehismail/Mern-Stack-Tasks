import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginField, setLoginField] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/v1/api/auth/login', { loginField, password });
            console.log('Response:', response); // Debugging: Log the entire response
            localStorage.setItem('token', response.data.token); // Use the correct field name
            console.log('Token stored:', response.data.token); // Debugging: Check if token is stored
            navigate('/');
            console.log('Navigating to home page'); // Debugging: Check if navigate is called
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to login. Please try again.');
            console.error('Error logging in:', err.response?.data);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Email or Mobile Number"
                    value={loginField}
                    onChange={(e) => setLoginField(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        color: '#8A2BE2',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        margin: '10px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #8A2BE2',
    },
    button: {
        padding: '10px',
        margin: '10px',
        backgroundColor: '#8A2BE2',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    }
};

export default Login;