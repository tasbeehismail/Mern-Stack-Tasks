import React from 'react';
import { Link } from 'react-router-dom';

const SingleBlogCard = ({ blog }) => {
    const authorName = blog.author 
        ? `${blog.author.firstName} ${blog.author.lastName}`.trim()
        : 'Unknown Author';

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{blog.title}</h2>
            <p style={styles.body}>{blog.body}</p>
            <p style={styles.author}>Author: {authorName}</p>
            <div style={styles.tags}>
                {blog.tags && blog.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>
            <div style={styles.actions}>
                <Link to={`/edit-blog/${blog._id}`} style={styles.link}>Edit</Link>
                <Link to={`/delete-blog/${blog._id}`} style={styles.link}>Delete</Link>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
    },
    title: {
        color: '#8A2BE2',
        marginTop: 0,
        marginBottom: '10px'
    },
    body: {
        color: '#333',
        lineHeight: '1.5'
    },
    author: {
        color: '#666',
        fontStyle: 'italic'
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px'
    },
    tag: {
        backgroundColor: '#f0f0f0',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.9em',
        color: '#666'
    },
    actions: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        color: '#8A2BE2',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default SingleBlogCard;