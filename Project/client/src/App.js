import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostBlog from './pages/PostBlog';
import EditBlog from './pages/EditBlog';
import DeleteBlog from './pages/DeleteBlog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserBlogs from './pages/UserBlogs';
import SingleBlog from './pages/SingleBlog';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post-blog" element={<PostBlog />} />
                <Route path="/edit-blog/:id" element={<EditBlog />} />
                <Route path="/delete-blog/:id" element={<DeleteBlog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user-blogs" element={<UserBlogs />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
            </Routes>
        </Router>
    );
};

export default App;