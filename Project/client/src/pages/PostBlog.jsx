import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [photo, setPhoto] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Debugging: Log the token
            if (!token) {
                setError('You must be logged in to post a blog.');
                return;
            }

            const blog = { title, body, photo, tags: tags.split(',') };
            const response = await axios.post('http://localhost:3000/v1/api/blogs', blog, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                navigate('/'); // Redirect to home page after successful post
            } else {
                setError('Failed to post blog. Please try again.');
            }
        } catch (err) {
            console.error('Error posting blog:', err);
            setError('Failed to post blog. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Post a New Blog</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={styles.textarea}
                    required
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Post</button>
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
    textarea: {
        padding: '10px',
        margin: '10px',
        width: '300px',
        height: '100px',
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
        fontSize: '14px',
    }
};

export default PostBlog;