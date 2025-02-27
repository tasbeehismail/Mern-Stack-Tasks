import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/v1/api/auth/signup', { firstName, lastName, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to signup. Please try again.');
            console.error('Error signing up:', err.response?.data);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Signup</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSignup} style={styles.form}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Signup</button>
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

export default Signup;