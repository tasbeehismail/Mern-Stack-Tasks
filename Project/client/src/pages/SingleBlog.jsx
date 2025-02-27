import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/v1/api/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(error.response?.data?.message || 'Failed to fetch blog');
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    if (!blog) {
        return <div style={styles.loading}>Loading...</div>;
    }

    const authorName = blog.author 
        ? `${blog.author.firstName} ${blog.author.lastName}`.trim()
        : 'Unknown Author';

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{blog.title}</h1>
            <img src={blog.photo} alt={blog.title} style={styles.image} />
            <p style={styles.author}>By: {authorName}</p>
            <p style={styles.body}>{blog.body}</p>
            <div style={styles.tags}>
                <strong>Tags:</strong>
                {blog.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>{tag}</span>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: {
        color: '#8A2BE2',
        fontSize: '32px',
        marginBottom: '20px',
    },
    image: {
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    author: {
        color: '#9370DB',
        fontSize: '20px',
        marginBottom: '20px',
    },
    body: {
        color: '#4B0082',
        fontSize: '18px',
        lineHeight: '1.6',
        textAlign: 'left',
    },
    tags: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    tag: {
        backgroundColor: '#E6E6FA',
        color: '#8A2BE2',
        padding: '5px 10px',
        borderRadius: '5px',
        margin: '5px',
        fontSize: '14px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#8A2BE2',
        marginTop: '50px',
    },
    error: {
        textAlign: 'center',
        fontSize: '24px',
        color: 'red',
        marginTop: '50px',
    }
};

export default SingleBlog;