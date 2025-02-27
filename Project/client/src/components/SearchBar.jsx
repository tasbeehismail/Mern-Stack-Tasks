import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div style={styles.searchBar}>
            <input
                type="text"
                placeholder="Search by title, author, or tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
    );
};

const styles = {
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    },
    input: {
        padding: '10px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #8A2BE2',
    },
    button: {
        padding: '10px',
        marginLeft: '10px',
        backgroundColor: '#8A2BE2',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default SearchBar;