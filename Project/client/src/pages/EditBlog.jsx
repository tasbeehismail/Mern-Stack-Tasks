import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [photo, setPhoto] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/v1/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Blog fetched:', response.data); // Debugging: Log the response
                const blog = response.data.data; // Ensure we access the correct part of the response
                setTitle(blog.title || '');
                setBody(blog.body || '');
                setPhoto(blog.photo || '');
                setTags(blog.tags ? blog.tags.join(',') : '');
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(error.response?.data?.message || 'Failed to fetch blog');
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, body, photo, tags: tags.split(',') };
        try {
            await axios.put(`http://localhost:3000/v1/api/blogs/${id}`, blog, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/user-blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            setError(error.response?.data?.message || 'Failed to update blog');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Edit Blog</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={styles.textarea}
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
                <button type="submit" style={styles.button}>Update</button>
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
        marginTop: '10px',
    }
};

export default EditBlog;