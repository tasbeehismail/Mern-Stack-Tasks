import React, { useEffect, useState } from 'react';
import SingleBlogCard from '../components/SingleBlogCard';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/v1/api/blogs');
            console.log('Blogs fetched:', response.data); // Debugging: Log the response
            setBlogs(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError(error.response?.data?.message || 'Failed to fetch blogs. Please try again later.');
        }
    };

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(`http://localhost:3000/v1/api/blogs/search?search=${query}&searchFields=title,tags`);
            console.log('Search results:', response.data); // Debugging: Log the response
            setBlogs(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error('Error searching blogs:', error);
            setError(error.response?.data?.message || 'Failed to search blogs. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.blogsContainer}>
                {blogs && blogs.length > 0 ? (
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
    blogsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    }
};

export default Home;