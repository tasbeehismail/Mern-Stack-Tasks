import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleBlogCard from '../components/SingleBlogCard';
import { Link } from 'react-router-dom';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/v1/api/blogs/me', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API Response:', response.data); // Debugging: Log the response
            setBlogs(response.data.data || []); // Access the data property of the response
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Failed to fetch blogs');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My Blogs</h2>
            <Link to="/post-blog" style={styles.link}>Post a New Blog</Link>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.blogsContainer}>
                {Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map(blog => (
                        <SingleBlogCard key={blog._id} blog={blog} />
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    title: {
        color: '#8A2BE2',
    },
    link: {
        color: '#8A2BE2',
        textDecoration: 'none',
        fontSize: '18px',
        display: 'inline-block',
        marginBottom: '20px',
    },
    blogsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default UserBlogs;