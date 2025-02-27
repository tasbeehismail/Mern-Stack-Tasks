import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/v1/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/user-blogs');
        } catch (error) {
            console.error('Error deleting blog:', error);
            setError(error.response?.data?.error || 'Failed to delete blog');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Are you sure you want to delete this blog?</h2>
            {error && <p style={styles.error}>{error}</p>}
            <button onClick={handleDelete} style={styles.button}>Delete</button>
            <button onClick={() => navigate('/user-blogs')} style={styles.button}>Cancel</button>
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
        marginTop: '10px',
    }
};

export default DeleteBlog;