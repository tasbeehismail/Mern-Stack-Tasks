import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/post-blog" style={styles.link}>Post Blog</Link>
            <Link to="/user-blogs" style={styles.link}>My Blogs</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#8A2BE2',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    link: {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '18px',
    }
};

export default Navbar;